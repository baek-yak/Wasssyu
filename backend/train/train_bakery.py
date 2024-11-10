import pandas as pd
import numpy as np
import networkx as nx
from geopy.distance import geodesic
from geopy.geocoders import Nominatim
import matplotlib.pyplot as plt
from sklearn.cluster import KMeans
from sklearn.preprocessing import MinMaxScaler

# 데이터 준비 단계
# 빵집 데이터 로드 (빵집 이름, 주소, 평점, 리뷰 수)
data = pd.read_csv('/Users/gangbyeong-gyu/VSCodeProjects/ML/S11P31B105/backend/data/csv_files/대전_빵집.csv')

# 주소에서 위도와 경도 추출
geolocator = Nominatim(user_agent="bakery_locator")

def get_lat_lon(address):
    try:
        location = geolocator.geocode(address)
        return location.latitude, location.longitude
    except:
        return None, None

# 주소를 기반으로 위도, 경도 열 추가
data['latitude'], data['longitude'] = zip(*data['address'].apply(get_lat_lon))
data = data.dropna(subset=['latitude', 'longitude'])

# 평점과 리뷰 수 정규화 (MinMaxScaler 사용)
scaler = MinMaxScaler()
data[['normalized_rating', 'normalized_reviews']] = scaler.fit_transform(data[['rating', 'review_count']])

# 평점과 리뷰 수의 가중치 50:50 스코어 계산
data['score'] = (data['normalized_rating'] * 0.5) + (data['normalized_reviews'] * 0.5)

# K-Means를 사용한 클러스터링 (예: 클러스터 수 = 5)
coordinates = data[['latitude', 'longitude']]
kmeans = KMeans(n_clusters=5, random_state=0).fit(coordinates)
data['cluster'] = kmeans.labels_

# 거리 계산 함수 (하버사인 공식 사용)
def calculate_distance(coord1, coord2):
    return geodesic(coord1, coord2).kilometers

# 사용자가 방문하고자 하는 첫 번째 빵집 입력 받기
start_bakery = '하레하레 유성점'

# 사용자가 입력한 빵집 이름이 데이터에 있는지 확인
if start_bakery not in data['name'].values:
    raise ValueError(f"'{start_bakery}' is not found in the bakery data. Please check the name and try again.")

start_location = data[data['name'] == start_bakery][['latitude', 'longitude']].values[0]

# 브랜드별 대표 점포 선택 (사용자가 방문할 빵집에서 가장 가까운 점포 선택)
data['brand_name'] = data['name'].apply(lambda x: x.split()[0])  # 브랜드 이름 추출 (첫 단어 사용)

# 빈 리스트 생성
representative_list = []

# 각 브랜드별로 가장 가까운 점포 선택
for brand, group in data.groupby('brand_name'):
    closest_idx = group.apply(lambda row: calculate_distance(start_location, (row['latitude'], row['longitude'])), axis=1).idxmin()
    representative_list.append(group.loc[closest_idx])

# 리스트를 데이터프레임으로 변환
representative_data = pd.concat(representative_list, axis=1).transpose()

# 추천할 빵집 목록에서 동일 브랜드가 중복되지 않도록 대표 점포만 남긴 데이터로 작업
filtered_data = representative_data[representative_data['name'] != start_bakery]

# 그래프 생성 (빵집들 사이의 거리 기반)
G = nx.Graph()
# 모든 빵집을 그래프에 노드로 추가
for i, bakery in filtered_data.iterrows():
    G.add_node(bakery['name'], latitude=bakery['latitude'], longitude=bakery['longitude'])

# 모든 노드 간 연결 추가 (최소 연결 보장)
for i, bakery1 in filtered_data.iterrows():
    for j, bakery2 in filtered_data.iterrows():
        if i != j:
            distance = calculate_distance((bakery1['latitude'], bakery1['longitude']),
                                          (bakery2['latitude'], bakery2['longitude']))
            if distance < 10:  # 예를 들어, 10km 이내일 때만 연결하도록 제한
                congestion_factor = np.random.uniform(1, 3)  # 혼잡도를 임의로 설정 (1~3 사이 값)
                G.add_edge(bakery1['name'], bakery2['name'], weight=distance * congestion_factor)

# 시작 빵집을 그래프에 노드로 추가
if start_bakery not in G:
    G.add_node(start_bakery, latitude=start_location[0], longitude=start_location[1])

# 시작 빵집과 나머지 노드들 연결 (그래프 연결성 보장)
for i, bakery in filtered_data.iterrows():
    distance = calculate_distance(start_location, (bakery['latitude'], bakery['longitude']))
    congestion_factor = np.random.uniform(1, 3)
    G.add_edge(start_bakery, bakery['name'], weight=distance * congestion_factor)

# 최적 경로 트리 찾기 (single_source_dijkstra 사용)
distances, paths = nx.single_source_dijkstra(G, source=start_bakery)

# 거리순으로 정렬하여 가까운 5개 빵집 선택 (시작점을 제외)
sorted_bakeries = sorted(distances.items(), key=lambda x: x[1])
recommended_bakeries = [bakery for bakery, distance in sorted_bakeries[1:6]]

# 추천 빵집 출력
print("추천 빵집 경로:")
for bakery in recommended_bakeries:
    print(bakery)

# 결과 시각화 (선택 사항)
plt.scatter(filtered_data['longitude'], filtered_data['latitude'], c='blue', label='Other Bakeries')
plt.scatter(start_location[1], start_location[0], c='red', label='Start Bakery', marker='x')
for bakery in recommended_bakeries:
    loc = filtered_data[filtered_data['name'] == bakery][['latitude', 'longitude']].values[0]
    plt.scatter(loc[1], loc[0], c='green', label='Recommended Bakery')
plt.xlabel('Longitude')
plt.ylabel('Latitude')
plt.title('Bakery Recommendation Path')
plt.legend()
plt.show()