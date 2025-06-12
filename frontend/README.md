# 🌍 Interactive Earth - Frontend

> Next.js 14 + Three.js를 활용한 3D 지구본 프론트엔드 애플리케이션

---

## 🎮 컴포넌트 구조

### 📁 **주요 컴포넌트 아키텍처**

```typescript
components/
├── 🌍 Globe/                    # 3D 지구본 컴포넌트
│   ├── Earth.tsx               # 메인 지구 렌더링
│   │   ├── EarthSphere         # 지구 구체 geometry
│   │   ├── EarthTexture        # 텍스처 매핑 관리
│   │   └── EarthLighting       # 조명 시스템
│   │
│   ├── Controls.tsx            # 지구본 인터랙션 컨트롤
│   │   ├── OrbitControls       # 회전/줌 컨트롤
│   │   ├── CameraManager       # 카메라 위치 관리
│   │   └── AnimationController # 자동 회전 등
│   │
│   ├── Markers.tsx             # 위치 마커 시스템
│   │   ├── CountryMarker       # 국가별 마커
│   │   ├── CityMarker          # 도시별 마커
│   │   └── WeatherMarker       # 날씨 정보 마커
│   │
│   └── Effects.tsx             # 시각 효과
│       ├── AtmosphereGlow      # 대기권 글로우
│       ├── CloudLayer          # 구름 레이어
│       └── StarField           # 배경 별자리
│
├── 🎨 UI/                      # 사용자 인터페이스
│   ├── SearchBar.tsx           # 지능형 검색
│   │   ├── AutoComplete        # 자동완성
│   │   ├── SearchResults       # 검색 결과
│   │   └── RecentSearches      # 최근 검색
│   │
│   ├── InfoPanel.tsx           # 정보 패널
│   │   ├── CountryInfo         # 국가 정보
│   │   ├── WeatherInfo         # 날씨 정보
│   │   └── StatisticsChart     # 통계 차트
│   │
│   └── Navigation.tsx          # 네비게이션
│       ├── MainMenu            # 메인 메뉴
│       ├── LayerToggle         # 레이어 토글
│       └── ViewModeSelector    # 뷰 모드 선택
│
└── 📱 Layout/                  # 레이아웃 컴포넌트
    ├── Header.tsx              # 글로벌 헤더
    ├── Sidebar.tsx             # 사이드바
    └── Footer.tsx              # 푸터
```

---

**🌍 Ready to build amazing 3D experiences? Let's start coding!**

*For backend API integration, check the [Backend README](../backend/README.md)*