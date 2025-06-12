# 🌍 Interactive Earth

> **차세대 3D 지구 탐험 플랫폼**  
> Explore the World in Real-Time 3D

[![Next.js](https://img.shields.io/badge/Next.js-15.3.3-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Three.js-0.177-green?style=flat-square&logo=three.js)](https://threejs.org/)
[![Nest.js](https://img.shields.io/badge/Nest.js-Latest-red?style=flat-square&logo=nestjs)](https://nestjs.com/)

---

## 프로젝트 개요

**Interactive Earth**는 실시간 데이터와 3D 기술을 결합한 지구 탐험 플랫폼입니다. 
사용자는 3D 지구본을 통해 전 세계의 실시간 정보를 직관적으로 탐색하고 시각화할 수 있습니다.

### 핵심 가치

- **몰입형 3D 경험**: Three.js 기반의 고품질 3D 지구 렌더링
- **실시간 데이터**: 전 세계 날씨, 인구, 경제 데이터 실시간 연동
- **최적화된 성능**: Next.js SSG/ISR을 통한 초고속 로딩
- **직관적 인터페이스**: 사용자 중심의 인터랙티브 UI/UX
- **크로스 플랫폼**: 모든 디바이스에서 일관된 경험 제공

### 주요 특징

#### **인터랙티브 3D 지구본**
- 실제 지구와 같은 고해상도 텍스처 매핑
- 부드러운 마우스/터치 인터랙션 (회전, 줌, 클릭)
- 실시간 조명 효과 및 대기권 시뮬레이션

#### **실시간 글로벌 데이터**
- 전 세계 주요 도시 날씨 정보
- 국가별 인구, 경제, 지리 통계
- 위성 궤도 및 항공 교통 데이터

---

## 개발 진행 현황

### 완료된 기능 (2025년 6월 12일 기준)

#### Phase 1: 기본 3D 지구본 구현 완료
- Next.js 15 + Three.js 0.177 환경 구축
- 3D 지구본 메쉬 생성 (SphereGeometry + 실제 지구 텍스처)
- OrbitControls를 통한 마우스/터치 인터랙션
- 컴포넌트 모듈화 (Scene, Earth, Controls 분리)

#### Phase 2: 시각적 효과 구현 완료
- 별 배경 시스템 (1000개 포인트로 우주 환경 구현)
- 대기권 글로우 효과 (셰이더를 통한 지구 가장자리 발광)
- 구름층 추가 (별도 메쉬로 실제 구름 텍스처 적용)
- 조명 시스템 최적화 (양면 조명으로 전체 가시성 확보)

#### Phase 3: 낮/밤 모드 구현 완료
- Day/Night 텍스처 전환 시스템
- 셰이더 기반 부드러운 전환 애니메이션
- 밤 모드 도시 불빛 강화 효과
- UI 토글 버튼을 통한 실시간 모드 전환

### 현재 기술 스택
```
Frontend Framework : Next.js 15.3.3
3D Graphics       : Three.js 0.177.0
React Integration : @react-three/fiber 9.1.2
UI Controls       : @react-three/drei 10.1.2
Styling          : Tailwind CSS 4.0
Language         : TypeScript 5.0
```

### 다음 개발 계획

#### 단기 목표 (1-2주)
- 도시 마커 시스템 구현
- 검색 기능 및 자동 포커스
- 정보 패널 UI 개발

#### 중기 목표 (1개월)
- 실시간 날씨 데이터 연동
- 위성 궤도 시스템
- 사용자 인터페이스 개선

#### 장기 목표 (2-3개월)
- Nest.js 백엔드 구축
- 데이터베이스 연동
- 사용자 인증 시스템

---