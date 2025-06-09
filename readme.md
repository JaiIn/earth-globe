# 🌍 Interactive Earth

> **차세대 3D 지구 탐험 플랫폼**  
> Explore the World in Real-Time 3D

[![Next.js](https://img.shields.io/badge/Next.js-15.3.3-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Three.js-0.177-green?style=flat-square&logo=three.js)](https://threejs.org/)
[![Nest.js](https://img.shields.io/badge/Nest.js-Latest-red?style=flat-square&logo=nestjs)](https://nestjs.com/)

---

## 📋 프로젝트 개요

**Interactive Earth**는 실시간 데이터와 최첨단 3D 기술을 결합한 혁신적인 지구 탐험 플랫폼입니다. 사용자는 인터랙티브한 3D 지구본을 통해 전 세계의 실시간 정보를 직관적으로 탐색하고 시각화할 수 있습니다.

### 🎯 핵심 가치

- **🌐 몰입형 3D 경험**: Three.js 기반의 고품질 3D 지구 렌더링
- **📡 실시간 데이터**: 전 세계 날씨, 인구, 경제 데이터 실시간 연동
- **⚡ 최적화된 성능**: Next.js SSG/ISR을 통한 초고속 로딩
- **🎨 직관적 인터페이스**: 사용자 중심의 인터랙티브 UI/UX
- **📱 크로스 플랫폼**: 모든 디바이스에서 일관된 경험 제공

### 🌟 주요 특징

#### 🗺️ **인터랙티브 3D 지구본**
- 실제 지구와 같은 고해상도 텍스처 매핑
- 부드러운 마우스/터치 인터랙션 (회전, 줌, 클릭)
- 실시간 조명 효과 및 대기권 시뮬레이션

#### 📊 **실시간 글로벌 데이터**
- 전 세계 주요 도시 날씨 정보
- 국가별 인구, 경제, 지리 통계
- 위성 궤도 및 항공 교통 데이터

#### 🎯 **지능형 탐색 시스템**
- 빠른 국가/도시 검색 및 자동 포커싱
- 개인화된 즐겨찾기 및 탐색 기록
- 스마트 추천 알고리즘

---

## 🛠️ 기술 스택

### **Frontend Architecture**
```typescript
Framework     : Next.js 14 (App Router, Turbopack)
Language      : TypeScript 5.0
3D Engine     : Three.js + @react-three/fiber
Styling       : Tailwind CSS 4.0
Animation     : Framer Motion
State         : React Hooks + Context API
Icons         : Lucide React
```

### **Backend Architecture**
```typescript
Framework     : Nest.js (Latest)
Language      : TypeScript 5.0
Architecture  : Modular Microservices
API Design    : RESTful + GraphQL Ready
Validation    : Class Validator + Transform
Documentation : Swagger/OpenAPI
```

### **Data & Infrastructure**
```typescript
Database      : PostgreSQL (지리 데이터)
Cache         : Redis (성능 최적화)
External APIs : OpenWeatherMap, REST Countries
File Storage  : Static Assets (텍스처, 이미지)
Deployment    : Vercel (Frontend) + Railway (Backend)
```

### **Development Tools**
```typescript
Version Control : Git + GitHub
Code Quality    : ESLint + Prettier
Type Safety     : TypeScript Strict Mode
Testing         : Jest + React Testing Library
CI/CD           : GitHub Actions
Package Manager : npm
```

---

## 📁 프로젝트 구조

```
interactive-earth/
│
├── 🎨 frontend/                    # Next.js 프론트엔드
│   ├── app/                       # App Router 페이지
│   │   ├── page.tsx              # 메인 3D 지구본
│   │   ├── countries/[slug]/     # 국가별 상세 페이지 (SSG)
│   │   ├── cities/[slug]/        # 도시별 정보 페이지 (SSG)
│   │   ├── weather/              # 실시간 날씨 대시보드 (ISR)
│   │   └── explore/              # 탐색 및 검색 페이지
│   │
│   ├── components/               # 재사용 컴포넌트
│   │   ├── Globe/               # 3D 지구본 컴포넌트
│   │   │   ├── Earth.tsx        # 메인 지구 렌더링
│   │   │   ├── Controls.tsx     # 지구본 컨트롤
│   │   │   └── Markers.tsx      # 위치 마커 시스템
│   │   │
│   │   ├── UI/                  # 공통 UI 컴포넌트
│   │   │   ├── SearchBar.tsx    # 지능형 검색
│   │   │   ├── InfoPanel.tsx    # 정보 패널
│   │   │   └── Navigation.tsx   # 네비게이션
│   │   │
│   │   └── Layout/              # 레이아웃 컴포넌트
│   │       ├── Header.tsx       # 글로벌 헤더
│   │       ├── Sidebar.tsx      # 사이드바
│   │       └── Footer.tsx       # 푸터
│   │
│   ├── lib/                     # 유틸리티 및 설정
│   │   ├── api.ts              # API 클라이언트
│   │   ├── utils.ts            # 공통 유틸리티
│   │   └── constants.ts        # 상수 정의
│   │
│   ├── public/                  # 정적 파일
│   │   ├── textures/           # 지구 텍스처 이미지
│   │   ├── models/             # 3D 모델 파일
│   │   └── icons/              # 아이콘 리소스
│   │
│   └── types/                   # TypeScript 타입 정의
│       ├── globe.ts            # 3D 관련 타입
│       ├── api.ts              # API 응답 타입
│       └── common.ts           # 공통 타입
│
├── ⚙️ backend/                     # Nest.js 백엔드
│   ├── src/
│   │   ├── modules/            # 기능별 모듈
│   │   │   ├── countries/      # 국가 정보 API
│   │   │   ├── cities/         # 도시 정보 API
│   │   │   ├── weather/        # 실시간 날씨 API
│   │   │   └── search/         # 검색 엔진 API
│   │   │
│   │   ├── common/             # 공통 모듈
│   │   │   ├── guards/         # 인증/인가
│   │   │   ├── interceptors/   # 응답 변환
│   │   │   └── pipes/          # 데이터 검증
│   │   │
│   │   ├── config/             # 설정 관리
│   │   └── database/           # 데이터베이스 연결
│   │
│   └── test/                   # 테스트 파일
│
├── 📚 docs/                       # 프로젝트 문서
│   ├── api/                    # API 문서
│   ├── deployment/             # 배포 가이드
│   └── development/            # 개발 가이드
│
├── 🔧 scripts/                    # 빌드/배포 스크립트
├── 📄 README.md                   # 프로젝트 메인 문서
└── 📋 package.json                # 워크스페이스 설정
```

---

## 🚀 주요 기능 미리보기

| 기능 | 설명 | 기술 |
|------|------|------|
| **3D 지구본** | 실시간 인터랙티브 지구 렌더링 | Three.js + WebGL |
| **스마트 검색** | 국가/도시 지능형 검색 시스템 | Fuzzy Search + API |
| **실시간 날씨** | 전 세계 날씨 데이터 시각화 | OpenWeatherMap API |
| **국가 정보** | 상세한 국가별 통계 및 정보 | REST Countries API |
| **성능 최적화** | 초고속 로딩 및 반응성 | Next.js SSG/ISR |
| **반응형 디자인** | 모든 디바이스 최적화 | Tailwind CSS |

---