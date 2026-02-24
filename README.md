# 🌤 Weather Dashboard

현재 위치 및 선택한 지역의 날씨를 확인할 수 있는 반응형 날씨 대시보드입니다.  
한국 행정구역 기반 좌표 매핑을 통해 보다 정확한 지역 날씨를 제공합니다.

---

## 🚀 배포 주소

https://weather.haebae.co.kr/

---

## 🛠 실행 방법

### 1. 프로젝트 클론

git clone <repository-url>
cd <project-folder>

### 2. 패키지 설치

npm install

### 3. 환경 변수 설정

프로젝트 루트에 .env 파일을 생성하고 아래 값을 추가합니다.
VITE_OPENWEATHER_API_KEY=your_api_key

### 4. 개발 서버 실행

npm run dev

주요 기능

1️⃣ 현재 위치 기반 날씨 조회

브라우저 Geolocation API를 사용하여 현재 위치 감지
한국 행정구역 좌표 데이터와 매핑
위치 권한 거부 및 오류 처리

2️⃣ 지역 검색

지역 선택 시 해당 좌표 기반 날씨 조회
korea_districts_coords.json 기반 정확한 행정구역 매칭

3️⃣ 즐겨찾기 기능

최대 6개까지 추가 가능
중복 추가 방지
별칭 수정 (Enter / blur 저장)
로컬 저장(persist) 유지
즐겨찾기 카드에 현재 날씨 요약 표시
즐겨찾기 카드 클릭 시 상세 페이지 이동

4️⃣ 상세 페이지

URL 파라미터 기반 지역 상세 조회
현재 날씨 / 최저 / 최고 표시
24시간 예보 표시
Sunrise / Sunset 정보 제공
반응형 레이아웃 지원

5️⃣ 24시간 예보 차트

/forecast API 사용
Temperature / Feels like / Humidity 토글
SVG 기반 커스텀 Line Chart 구현
값 라벨 표시

6️⃣ 반응형 레이아웃

모바일: 세로 스택 구조
데스크탑: 2열 대시보드 레이아웃
md 기준 레이아웃 분리 적용

🎨 디자인 시스템

Tailwind v4 기반으로 CSS 변수(Design Token)를 도입하여
브랜드 컬러 테마를 적용했습니다.

주요 컬러

Brand Primary: #0094AD
Brand Secondary: #28A0B5
Background: #F5FBFC

CSS 변수 기반으로 색상을 관리하여 유지보수성을 높였습니다.

기술적 의사결정

1️⃣ TanStack Query 사용

API 캐싱 및 상태 관리
동일 queryKey 사용으로 Home/Detail 간 캐시 재사용
staleTime 설정으로 불필요한 재요청 방지

2️⃣ FSD 구조 적용

shared / entities / features / widgets / pages
관심사 분리 및 유지보수성 향상

3️⃣ coords.json 기반 지역 매핑

단순 도시명 대신 행정구역 단위 좌표 매핑
현재 위치 → 가장 가까운 행정동 탐색 로직 구현

4️⃣ SVG 기반 Line Chart 직접 구현

외부 차트 라이브러리 미사용
min/max 정규화 후 polyline 좌표 계산
토글에 따른 데이터 동적 렌더링

5️⃣ 반응형 전략

md: 조건부 클래스 사용
모바일 UI와 데스크탑 UI 분리 설계
Hero 확장 대응 레이아웃 설계

📦 사용 기술
React
TypeScript
Vite
Tailwind CSS v4
TanStack Query
OpenWeather API

📌 개선 가능 사항
다크 모드 지원
차트 인터랙션(hover tooltip) 추가
