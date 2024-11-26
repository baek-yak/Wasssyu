<div align="center">
      <img src='https://github.com/user-attachments/assets/d663a6fe-27b2-498c-a535-20a739b3d9a7' width="70%">

 <h1>대전왔슈</h1>

 <h3>대전 여행 서비스, 대전을 담다, 대전왔슈</h3>
<p>2024.10.14 ~ 2024.11.19</p>
</div>

## 목차

- [목차](#목차)
- [서비스 개요](#서비스-개요)
- [팀원 소개](#팀원-소개)
- [기술 스택](#기술-스택)
- [주요 기능](#주요-기능)
- [명세서](#명세서)
- [ERD](#erd)
- [시스템 아키텍쳐](#시스템-아키텍쳐)
- [디렉토리 구조](#디렉토리-구조)
- [앱 서비스 실사용 화면](#앱-서비스-실사용-화면)
- [웹 서비스 실사용 화면](#웹-서비스-실사용-화면)
  - [1. 랜딩 페이지](#1-랜딩-페이지)
  - [2. 메인 페이지](#2-메인-페이지)
  - [3. 커뮤니티 페이지](#3-커뮤니티-페이지)
  - [4. 코스 페이지](#4-코스-페이지)

## 서비스 개요

```
대전 여행을 더욱 즐겁게, 대전왔슈

대전의 유명 관광 명소들을 추천받고 검색하여 기본 정보를 제공받을 수 있습니다.
유명 관광 명소들을 기반으로 다양한 프리셋 코스를 제공합니다.
각 코스에서 등장하는 각양각색의 왓슈몬을 잡아 도감을 채울 수 있습니다.
부루마블 제공받은 코스를 친구들과 함께 즐길 수 있습니다.
관광 명소에 대한 사용자들의 후기를 볼 수 있습니다.
커뮤니티에서 자신의 경험을 공유하고 대전에 대한 더욱 다양한 정보를 얻을 수 있습니다.
```

## 팀원 소개

<div align="center">
      <img src='https://github.com/user-attachments/assets/a27e70dc-58ce-4647-a913-6a960baf2e07'>
      <table>
      <tr>
        <td align="center" width="5%">GitHub</td>
        <td align="center" width="15%"><a href="https://github.com/baek-yak">장현수</a></td>
        <td align="center" width="15%"><a href="https://github.com/KingKangSS">강병규</td>
        <td align="center" width="15%"><a href="https://github.com/kinnbotT">김해수</td>
        <td align="center" width="15%"><a href="https://github.com/jw17111">이정원</td>
        <td align="center" width="15%"><a href="https://github.com/happyyongku">임용구</td>
        <td align="center" width="15%"><a href="https://github.com/jung18">정두홍</td>
        </tr>
      </table>
</div>

## 기술 스택

<div align="middle">

**| FrontEnd |**

<img src="https://img.shields.io/badge/nextjs-000000?style=for-the-badge&logo=nextdotjs&logoColor=white">
<img src="https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white">
<img src="https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white">
<img src="https://img.shields.io/badge/JavaScript-FFE249?style=for-the-badge&logo=javascript&logoColor=black">
<img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white">
<img src="https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white">
<img src="https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=Prettier&logoColor=white">
<img src="https://img.shields.io/badge/zustand-1F4ECF?style=for-the-badge&logo=zustand&logoColor=white">
<img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white">

<br>

**Language |** HTML5, CSS3, JavaScript, node.js

**Framework |** Next.js, Zustand

**Library |** eslint, prettier, Axios,

</div>

<br>
<br>
<div align="middle">

**| BackEnd |**

<img src="https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white"> 
<img src="https://img.shields.io/badge/spring boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white">
<img src="https://img.shields.io/badge/gradle-02303A?style=for-the-badge&logo=gradle&logoColor=white">
<img src="https://img.shields.io/badge/JPA Hibernate-59666C?style=for-the-badge&logo=Hibernate&logoColor=white">
<img src="https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens">
<img src="https://img.shields.io/badge/spring%20security-6DB33F.svg?style=for-the-badge&logo=springsecurity&logoColor=white">
<img src="https://img.shields.io/badge/fastapi-009688?style=for-the-badge&logo=fastapi&logoColor=white">
<img src="https://img.shields.io/badge/elasticsearch-%23005571.svg?style=for-the-badge&logo=elasticsearch&logoColor=white">
<img src="https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white"/>
<img src="https://img.shields.io/badge/postgresql-4479A1.svg?style=for-the-badge&logo=postgresql&logoColor=white"/>

</br>

**Language |** Java 21

**Framework |** Spring Boot, express, fastAPI, JWT, spring-security, elasticsearch

**DB |** Spring Data JPA, redis, postgresql

**Build Tool |** Gradle

</div>

<br>
<br>
<div align="middle">

**| Infra |**

<img src="https://img.shields.io/badge/jenkins-D24939?style=for-the-badge&logo=jenkins&logoColor=white"> 
<img src="https://img.shields.io/badge/nginx-009639?style=for-the-badge&logo=nginx&logoColor=white"> 
<img src="https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=docker&logoColor=white">
<img src="https://img.shields.io/badge/Amazon%20S3-569A31?style=for-the-badge&logo=Amazon%20S3&logoColor=white">
<img src="https://img.shields.io/badge/AWS%20EC2-%23FF9900.svg?style=for-the-badge&logo=amazon-ec2&logoColor=white"/>

<br>

**Server |** Jenkins, Docker, Nginx, Amazon-S3, AWS-EC2

</div>

## 주요 기능

<table>
<tr>
  <th>분류</th>
  <th>기능</th>
  <th>내용</th>
</tr>
<tr>
  <td> 일정 </td>
  <td>일정 생성</td>
  <td>여행 계획을 세우기 위한 일정을 생성합니다.</td>
</tr>
<tr>
  <td></td>
  <td>장소 추가</td>
  <td>생성된 일정에 원하는 장소를 검색하고, 원하는 날짜에 등록하고, dnd로 장소의 순서를 조정합니다.</td>
</tr>

<tr> 
  <td> 코스 </td>
  <td> 코스 추천</td>
  <td> 대전에서 즐길 수 있는 다양한 여행 테마를 기반으로 코스를 제공합니다.</td>
</tr>
<tr> 
  <td> </td>
  <td> 챗봇 추천</td>
  <td> 챗봇과의 대화를 통해서 자신에게 맞는 코스를 추천받을 수 있습니다.</td>
</tr>
<tr> 
  <td> </td>
  <td> 왓슈몬 챌린지</td>
  <td> 각 코스에서 제공하는 장소들에서 출몰하는 왓슈몬을 AR로 잡아보고 도감에 등록할 수 있습니다.</td>
</tr>

<tr> 
  <td> 관광지</td>
  <td> 관광지 검색 </td>
  <td> 가고싶은 관광지를 검색하거나 추천 관광지 정보를 제공 받습니다. </td>
</tr>
<tr> 
  <td> </td>
  <td> 도장 </td>
  <td> 해당 관광지에 방문 했다면 위치 기반으로 방문 인증 도장을 받을 수 있습니다. </td>
</tr>
<tr> 
  <td> </td>
  <td> 방문 후기 </td>
  <td> 관광지에 대한 후기를 남겨 사용자들의 경험을 공유하고 함께 이야기 할 수 있습니다. </td>
</tr>

<tr> 
  <td> 부루마블</td>
  <td> 혼자 도슈 </td>
  <td> 기존 부루마블의 룰을 기반으로 대전의 다양한 장소를 더욱 재미있게 즐길 수 있습니다.</td>
</tr>
<tr> 
  <td> </td>
  <td> 같이 도슈 </td>
  <td> 친구와 함께 즐기며 더욱 즐겁게 대전을 여행할 수 있습니다. </td>
</tr>

</table>

## 명세서

<div align="start">

- <a href='https://docs.google.com/spreadsheets/d/1XIL1Ac_6k1oj2pT1W4nY86jNZNt8-MbNBIO0aK5X6N4/edit?gid=0#gid=0'>기능 명세서</a>

- <a href='https://www.notion.so/API-127b51c6a4d280b7b66cfad99833144f'>API 명세서</a>

</div>

## ERD

<div  width="70%">
 <img src="https://github.com/user-attachments/assets/c4cf08c5-7295-4d39-9b3e-dc8a67bd0797"/>
</div>

## 시스템 아키텍쳐

<div  width="70%">
      <img src='https://github.com/user-attachments/assets/cbccddfc-9f84-4fa3-9ce1-0edbc0c57472'>
</div>

## 디렉토리 구조

<details>
<summary>next.js</summary>
<div markdown="1">

```text
📦frontend
 ┣ 📂public
 ┃ ┣ 📂images
 ┃ ┃ ┣ 📜basic.png
 ┃ ┃ ┣ 📜bread.png
 ┃ ┃ ┣ 📜building.png
 ┃ ┃ ┣ 📜calin.png
 ┃ ┃ ┣ 📜clock.png
 ┃ ┃ ┣ 📜coursebackground.png
 ┃ ┃ ┣ 📜default.png
 ┃ ┃ ┣ 📜delete.png
 ┃ ┃ ┣ 📜dojang.png
 ┃ ┃ ┣ 📜heart.png
 ┃ ┃ ┣ 📜jjim.png
 ┃ ┃ ┣ 📜jjimed.png
 ┃ ┃ ┣ 📜loca.png
 ┃ ┃ ┣ 📜location.png
 ┃ ┃ ┣ 📜logo.png
 ┃ ┃ ┣ 📜logotext.png
 ┃ ┃ ┣ 📜mainimage.png
 ┃ ┃ ┣ 📜marker.png
 ┃ ┃ ┣ 📜pencil.png
 ┃ ┃ ┣ 📜promimage.png
 ┃ ┃ ┣ 📜searchicon.png
 ┃ ┃ ┣ 📜stamp.png
 ┃ ┃ ┣ 📜star.png
 ┃ ┃ ┣ 📜tele.png
 ┃ ┃ ┣ 📜update.png
 ┃ ┃ ┣ 📜wassu.png
 ┃ ┃ ┣ 📜가족.png
 ┃ ┃ ┣ 📜검색.PNG
 ┃ ┃ ┣ 📜검색1.PNG
 ┃ ┃ ┣ 📜과학.png
 ┃ ┃ ┣ 📜관광지추천.PNG
 ┃ ┃ ┣ 📜교육.png
 ┃ ┃ ┣ 📜도장랜딩.PNG
 ┃ ┃ ┣ 📜랜드마크.png
 ┃ ┃ ┣ 📜문화.png
 ┃ ┃ ┣ 📜빵집.png
 ┃ ┃ ┣ 📜상세1.PNG
 ┃ ┃ ┣ 📜상세2.PNG
 ┃ ┃ ┣ 📜스포츠.png
 ┃ ┃ ┣ 📜역사.png
 ┃ ┃ ┣ 📜음식.png
 ┃ ┃ ┣ 📜자연.png
 ┃ ┃ ┣ 📜챗봇.PNG
 ┃ ┃ ┣ 📜코스.PNG
 ┃ ┃ ┣ 📜코스추천2.PNG
 ┃ ┃ ┗ 📜코스추천3.PNG
 ┃ ┣ 📜file.svg
 ┃ ┣ 📜globe.svg
 ┃ ┣ 📜next.svg
 ┃ ┣ 📜vercel.svg
 ┃ ┗ 📜window.svg
 ┣ 📂src
 ┃ ┣ 📂app
 ┃ ┃ ┣ 📂(with-haeder)
 ┃ ┃ ┃ ┣ 📂community
 ┃ ┃ ┃ ┃ ┣ 📂create
 ┃ ┃ ┃ ┃ ┃ ┣ 📜page.module.css
 ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┣ 📂fix
 ┃ ┃ ┃ ┃ ┃ ┗ 📂[id]
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜page.module.css
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┣ 📂[id]
 ┃ ┃ ┃ ┃ ┃ ┣ 📜page.module.css
 ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┣ 📜page.module.css
 ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┣ 📂course
 ┃ ┃ ┃ ┃ ┗ 📂[id]
 ┃ ┃ ┃ ┃ ┃ ┣ 📜page.module.css
 ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┣ 📂location
 ┃ ┃ ┃ ┃ ┗ 📂[id]
 ┃ ┃ ┃ ┃ ┃ ┣ 📜page.module.css
 ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┣ 📂main
 ┃ ┃ ┃ ┃ ┣ 📜page.module.css
 ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┣ 📂mypage
 ┃ ┃ ┃ ┃ ┣ 📜layout.module.css
 ┃ ┃ ┃ ┃ ┣ 📜layout.tsx
 ┃ ┃ ┃ ┃ ┣ 📜page.module.css
 ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┣ 📜layout.module.css
 ┃ ┃ ┃ ┣ 📜layout.tsx
 ┃ ┃ ┃ ┣ 📜page.module.css
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📂fonts
 ┃ ┃ ┃ ┣ 📜GeistMonoVF.woff
 ┃ ┃ ┃ ┗ 📜GeistVF.woff
 ┃ ┃ ┣ 📂login
 ┃ ┃ ┃ ┣ 📜page.module.css
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📂signup
 ┃ ┃ ┃ ┣ 📜page.module.css
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📜favicon.ico
 ┃ ┃ ┣ 📜globals.css
 ┃ ┃ ┣ 📜layout.tsx
 ┃ ┃ ┣ 📜middleware.ts
 ┃ ┃ ┣ 📜not-found.module.css
 ┃ ┃ ┗ 📜not-found.tsx
 ┃ ┣ 📂components
 ┃ ┃ ┣ 📂community
 ┃ ┃ ┃ ┣ 📜updatedelete.module.css
 ┃ ┃ ┃ ┗ 📜updatedelete.tsx
 ┃ ┃ ┣ 📂index
 ┃ ┃ ┃ ┣ 📜buttons.module.css
 ┃ ┃ ┃ ┣ 📜buttons.tsx
 ┃ ┃ ┃ ┣ 📜sectionfour.module.css
 ┃ ┃ ┃ ┣ 📜sectionfour.tsx
 ┃ ┃ ┃ ┣ 📜sectionone.module.css
 ┃ ┃ ┃ ┣ 📜sectionone.tsx
 ┃ ┃ ┃ ┣ 📜sectionthree.module.css
 ┃ ┃ ┃ ┣ 📜sectionthree.tsx
 ┃ ┃ ┃ ┣ 📜sectiontowpart.module.css
 ┃ ┃ ┃ ┣ 📜sectiontwo.module.css
 ┃ ┃ ┃ ┣ 📜sectiontwo.tsx
 ┃ ┃ ┃ ┗ 📜sectiontwopart.tsx
 ┃ ┃ ┣ 📂kakao
 ┃ ┃ ┃ ┗ 📜kakaomap.tsx
 ┃ ┃ ┣ 📂location
 ┃ ┃ ┃ ┣ 📜buttons.module.css
 ┃ ┃ ┃ ┣ 📜buttons.tsx
 ┃ ┃ ┃ ┣ 📜carousel.module.css
 ┃ ┃ ┃ ┣ 📜carousel.tsx
 ┃ ┃ ┃ ┣ 📜comment.module.css
 ┃ ┃ ┃ ┣ 📜comment.tsx
 ┃ ┃ ┃ ┣ 📜review.module.css
 ┃ ┃ ┃ ┗ 📜review.tsx
 ┃ ┃ ┣ 📂login
 ┃ ┃ ┃ ┣ 📜loginform.module.css
 ┃ ┃ ┃ ┣ 📜loginform.tsx
 ┃ ┃ ┃ ┣ 📜tosignup.module.css
 ┃ ┃ ┃ ┗ 📜tosignup.tsx
 ┃ ┃ ┣ 📂main
 ┃ ┃ ┃ ┣ 📂community
 ┃ ┃ ┃ ┃ ┣ 📜community.module.css
 ┃ ┃ ┃ ┃ ┣ 📜community.tsx
 ┃ ┃ ┃ ┃ ┣ 📜communitycard.module.css
 ┃ ┃ ┃ ┃ ┣ 📜communitycard.tsx
 ┃ ┃ ┃ ┃ ┣ 📜communityheader.module.css
 ┃ ┃ ┃ ┃ ┣ 📜communityheader.tsx
 ┃ ┃ ┃ ┃ ┣ 📜tocommunity.module.css
 ┃ ┃ ┃ ┃ ┗ 📜tocommunity.tsx
 ┃ ┃ ┃ ┣ 📂course
 ┃ ┃ ┃ ┃ ┣ 📜carousel.module.css
 ┃ ┃ ┃ ┃ ┣ 📜carousel.tsx
 ┃ ┃ ┃ ┃ ┣ 📜course.module.css
 ┃ ┃ ┃ ┃ ┣ 📜course.tsx
 ┃ ┃ ┃ ┃ ┣ 📜coursecarousel.module.css
 ┃ ┃ ┃ ┃ ┗ 📜coursecarousel.tsx
 ┃ ┃ ┃ ┣ 📂reco
 ┃ ┃ ┃ ┃ ┣ 📜reco.module.css
 ┃ ┃ ┃ ┃ ┣ 📜reco.tsx
 ┃ ┃ ┃ ┃ ┣ 📜recocard.module.css
 ┃ ┃ ┃ ┃ ┗ 📜recocard.tsx
 ┃ ┃ ┃ ┣ 📜searchresultcard.module.css
 ┃ ┃ ┃ ┣ 📜searchresultcard.tsx
 ┃ ┃ ┃ ┣ 📜tologinmodal.module.css
 ┃ ┃ ┃ ┗ 📜tologinmodal.tsx
 ┃ ┃ ┣ 📂mypage
 ┃ ┃ ┃ ┣ 📜partone.module.css
 ┃ ┃ ┃ ┣ 📜partone.tsx
 ┃ ┃ ┃ ┣ 📜partthree.module.css
 ┃ ┃ ┃ ┣ 📜partthree.tsx
 ┃ ┃ ┃ ┣ 📜parttwo.module.css
 ┃ ┃ ┃ ┗ 📜parttwo.tsx
 ┃ ┃ ┣ 📂signup
 ┃ ┃ ┃ ┣ 📜signupform.module.css
 ┃ ┃ ┃ ┗ 📜signupform.tsx
 ┃ ┃ ┣ 📜header.module.css
 ┃ ┃ ┣ 📜header.tsx
 ┃ ┃ ┣ 📜useapp.module.css
 ┃ ┃ ┗ 📜useapp.tsx
 ┃ ┣ 📂store
 ┃ ┃ ┗ 📜dropdownStore.ts
 ┃ ┗ 📜types.ts
 ┣ 📜.eslintrc.json
 ┣ 📜.gitignore
 ┣ 📜Dockerfile
 ┣ 📜Jenkinsfile
 ┣ 📜next.config.ts
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┣ 📜README.md
 ┗ 📜tsconfig.json
```

</div>
</details>

<details>
<summary>fast-api</summary>
<div markdown="1">

```text
📦backend
 ┣ 📂.idea
 ┃ ┣ 📜.gitignore
 ┃ ┣ 📜backend.iml
 ┃ ┣ 📜misc.xml
 ┃ ┣ 📜modules.xml
 ┃ ┗ 📜vcs.xml
 ┣ 📂data
 ┃ ┣ 📂code
 ┃ ┃ ┣ 📜bread_course_db_insert.py
 ┃ ┃ ┣ 📜chat_bot.py
 ┃ ┃ ┣ 📜crawl.py
 ┃ ┃ ┣ 📜da_clean.py
 ┃ ┃ ┣ 📜db_conect.py
 ┃ ┃ ┣ 📜db_table_delete.py
 ┃ ┃ ┣ 📜embedding.py
 ┃ ┃ ┣ 📜final.py
 ┃ ┃ ┣ 📜geo.py
 ┃ ┃ ┣ 📜gpt.py
 ┃ ┃ ┣ 📜insert_db.py
 ┃ ┃ ┣ 📜random_coures_insert.py
 ┃ ┃ ┣ 📜recommend_spot_test.py
 ┃ ┃ ┣ 📜req.py
 ┃ ┃ ┣ 📜split.py
 ┃ ┃ ┣ 📜spot_entity_add_embedding.py
 ┃ ┃ ┣ 📜text_to_vactor.py
 ┃ ┃ ┣ 📜랜덤맛집.py
 ┃ ┃ ┣ 📜맛집.py
 ┃ ┃ ┣ 📜맛집_리뷰수.py
 ┃ ┃ ┣ 📜빵집.py
 ┃ ┃ ┣ 📜빵집_리뷰수.py
 ┃ ┃ ┣ 📜빵집_전화번호.py
 ┃ ┃ ┣ 📜빵켓몬_db.py
 ┃ ┃ ┣ 📜전처리.py
 ┃ ┃ ┣ 📜전화번화_시간.py
 ┃ ┃ ┣ 📜진짜힘든강화학습.py
 ┃ ┃ ┗ 📜평점_크롤링.py
 ┃ ┣ 📂csv_files
 ┃ ┃ ┣ 📂my_datas
 ┃ ┃ ┃ ┣ 📜.DS_Store
 ┃ ┃ ┃ ┣ 📜대전_과학명소.csv
 ┃ ┃ ┃ ┣ 📜대전_맛집.csv
 ┃ ┃ ┃ ┣ 📜대전_문화명소.csv
 ┃ ┃ ┃ ┣ 📜대전_빵집.csv
 ┃ ┃ ┃ ┣ 📜대전_생태환경명소.csv
 ┃ ┃ ┃ ┣ 📜대전_역사명소.csv
 ┃ ┃ ┃ ┗ 📜대전시_대표명소.csv
 ┃ ┃ ┣ 📜.DS_Store
 ┃ ┃ ┣ 📜elastic.csv
 ┃ ┃ ┗ 📜대전_빵집_업데이트.csv
 ┃ ┗ 📜.DS_Store
 ┣ 📂fast_api
 ┃ ┣ 📂DB_con
 ┃ ┃ ┗ 📜__init__.py
 ┃ ┣ 📂dependencies
 ┃ ┃ ┗ 📜dependencies.py
 ┃ ┣ 📂routers
 ┃ ┃ ┣ 📜bakeryrouter.py
 ┃ ┃ ┣ 📜chat_router.py
 ┃ ┃ ┣ 📜count_top_router.py
 ┃ ┃ ┣ 📜course_router.py
 ┃ ┃ ┣ 📜db_conect.py
 ┃ ┃ ┣ 📜marble_router.py
 ┃ ┃ ┣ 📜recommendation.py
 ┃ ┃ ┗ 📜recommend_spot_router.py
 ┃ ┣ 📜.gitignore
 ┃ ┣ 📜jwt_handler.py
 ┃ ┣ 📜jwt_token.py
 ┃ ┗ 📜main.py
 ┣ 📂model
 ┃ ┣ 📜clustered_data.csv
 ┃ ┗ 📜kmeans_model.joblib
 ┣ 📂train
 ┃ ┗ 📜train_bakery.py
 ┣ 📜.DS_Store
 ┣ 📜.gitignore
 ┣ 📜requirements.txt
 ┣ 📜temp.md
 ┗ 📜__init__.py
```

</div>
</details>

<details>
<summary>react-native</summary>
<div markdown="1">

```text
📦src
 ┣ 📂api
 ┃ ┣ 📜community.ts
 ┃ ┣ 📜core.ts
 ┃ ┣ 📜itinerary.ts
 ┃ ┣ 📜mono.ts
 ┃ ┣ 📜mypage.ts
 ┃ ┣ 📜recommended.ts
 ┃ ┣ 📜tourist.ts
 ┃ ┗ 📜user.ts
 ┣ 📂assets
 ┃ ┣ 📂ar
 ┃ ┃ ┣ 📂3d-models
 ┃ ┃ ┃ ┣ 📜bread_ball.glb
 ┃ ┃ ┃ ┣ 📜model.glb
 ┃ ┃ ┃ ┣ 📜soccer.glb
 ┃ ┃ ┃ ┣ 📜SSAFY.png
 ┃ ┃ ┃ ┣ 📜SSAFY몬.glb
 ┃ ┃ ┃ ┣ 📜단팥몬.glb
 ┃ ┃ ┃ ┣ 📜밀면몬.glb
 ┃ ┃ ┃ ┣ 📜바게트몬.glb
 ┃ ┃ ┃ ┣ 📜소금빵몬.glb
 ┃ ┃ ┃ ┣ 📜소보루몬.glb
 ┃ ┃ ┃ ┣ 📜식빵몬.glb
 ┃ ┃ ┃ ┣ 📜쌀국수몬.glb
 ┃ ┃ ┃ ┣ 📜카스테라몬.glb
 ┃ ┃ ┃ ┗ 📜칼국수몬.glb
 ┃ ┃ ┣ 📜123.jpg
 ┃ ┃ ┗ 📜ssafy.jpg
 ┃ ┣ 📂fonts
 ┃ ┃ ┣ 📜malssami815.ttf
 ┃ ┃ ┣ 📜Pretendard-Black.ttf
 ┃ ┃ ┣ 📜Pretendard-Bold.ttf
 ┃ ┃ ┣ 📜Pretendard-ExtraBold.ttf
 ┃ ┃ ┣ 📜Pretendard-ExtraLight.ttf
 ┃ ┃ ┣ 📜Pretendard-Light.ttf
 ┃ ┃ ┣ 📜Pretendard-Medium.ttf
 ┃ ┃ ┣ 📜Pretendard-Regular.ttf
 ┃ ┃ ┣ 📜Pretendard-SemiBold.ttf
 ┃ ┃ ┗ 📜Pretendard-Thin.ttf
 ┣ 📂components
 ┃ ┣ 📂common
 ┃ ┃ ┣ 📜CustomModal.tsx
 ┃ ┃ ┣ 📜GpsComponent.tsx
 ┃ ┃ ┣ 📜Header.tsx
 ┃ ┃ ┗ 📜StepModal.tsx
 ┃ ┣ 📂Community
 ┃ ┃ ┣ 📜CommunitySearch.tsx
 ┃ ┃ ┣ 📜EditPost.tsx
 ┃ ┃ ┣ 📜PostDetail.tsx
 ┃ ┃ ┗ 📜Writing.tsx
 ┃ ┣ 📂Main
 ┃ ┃ ┗ 📜SearchBar.tsx
 ┃ ┣ 📂Monopoly
 ┃ ┃ ┣ 📜Choice.tsx
 ┃ ┃ ┣ 📜ChoiceTwo.tsx
 ┃ ┃ ┣ 📜GameOne.tsx
 ┃ ┃ ┣ 📜GameTwo.tsx
 ┃ ┃ ┣ 📜Invitation.tsx
 ┃ ┃ ┗ 📜MainRoom.tsx
 ┃ ┣ 📂MyPage
 ┃ ┃ ┣ 📜ChallengeCourse.tsx
 ┃ ┃ ┣ 📜CompletedChallenge.tsx
 ┃ ┃ ┣ 📜DaejeonStamp.tsx
 ┃ ┃ ┣ 📜DeleteConfirmationModal.tsx
 ┃ ┃ ┣ 📜Dogam.tsx
 ┃ ┃ ┣ 📜MyTrips.tsx
 ┃ ┃ ┣ 📜OngoingChallenge.tsx
 ┃ ┃ ┗ 📜TravelLog.tsx
 ┃ ┣ 📂Profile
 ┃ ┃ ┣ 📜AccountDeletionModal.tsx
 ┃ ┃ ┣ 📜ChangeInfo.tsx
 ┃ ┃ ┣ 📜ChangePassword.tsx
 ┃ ┃ ┗ 📜ProfileImagePickerModal.tsx
 ┃ ┣ 📂RecommendedPlace
 ┃ ┃ ┣ 📜CategoryList.tsx
 ┃ ┃ ┣ 📜PlaceDetail.tsx
 ┃ ┃ ┣ 📜PlaceList.tsx
 ┃ ┃ ┣ 📜RecommendedSearchBar.tsx
 ┃ ┃ ┗ 📜WriteReview.tsx
 ┃ ┣ 📂TravelChallenge
 ┃ ┃ ┣ 📜Ar.tsx
 ┃ ┃ ┣ 📜ChallengeDetail.tsx
 ┃ ┃ ┣ 📜ChatbotModal.tsx
 ┃ ┃ ┣ 📜CouresePage.tsx
 ┃ ┃ ┗ 📜CourseDescription.tsx
 ┃ ┗ 📂TravelItinerary
 ┃ ┃ ┣ 📜CreateSchedule.tsx
 ┃ ┃ ┣ 📜DetailedInquiry.tsx
 ┃ ┃ ┣ 📜Details.tsx
 ┃ ┃ ┣ 📜Itinerary.tsx
 ┃ ┃ ┣ 📜ReItinerary.tsx
 ┃ ┃ ┣ 📜RenderDayItem.tsx
 ┃ ┃ ┣ 📜RenderPlaceItem.tsx
 ┃ ┃ ┣ 📜ReRenderDayItem.tsx
 ┃ ┃ ┗ 📜ReRenderPlaceItem.tsx
 ┣ 📂pages
 ┃ ┣ 📜Community.tsx
 ┃ ┣ 📜FindPassword.tsx
 ┃ ┣ 📜Gps.tsx
 ┃ ┣ 📜Login.tsx
 ┃ ┣ 📜Main.tsx
 ┃ ┣ 📜Map.tsx
 ┃ ┣ 📜MonopolyPage.tsx
 ┃ ┣ 📜MyPage.tsx
 ┃ ┣ 📜Profile.tsx
 ┃ ┣ 📜RecommendedPlace.tsx
 ┃ ┣ 📜SignUp.tsx
 ┃ ┣ 📜TravelChallenge.tsx
 ┃ ┗ 📜TravelItinerary.tsx
 ┣ 📂router
 ┃ ┗ 📜Navigator.tsx
 ┣ 📂store
 ┃ ┣ 📜temp.md
 ┃ ┗ 📜useUserStore.ts
 ┣ 📂utills
 ┃ ┗ 📜tokenStorage.ts
 ┣ 📜@env.d.ts
 ┣ 📜declarations.d.ts
 ┣ 📜react-native-immersive.d.ts
 ┗ 📜types.ts
```

</div>
</details>

<details>
<summary>spring</summary>
<div markdown="1">

```text
📦wassu
 ┣ 📂src
 ┃ ┣ 📂main
 ┃ ┃ ┣ 📂java
 ┃ ┃ ┃ ┗ 📂com
 ┃ ┃ ┃ ┃ ┗ 📂wassu
 ┃ ┃ ┃ ┃ ┃ ┗ 📂wassu
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂config
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜AmazonS3Config.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜CORSConfig.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜ElasticIndexConfig.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜ElasticsearchConfig.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜ObjectMapperConfig.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜PostgresConfig.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜RedisConfig.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜RestTemplateConfig.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜SecurityConfig.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜SwaggerConfig.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂controller
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜ArticleController.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜AuthController.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜CourseController.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜DataController.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜MarbleController.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜ReviewController.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜ScheduleController.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜TouristSpotController.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜UserController.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂article
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜ArticleDTO.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜ArticleLikeDTO.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜ArticleResponseDTO.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜ArticleSearchRequestDTO.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂course
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜UserCourseProgressResponseDTO.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂jwt
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜JwtTokenDTO.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂marble
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜CreateRoomDTO.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜CreateRouteDTO.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜InviteRoomDTO.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜JoinRoomDTO.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜MarbleDTO.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜MissionVerifyDTO.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜MyMarbleDTO.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜NodeDTO.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜OptimalRouteDTO.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜RoomDTO.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜RouteSpotDTO.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜SseDTO.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂review
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜ReviewCreateDTO.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜ReviewDTO.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜ReviewImageDTO.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜ReviewUpdateDTO.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂schedule
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜CreateDailyPlanDTO.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜CreateScheduleDTO.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜DailyPlanDTO.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜MyScheduleDTO.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜ScheduleDTO.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜ScheduleProfileDTO.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜UpdateScheduleTitleDTO.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂touristspot
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜TouristSpotDTO.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜TouristSpotFavoriteDTO.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜TouristSpotImageDto.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜TouristSpotRecommendDTO.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜TouristSpotSearchDTO.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜TouristSpotStampDTO.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜TouristSpotStampResponseDTO.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜TouristSpotTagDto.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂user
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜UserArticleDetailDTO.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜UserAuthDTO.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜UserPasswordUpdateDTO.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜UserProfileDTO.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜UserProfileUpdateDTO.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜UserSignupDTO.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂entity
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂article
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂course
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜CatchedWassuMonEntity.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜TourCourseDetailEntity.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜TourCourseEntity.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜UserCourseProgressEntity.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜WassuMonEntity.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂marble
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜MarbleEntity.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜MarbleRoomEntity.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜NodeEntity.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂review
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜ReviewEntity.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜ReviewImageEntity.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜ReviewLikes.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂schedule
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜DailyPlanEntity.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜PlanOrderEntity.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜ScheduleEntity.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂touristspot
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜TouristSpotCourseEntity.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜TouristSpotEntity.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜TouristSpotFavorites.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜TouristSpotImageEntity.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜TouristSpotPresetEntity.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜TouristSpotStampEntity.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜TouristSpotTagEntity.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂user
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜ArticleEntity.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜ArticleLikedEntity.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜ArticleReadEntity.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜BlackListEntity.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜ClearedMarbleEntity.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜ElasticTouristSpotEntity.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜UserEntity.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜VisitedSpotEntity.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂eventListener
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜TouristSpotFavoriteEntityListener.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜UserEntityListener.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂exception
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜CustomAccessDeniedHandler.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜CustomErrorCode.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜CustomException.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜ErrorResponse.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜GlobalExceptionHandler.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂repository
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂article
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜ArticleLikedRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜ArticleRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜ArticleSearchRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂course
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜CatchedWassuMonRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜UserCourseProgressRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂elasticTourist
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜ElasticTouristSpotRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂marble
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜MarbleRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜MarbleRoomRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜NodeRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜RedisRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂review
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜ReviewImageRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜ReviewLikesRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜ReviewRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂schedule
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜DailyPlanRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜PlanOrderRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜ScheduleRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂touristspot
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜TouristSpotFavoritesRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜TouristSpotImageRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜TouristSpotRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜TouristSpotStampRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜TouristSpotTagRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂user
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜BlackListRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜UserRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂security
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜JwtAuthenticationFilter.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜JwtUtil.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂service
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂article
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜ArticleCategoryFilterService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜ArticleCreateService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜ArticleDeleteService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜ArticleLikeService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜ArticleProfileService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜ArticleReadService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜ArticleSearchService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜ArticleSearchServiceImpl.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜ArticleUpdateService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜ArticleUtilService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂auth
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜AuthService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂course
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜CourceService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂data
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜DataService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂elastic
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜ElasticsearchService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂email
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜EmailService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂marble
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜CreateRouteService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜MarbleService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜SseService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂review
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂schedule
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜ScheduleInfoService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜ScheduleService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂touristspot
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜TouristSpotSearchService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜TouristSpotService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜TouristSpotStampService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜TouristSpotUtilService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂user
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜UserArticleService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜UserProfileUpdateService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜UserService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜ReviewService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂temp
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜ElasticsearchConfig.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜test.json
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂util
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜S3Util.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜UserUtil.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜UtilTool.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜WassuApplication.java
 ┃ ┃ ┗ 📂resources
 ┃ ┃ ┃ ┣ 📜application.properties
 ┃ ┃ ┃ ┣ 📜nori_settings.json
 ┃ ┃ ┃ ┗ 📜spot_search_settings.json
 ┃ ┗ 📂test
 ┃ ┃ ┗ 📂java
 ┃ ┃ ┃ ┗ 📂com
 ┃ ┃ ┃ ┃ ┗ 📂wassu
 ┃ ┃ ┃ ┃ ┃ ┗ 📂wassu
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜WassuApplicationTests.java
 ┣ 📜.gitattributes
 ┣ 📜.gitignore
 ┣ 📜build.gradle
 ┣ 📜Dockerfile
 ┣ 📜gradlew
 ┣ 📜gradlew.bat
 ┣ 📜HELP.md
 ┣ 📜Jenkinsfile
 ┣ 📜settings.gradle
 ┗ 📜updated_file.csv
```

</div>
</details>

## 앱 서비스 실사용 화면

| <div align="center">**로그인 페이지**</div>                                                                                                     | <div align="center">**메인 페이지**</div>                                                                                                       | <div align="center">**관광지 리스트**</div>                                                                                                     | <div align="center">**관광지 상세 & 스탬프**</div>                                                                                              | <div align="center">**게시글 상세**</div>                                                                                                       | <div align="center">**게시글 생성**</div>                                                                                                       | <div align="center">**코스 & AR**</div>                                                                                                         | <div align="center">**마이 페이지**</div>                                                                                                       | <div align="center">**부루마블**</div>                                                                                                          | <div align="center">**일정**</div>                                                                                                              |
| ----------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| <div align="center"><img src="https://github.com/user-attachments/assets/c3acb183-3ffe-42d9-aa3e-3b26aac57248" width="200" height="400"/></div> | <div align="center"><img src="https://github.com/user-attachments/assets/c5307a5e-2bcf-40e4-a682-bfd4918d6935" width="200" height="400"/></div> | <div align="center"><img src="https://github.com/user-attachments/assets/406a6119-aa17-4d8b-bb83-146427dbee8e" width="200" height="400"/></div> | <div align="center"><img src="https://github.com/user-attachments/assets/c50d9bed-0227-4199-9696-2dbc4d9bc160" width="200" height="400"/></div> | <div align="center"><img src="https://github.com/user-attachments/assets/f91b2573-9503-443d-bb89-4203e62d9367" width="200" height="400"/></div> | <div align="center"><img src="https://github.com/user-attachments/assets/fca5f479-ff60-427a-8646-26dd078045d5" width="200" height="400"/></div> | <div align="center"><img src="https://github.com/user-attachments/assets/b2d2ab9e-cbdb-4d1c-b3e6-3aa9b707efc4" width="200" height="400"/></div> | <div align="center"><img src="https://github.com/user-attachments/assets/bde7020c-f783-4740-a3b0-1eb2634613d2" width="200" height="400"/></div> | <div align="center"><img src="https://github.com/user-attachments/assets/898f2e04-fd4d-4ccc-81ad-64e313b80c3d" width="200" height="400"/></div> | <div align="center"><img src="https://github.com/user-attachments/assets/c9c66d4a-0f38-4a0f-9d00-645a05db353b" width="200" height="400"/></div> |

## 웹 서비스 실사용 화면

### 1. 랜딩 페이지

<div align="middle">
<table>
    <tr>
        <th>랜딩 페이지(서비스 처음 화면)</th>
    </tr>
    <tr>
        <td><img src='https://github.com/user-attachments/assets/8faabbe8-6d05-4c92-a7fa-9803f8e2a9d8' style="width:700px; height:auto;" /></td>
    </tr>
</table>
</div>
<br>

### 2. 메인 페이지

<div align="middle">
<table>
    <tr>
        <th>메인 페이지</th>
    </tr>
    <tr>
        <td><img src='https://github.com/user-attachments/assets/95b394c8-193b-4496-9e11-50c7c629bb8a' style="width:700px; height:auto;"/></td>
    </tr>
</table>
</div>
<br>

<div align="middle">
<table>
    <tr>
        <th>관광지 검색</th>
    </tr>
    <tr>
        <td><img src='https://github.com/user-attachments/assets/698a3d1c-4939-4834-b6a4-754b20329933' style="width:700px; height:auto;"/></td>
    </tr>
</table>
</div>

### 3. 커뮤니티 페이지

<div align="middle">
<table>
    <tr>
        <th>커뮤니티 페이지</th>
    </tr>
    <tr>
        <td><img src='https://github.com/user-attachments/assets/049b90e3-86eb-4574-b71d-48f932b09927' style="width:700px; height:auto;"/></td>
    </tr>
</table>
</div>
<br>

<div align="middle">
<table>
    <tr>
        <th>게시글 작성 페이지</th>
    </tr>
    <tr>
        <td><img src='https://github.com/user-attachments/assets/d432ac93-e377-471b-9971-a5453a9f7154' style="width:700px; height:auto;"/></td>
    </tr>
</table>
</div>
<br>

### 4. 코스 페이지

<div align="middle">
<table>
    <tr>
        <th>코스 상세 페이지</th>
    </tr>
    <tr>
        <td><img src='https://github.com/user-attachments/assets/a553abc8-034a-4c93-a202-2d11859b6fca' style="width:700px; height:auto;"/></td>
    </tr>
</table>
</div>
<br>

<div align="middle">
<table>
    <tr>
        <th>관광지 상세 페이지</th>
    </tr>
    <tr>
        <td><img src='https://github.com/user-attachments/assets/3fb22b20-18fa-4437-88c8-8e7b95227427' style="width:700px; height:auto;"/></td>
    </tr>
</table>
</div>
<br>
