package com.wassu.wassu.service.touristspot;


import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch._types.query_dsl.BoolQuery;
import co.elastic.clients.elasticsearch._types.query_dsl.MultiMatchQuery;
import co.elastic.clients.elasticsearch._types.query_dsl.Query;
import co.elastic.clients.elasticsearch._types.query_dsl.TextQueryType;
import co.elastic.clients.elasticsearch.core.SearchRequest;
import co.elastic.clients.elasticsearch.core.SearchResponse;
import co.elastic.clients.json.JsonData;
import com.wassu.wassu.entity.ElasticTouristSpotEntity;
import com.wassu.wassu.exception.CustomErrorCode;
import com.wassu.wassu.exception.CustomException;
import com.wassu.wassu.repository.tourist.ElasticTouristSpotRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
@AllArgsConstructor
public class TouristSpotSearchService {

    private final ElasticsearchClient elasticsearchClient;

    public Page<Map<String, Object>> searchByText(String searchText, Pageable pageable) throws IOException {
        log.info("Search Tourist Spot by Text");

        List<Query> mustQueries = new ArrayList<>();

        try {
            if (searchText != null && !searchText.trim().isEmpty()) {
                log.info("Search text: {}", searchText);
                Query multiMatchQuery = Query.of(
                        q -> q.multiMatch(MultiMatchQuery.of(
                                m -> m.fields(List.of("spotName", "spotAddress"))
                                        .query(searchText)
                                        .type(TextQueryType.BestFields)
                        ))
                );
                mustQueries.add(multiMatchQuery);
            } else {
                mustQueries.add(Query.of(q -> q.matchAll(m -> m)));
            }

            BoolQuery.Builder boolQueryBuilder = new BoolQuery.Builder()
                    .must(mustQueries);
            Query finalQuery = Query.of(q -> q.bool(boolQueryBuilder.build()));

            log.info("Final Queyr: {}", finalQuery);

            SearchRequest request = new SearchRequest.Builder()
                    .index("elastic_tourist_spot")
                    .query(finalQuery)
                    .from((int) pageable.getOffset())
                    .size(pageable.getPageSize())
                    .build();
            log.info("Request: {}", request);

            SearchResponse<JsonData> response = elasticsearchClient.search(request, JsonData.class);
            log.info("Search response: {}", response);

            List<Map<String, Object>> touristSpots = response.hits().hits().stream()
                    .map(hit -> {
                        try {
                            return (Map<String, Object>) hit.source().to(Map.class);
                        } catch (Exception e) {
                            log.error("Error converting to Mat<String, Object> while searching tourist spot: {}", e.getMessage());
                            return null;
                        }
                    })
                    .filter(map -> map != null)
                    .toList();

            log.info("Tourist Spot Search Result: {}", touristSpots);
            long totalHits = response.hits().total() != null ? response.hits().total().value() : 0L;

            return new PageImpl<>(touristSpots, pageable, totalHits);

        } catch(Exception e) {
            log.error("Exception in search tourist spot: {}", e.getMessage());
            throw new CustomException(CustomErrorCode.ERROR_WHILE_SEARCH_TOURIST_SPOT);
        }
    }
}
