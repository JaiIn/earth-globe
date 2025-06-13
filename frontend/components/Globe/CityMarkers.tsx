import React from 'react'
import * as THREE from 'three'
import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { City, cityApi } from '@/lib/api/cities'

const ChangePositionVector3 = (lat: number, lng: number, radius = 1.02) => {
    // 위도와 경도를 라디안으로 변환
    const latRad = lat * (Math.PI / 180)
    const lngRad = lng * (Math.PI / 180)
    
    // 구면 좌표를 직교 좌표로 변환 (아시아 중심 맞춤)
    const x = radius * Math.cos(latRad) * Math.cos(lngRad)
    const y = radius * Math.sin(latRad)
    const z = -radius * Math.cos(latRad) * Math.sin(lngRad)

    return new THREE.Vector3(x, y, z)
}

const CityMarker = ({city}: {city:City}) => {
    const [hovered, setHovered] = useState(false)
    const [clicked, setClicked] = useState(false)
    const markerRef = useRef<THREE.Mesh>(null)

    const position = ChangePositionVector3(city.latitude, city.longitude)

    useFrame((state) => {
        if (markerRef.current) {
        if (clicked) {
            markerRef.current.scale.setScalar(1.5 + Math.sin(state.clock.elapsedTime * 4) * 0.1)
        } else if (hovered) {
            markerRef.current.scale.setScalar(1.3)
        } else {
            markerRef.current.scale.setScalar(1)
        }
        }
    })

    const getMarkerColor = () => {
        if (city.tags.includes('capital')) return '#FFD700'    // 금색 - 수도
        if (city.tags.includes('megacity')) return '#FF0000'   // 빨강 - 메가시티
        if (city.tags.includes('tech-hub')) return '#00FF00'   // 초록 - 기술허브
        if (city.tags.includes('financial-hub')) return '#0066FF' // 파랑 - 금융허브
        return '#FF8800' // 주황 - 기본
    }
    const getMarkerSize = () => {
        if (!city.population) return 0.006
        if (city.population > 15000000) return 0.012  // 초대형
        if (city.population > 10000000) return 0.010  // 대형  
        if (city.population > 5000000) return 0.008   // 중형
        return 0.006 // 소형
    }

    const handleClick = (event: any) => {
        event.stopPropagation()
        setClicked(!clicked)
        
        const populationText = city.population 
        ? ` | Population: ${(city.population / 1000000).toFixed(1)}M`
        : ''
        
        const tagsText = city.tags.length > 0 ? ` | Tags: ${city.tags.join(', ')}` : ''
        
        alert(`${city.name}, ${city.country}${populationText}${tagsText}`)
    }
    
    return (
        <mesh
            ref={markerRef}
            position={[position.x, position.y, position.z]}
            onClick={handleClick}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            >
            <sphereGeometry args={[getMarkerSize(), 8, 8]} />
            <meshBasicMaterial 
                color={getMarkerColor()}
                transparent={true}
                opacity={0.8}
            />
        </mesh>
    )
}

export const CityMarkers = () => {

    const [cities, setCities] = useState<City[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const groupRef = useRef<THREE.Group>(null) 

    useFrame((state, delta) => {
        if (groupRef.current) {
        groupRef.current.rotation.y += delta * 0.08 
        }
    })


    useEffect(() => {
        const loadCities = async () => {
            try {
                setLoading(true);
                const data = await cityApi.getAll();
                setCities(data);
            } catch (error) {
                console.log(error);
            } finally{
                setLoading(false);
            }
        }
        loadCities();
    },[]);

    return (
        <group >
        {cities.map((city) => (
            <CityMarker key={city.id} city={city} />
        ))}
        </group>
    )
}
