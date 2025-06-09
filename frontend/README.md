# 🌍 Interactive Earth - Frontend

> Next.js 14 + Three.js를 활용한 3D 지구본 프론트엔드 애플리케이션

## 🚀 Quick Start

```bash
# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 프로덕션 실행
npm start
```

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

### 🔄 **컴포넌트 상호작용 흐름**

```typescript
// 데이터 흐름 예시
App
├── Globe (3D 렌더링)
│   ├── Earth (지구 본체)
│   ├── Markers (위치 마커들)
│   └── Controls (사용자 인터랙션)
│
├── SearchBar (검색)
│   └── onSearch() → Globe.focusLocation()
│
└── InfoPanel (정보 표시)
    └── selectedLocation ← Globe.onMarkerClick()
```

---

## 🎨 Three.js 사용법

### 🌍 **기본 지구본 설정**

```typescript
// components/Globe/Earth.tsx
import { useRef } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls, useTexture } from '@react-three/drei'
import * as THREE from 'three'

export function Earth() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  // 지구 텍스처 로드
  const [colorMap, normalMap, specularMap] = useTexture([
    '/textures/earth-day.jpg',
    '/textures/earth-normal.jpg', 
    '/textures/earth-specular.jpg'
  ])

  // 지구 회전 애니메이션
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1
    }
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshPhongMaterial 
        map={colorMap}
        normalMap={normalMap}
        specularMap={specularMap}
        shininess={100}
      />
    </mesh>
  )
}
```

### 🎮 **인터랙션 시스템**

```typescript
// components/Globe/Controls.tsx
import { OrbitControls } from '@react-three/drei'
import { useThree } from '@react-three/fiber'

export function GlobeControls() {
  const { camera, gl } = useThree()

  const handleCountryClick = (countryCode: string) => {
    // 국가 클릭 시 카메라 이동
    const country = getCountryCoordinates(countryCode)
    animateCameraToPosition(camera, country.lat, country.lng)
  }

  return (
    <OrbitControls
      args={[camera, gl.domElement]}
      enableZoom={true}
      enablePan={false}
      enableRotate={true}
      minDistance={1.5}
      maxDistance={5}
      autoRotate={false}
    />
  )
}
```

### 🎯 **마커 시스템**

```typescript
// components/Globe/Markers.tsx
interface CountryMarker {
  code: string
  name: string
  position: [number, number, number]
  population: number
}

export function CountryMarkers({ countries }: { countries: CountryMarker[] }) {
  return (
    <group>
      {countries.map((country) => (
        <mesh
          key={country.code}
          position={country.position}
          onClick={() => onCountrySelect(country)}
        >
          <sphereGeometry args={[0.02, 16, 16]} />
          <meshBasicMaterial color="#ff6b6b" />
        </mesh>
      ))}
    </group>
  )
}
```

### ✨ **시각 효과**

```typescript
// components/Globe/Effects.tsx
export function AtmosphereGlow() {
  const atmosphereRef = useRef<THREE.Mesh>(null)

  return (
    <mesh ref={atmosphereRef} scale={1.1}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshBasicMaterial
        color="#87CEEB"
        transparent
        opacity={0.1}
        side={THREE.BackSide}
      />
    </mesh>
  )
}
```

---

## ⚡ Next.js 특화 기능 활용

### 🚀 **SSG (Static Site Generation)**

```typescript
// app/countries/[slug]/page.tsx
interface CountryPageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  // 모든 국가 목록 미리 생성
  const countries = await fetch('http://localhost:3001/api/countries')
    .then(res => res.json())
  
  return countries.map((country: any) => ({
    slug: country.code.toLowerCase()
  }))
}

export async function generateMetadata({ params }: CountryPageProps) {
  const country = await getCountryData(params.slug)
  
  return {
    title: `${country.name} - Interactive Earth`,
    description: `Explore ${country.name} in 3D. Population: ${country.population}`,
    openGraph: {
      images: [`/images/countries/${params.slug}.jpg`]
    }
  }
}

export default async function CountryPage({ params }: CountryPageProps) {
  const country = await getCountryData(params.slug)
  
  return (
    <div>
      <CountryHero country={country} />
      <CountryStats country={country} />
      <GlobeView focusCountry={country.code} />
    </div>
  )
}
```

### 🔄 **ISR (Incremental Static Regeneration)**

```typescript
// app/weather/page.tsx
export const revalidate = 300 // 5분마다 재생성

export default async function WeatherPage() {
  const weatherData = await fetch('http://localhost:3001/api/weather/global', {
    next: { revalidate: 300 }
  }).then(res => res.json())

  return (
    <div>
      <WeatherGlobe data={weatherData} />
      <WeatherStats data={weatherData} />
    </div>
  )
}
```

### 🖼️ **이미지 최적화**

```typescript
// components/UI/CountryCard.tsx
import Image from 'next/image'

export function CountryCard({ country }) {
  return (
    <div className="country-card">
      <Image
        src={`/images/flags/${country.code.toLowerCase()}.svg`}
        alt={`${country.name} flag`}
        width={64}
        height={48}
        priority={false}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,..."
      />
      <h3>{country.name}</h3>
    </div>
  )
}
```

### 📱 **반응형 3D 렌더링**

```typescript
// components/Globe/ResponsiveGlobe.tsx
import { useEffect, useState } from 'react'

export function ResponsiveGlobe() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkDevice()
    window.addEventListener('resize', checkDevice)
    return () => window.removeEventListener('resize', checkDevice)
  }, [])

  return (
    <Canvas
      camera={{ 
        position: [0, 0, isMobile ? 3 : 2.5],
        fov: isMobile ? 75 : 60
      }}
      performance={{ 
        min: isMobile ? 0.5 : 0.8 
      }}
    >
      <Earth quality={isMobile ? 'low' : 'high'} />
    </Canvas>
  )
}
```

### 🎯 **동적 컴포넌트 로딩**

```typescript
// app/page.tsx
import dynamic from 'next/dynamic'

// Three.js 컴포넌트는 클라이언트에서만 로드
const GlobeViewer = dynamic(
  () => import('@/components/Globe/GlobeViewer'),
  { 
    ssr: false,
    loading: () => <GlobeLoadingSkeleton />
  }
)

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <GlobeViewer />
      <FeatureSection />
    </div>
  )
}
```

---

## 🛠️ 개발 팁

### 🎨 **Three.js 성능 최적화**

```typescript
// 1. Geometry 재사용
const sphereGeometry = useMemo(() => new THREE.SphereGeometry(1, 64, 64), [])

// 2. 텍스처 캐싱
const textureLoader = useMemo(() => new THREE.TextureLoader(), [])

// 3. 불필요한 리렌더링 방지
const EarthMesh = memo(({ texture }: { texture: THREE.Texture }) => {
  return (
    <mesh geometry={sphereGeometry}>
      <meshPhongMaterial map={texture} />
    </mesh>
  )
})
```

### 🔧 **디버깅 도구**

```typescript
// 개발 중 도움되는 Three.js 헬퍼
import { Stats, OrbitControls } from '@react-three/drei'

export function DevelopmentHelpers() {
  return (
    <>
      <Stats />
      <axesHelper args={[2]} />
      <gridHelper args={[10, 10]} />
    </>
  )
}
```

---

**🌍 Ready to build amazing 3D experiences? Let's start coding!**

*For backend API integration, check the [Backend README](../backend/README.md)*