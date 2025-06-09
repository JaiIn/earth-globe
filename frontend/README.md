# 🌍 3D Interactive Earth Globe - Frontend

> Next.js 14 + Three.js를 활용한 인터랙티브 지구본 웹 애플리케이션

## 🚀 기술 스택

- **Framework**: Next.js 14 (App Router, Turbopack)
- **Language**: TypeScript
- **3D Graphics**: Three.js, @react-three/fiber, @react-three/drei
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Icons**: Lucide React

## 📦 주요 라이브러리

```json
{
  "three": "^0.177.0",
  "@react-three/fiber": "^9.1.2", 
  "@react-three/drei": "^10.1.2",
  "framer-motion": "^12.16.0",
  "lucide-react": "^0.513.0"
}
```

## 🛠️ 개발 환경 설정

### 개발 서버 실행
```bash
npm run dev
```
브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

### 빌드
```bash
npm run build
npm start
```

### 코드 검사
```bash
npm run lint
```

## 📁 프로젝트 구조

```
frontend/
├── app/                    # Next.js App Router
│   ├── page.tsx           # 메인 3D 지구본 페이지
│   ├── countries/         # 국가별 페이지 (SSG)
│   ├── weather/           # 실시간 날씨 (ISR)
│   └── layout.tsx         # 루트 레이아웃
├── components/            # 재사용 컴포넌트
│   ├── Globe/            # 3D 지구본 컴포넌트
│   ├── UI/               # 공통 UI 컴포넌트
│   └── Layout/           # 레이아웃 컴포넌트
├── lib/                  # 유틸리티 함수
├── public/              # 정적 파일
│   └── textures/        # 지구 텍스처 이미지
└── types/               # TypeScript 타입 정의
```

## ✨ 주요 기능

- **3D 지구본 렌더링**: Three.js를 활용한 인터랙티브 지구
- **마우스 인터랙션**: 회전, 줌, 클릭 이벤트
- **국가별 정보**: SSG로 사전 생성된 국가 페이지
- **실시간 날씨**: ISR로 업데이트되는 날씨 데이터
- **반응형 디자인**: 모든 디바이스 대응
- **성능 최적화**: Next.js 최적화 기능 활용

## 🎯 Next.js 활용 기능

- **SSG**: 국가/도시 정보 페이지 사전 생성
- **ISR**: 실시간 데이터 점진적 업데이트
- **Image Optimization**: 자동 이미지 최적화
- **Turbopack**: 빠른 개발 서버
- **App Router**: 최신 라우팅 시스템

## 🔗 관련 링크

- [Next.js 공식 문서](https://nextjs.org/docs)
- [Three.js 공식 문서](https://threejs.org/docs/)
- [@react-three/fiber 문서](https://docs.pmnd.rs/react-three-fiber)
- [Tailwind CSS 문서](https://tailwindcss.com/docs)

## 📝 개발 메모

- **포트**: 3000 (프론트엔드)
- **API 서버**: http://localhost:3001 (백엔드)
- **타입스크립트**: 전체 프로젝트 타입 안전성 보장
- **ESLint**: 코드 품질 관리

---