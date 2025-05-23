# 🎬 왓챠 극장 페이지 클론 프로젝트 (Frontend)

프로젝트 URL
http://www.moivehub.com/

## 📌 기능 분석

왓챠 극장 페이지(https://watcha.com/browse/theater)를 클론하여 주요 기능을 구현합니다.

![watcha com_browse_theater](https://github.com/user-attachments/assets/d2f91bf5-aff7-4ac8-9190-afc703f93909)


### 🚀 핵심 기능

1. **영화 목록 페이지**
   - 최신 영화, 인기 영화 목록 표시
   - 영화별 썸네일, 제목, 평점, 장르 정보 제공

2. **검색 기능**
   - 사용자가 영화 제목을 검색할 수 있도록 구현
   - 검색 자동완성 및 필터링 기능 제공

3. **상세 페이지**
   - 특정 영화를 클릭하면 해당 영화의 상세 정보 제공
   - 트레일러, 포스터, 리뷰, 출연진 정보 표시

4. **필터링 및 정렬 기능** (개발 중)
   - 장르별 필터링 (예: 액션, 코미디, 드라마 등)
   - 평점순, 인기순 정렬

5. **반응형 UI**
   - 모바일, 태블릿, 데스크톱 환경 대응 (Media Query 적용)

6. **다크 모드** (개발 예정)
   - 사용자 환경에 따라 다크 모드 & 라이트 모드 지원

7. **API 연동**
   - **TMDB API**를 활용하여 최신 영화 정보를 동적으로 가져오기

---

## 🔧 기술 스택 선정

| **분류**       | **기술 스택**        | **설명** |
|--------------|------------------|---------|
| **프론트엔드** | React + TypeScript | 최신 UI 라이브러리, 타입 안정성 확보 |
| **상태 관리** | Context API | 글로벌 상태 관리 (전역 상태 공유) |
| **CSS 스타일링** | 기본 CSS | 별도 프레임워크 없이 직접 스타일링 |
| **API 통신** | TMDB API | 영화 정보 제공 |
| **라우팅** | React Router | 페이지 이동 처리 (SPA) |
| **빌드 도구** | Webpack | 프로젝트 번들링 및 최적화 |
| **코드 품질** | ESLint + Prettier + Husky | 코드 스타일 유지 및 자동 검사 |

---

## 📦 패키지 매니저 및 모노레포 도구

- **pnpm**: 빠르고 효율적인 패키지 매니저
- **Turborepo**: 모노레포(여러 패키지 동시 관리) 환경 구축

- ## 🏗️ 배포 인프라

- **정적 파일 호스팅:** AWS S3
- **CDN:** AWS CloudFront
- **SPA 라우팅:** CloudFront 에러페이지(403/404 → /index.html) 설정
- **배포 주소:** [https://d31wrkm2vdd919.cloudfront.net/](https://d31wrkm2vdd919.cloudfront.net/)

---

## 🏗️ 프로젝트 설치 및 실행

```bash
# pnpm 설치 (최초 1회)
npm install -g pnpm

# 의존성 설치
pnpm install

# 개발 서버 실행 (웹 패키지)
pnpm --filter @watcha-clone/web dev

# 전체 빌드 (turborepo)
pnpm build

# 4. S3에 배포
aws s3 sync ./packages/web/dist s3://watcha-clone --delete
```


## 📌 프로젝트 목표

- **왓챠 극장 페이지의 UI 및 핵심 기능을 클론 구현**
- **반응형 디자인 적용하여 모든 기기에서 최적화**
- **TMDB API 연동하여 실시간 데이터 제공**
- **코드 품질 유지 및 일관성 있는 개발 환경 구축**
- **Vercel을 활용한 배포 및 CI/CD 환경 구축**

---

## 📜 기타 참고 사항

- `.env` 파일을 사용하여 **API 키 관리**
- GitHub **PR(Pull Request) 기반 협업**
- `.gitignore`를 활용하여 **불필요한 파일 제외**
