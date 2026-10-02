# ProjectHub Frontend

## 📌 프로젝트 소개

ProjectHub는 프로젝트, 작업, 구성원을 한곳에서 관리하는 협업 서비스입니다.

이 저장소는 프로젝트와 작업을 관리하는 웹 사용자 인터페이스를 제공합니다.

---

## ✨ 주요 기능

- 회원가입, 로그인 및 사용자 정보 관리
- 프로젝트 생성·수정·삭제 및 검색·상태 필터링
- 프로젝트 구성원 추가·삭제 및 역할 관리
- 프로젝트별 작업 관리, 담당자 지정 및 일괄 수정
- 작업 목록·보드 전환과 프로젝트 진행 현황 시각화
- 내 작업 필터링, 캘린더 및 마감 임박 알림

---

## 🔄 핵심 사용자 흐름
**프로젝트 구성**  
회원가입·로그인 → 프로젝트 생성 → 구성원 추가 → 역할 설정

**작업 관리**  
작업 생성 → 담당자·상태·마감일 설정 → 목록·보드에서 진행 상황 관리

**일정 및 현황 확인**  
내 작업 확인 → 상태별 필터링 → 캘린더 일정 확인 → 마감 임박 알림 및 프로젝트 현황 확인
---

## 🚀 배포

- **Production:** [https://project-manage-fe.vercel.app](https://project-manage-fe.vercel.app)
- **Platform:** Vercel
- **CI:** GitHub Actions
- **CD:** Vercel Git 연동
- **Deployment Trigger:** `dev` 브랜치 push 시 Preview 배포, `master`
  브랜치 push 시 Production 배포
- **Environment Variables:** Vercel 프로젝트 설정에서 관리
- **Workflow:** [`.github/workflows/CI.yml`](.github/workflows/CI.yml)

---

## 🛠 기술 스택

- **Language:** TypeScript
- **Framework:** Next.js, React
- **Styling:** Tailwind CSS
- **Data Fetching:** TanStack Query, Axios
- **Component Documentation:** Storybook

---

## 💻 실행 방법

### 사전 요구사항

- Node.js 20.9 이상
- npm 설치
- 실행 중인 ProjectHub 백엔드 API

### 프로젝트 설치

```bash
git clone https://github.com/ajdzn55/project-manage-fe.git
cd project-manage-fe
npm install
```

### 환경 변수 설정

프로젝트 루트에 `.env.development` 파일을 생성하고 다음 값을 설정합니다.

```dotenv
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)에 접속합니다.

---

## 📚 Storybook

공통 UI 컴포넌트는 Storybook에서 독립적으로 확인할 수 있습니다.

```bash
npm run storybook
```

실행 후 [http://localhost:6006](http://localhost:6006)에 접속합니다.

---

## 📁 폴더 구조

```text
project-manage-fe
├── app/             # 페이지, 라우트 및 레이아웃
│   ├── login/       # 로그인 페이지
│   ├── sign-up/     # 회원가입 페이지
│   └── project/     # 프로젝트, 작업, 캘린더, 프로필 페이지
├── components/      # 공통 UI 컴포넌트 및 Storybook 스토리
├── features/        # 도메인별 기능
│   ├── auth/        # 인증 UI, 접근 제어 및 토큰 타입
│   ├── project/     # 프로젝트, 작업, 구성원 및 캘린더
│   │   ├── api/         # API 요청 함수
│   │   ├── components/  # 도메인 UI
│   │   ├── hooks/       # React Query 훅
│   │   ├── constants/   # 옵션 및 테이블 정의
│   │   └── types/       # 프로젝트와 작업 타입
│   └── user/        # 사용자 API, 프로필, 훅 및 타입
├── lib/             # Axios 및 React Query 설정
├── constants/       # 애플리케이션 공통 상수
├── utils/           # 알림 및 데이터 처리 유틸리티
├── public/          # 폰트 등 정적 파일
└── .storybook/      # Storybook 설정
```
