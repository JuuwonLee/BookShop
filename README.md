# Introdution
Node.js 기반의 도서 정보 API 설계 및 구현 프로젝트

# ERD
![image](https://github.com/JuuwonLee/BookShop/assets/103981051/206900ee-a150-45cb-a856-d12b6b53f8b4)

# dependencies

```
"dependencies": {
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "express-validator": "^7.0.1",
    "http-status-codes": "^2.3.0",
    "jsonwebtoken": "^9.0.2",
    "mysql2": "^3.9.4"
  },
  "devDependencies": {
    "nodemon": "^3.1.0"
  }
```

# API

## 회원 API

1. 회원가입
<img width="485" alt="image" src="https://github.com/JuuwonLee/BookShop/assets/103981051/419c645a-697c-499e-8951-a00e9328f84d">

2. 로그인
<img width="485" alt="image" src="https://github.com/JuuwonLee/BookShop/assets/103981051/18932bc2-8e91-4aca-b6a1-13015498265c">

3. 비밀번호 초기화 요청
<img width="485" alt="image" src="https://github.com/JuuwonLee/BookShop/assets/103981051/60173ad7-ab2c-4e2f-8333-b8b704fc8ce2">

4. 비밀번호 초기화 (=수정)
// 비밀번호 까먹었을 때, 사용하는 기능 = 로그인 전
<img width="485" alt="image" src="https://github.com/JuuwonLee/BookShop/assets/103981051/4d7f462f-b70a-4122-8e1e-04fa8a6e486d">

## 도서 API

1. 전체 도서 조회
<img width="485" alt="image" src="https://github.com/JuuwonLee/BookShop/assets/103981051/150845b9-96b8-4370-b3d1-2c6b9e15b42f">

2. 개별 도서 조회
<img width="485" alt="image" src="https://github.com/JuuwonLee/BookShop/assets/103981051/609adf9a-b2e6-480a-91fe-f1f5c0945a35">

3. 카테고리별 도서 목록 조회
- new : true => 신간 조회 (기준 : 출간일 1달 이내)
<img width="485" alt="image" src="https://github.com/JuuwonLee/BookShop/assets/103981051/7bcb2163-a693-4598-bf5a-26e057b6b198">

## 카테고리 API

1. 카테고리 전체 조회
<img width="485" alt="image" src="https://github.com/JuuwonLee/BookShop/assets/103981051/c025da4d-a2e3-4ab7-9680-9cb486f0af99">

## 좋아요 API

1. 좋아요 추가
<img width="485" alt="image" src="https://github.com/JuuwonLee/BookShop/assets/103981051/64170e5c-304a-468a-9d97-8cd9d8b26a9b">

2. 좋아요 취소
<img width="485" alt="image" src="https://github.com/JuuwonLee/BookShop/assets/103981051/7bc6fd68-8dc1-40b9-a841-c5877ee5167c">

## 장바구니 (아이템) API
// 회원 1명당 - 장바구니 1개씩

1. 장바구니 담기
<img width="485" alt="image" src="https://github.com/JuuwonLee/BookShop/assets/103981051/190f4be7-be31-47c4-87fe-d6406abf9885">

2. 내 장바구니 아이템 목록 조회 / 선택한 장바구니 상품 목록 조회
<img width="485" alt="image" src="https://github.com/JuuwonLee/BookShop/assets/103981051/a6c24041-4fdd-4eae-8dfb-0a4c0f716424">

3. 장바구니 도서 삭제
<img width="485" alt="image" src="https://github.com/JuuwonLee/BookShop/assets/103981051/dbf41753-02b9-40cb-b68a-efbc33ed4df9">

## 결제(주문) API

1. 결제하기 = 주문하기 = 주문 등록 = 데이터베이스 주문 insert
<img width="485" alt="image" src="https://github.com/JuuwonLee/BookShop/assets/103981051/a7275bd2-f314-467f-8e2b-ec246d524c27">

2. 주문 목록(내역) 조회
<img width="485" alt="image" src="https://github.com/JuuwonLee/BookShop/assets/103981051/cf67971b-9afb-430c-a7b5-234063d094f9">

3. 주문 상세 조회
<img width="485" alt="image" src="https://github.com/JuuwonLee/BookShop/assets/103981051/06e7670a-ef3e-468e-ba1d-b23e2edf59a3">


  
