import React from 'react'
import * as THREE from 'three'
import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { City, cityApi } from '@/lib/api/cities'

const ChangePositionVector3 = (lat: number, lng: number, radius = 1.02) => {
    const latRad = lat * (Math.PI / 180)
    const lngRad = lng * (Math.PI / 180)
    
    const x = radius * Math.cos(latRad) * Math.cos(lngRad)
    const y = radius * Math.sin(latRad)
    const z = -radius * Math.cos(latRad) * Math.sin(lngRad)

    return new THREE.Vector3(x, y, z)
}

const CityMarker = ({city, onCityClick, selectedCityId}: {city:City, onCityClick: (city: City) => void, selectedCityId: number | null}) => {
    const [hovered, setHovered] = useState(false)
    const markerRef = useRef<THREE.Group>(null)
    const pinHeadRef = useRef<THREE.Mesh>(null)
    const pinTailRef = useRef<THREE.Mesh>(null)

    const position = ChangePositionVector3(city.latitude, city.longitude)
    
    const direction = position.clone().normalize()
    const isSelected = selectedCityId === city.id

    useFrame((state) => {
        if (markerRef.current) {
            if (isSelected) {
                const scale = 1.5 + Math.sin(state.clock.elapsedTime * 4) * 0.1
                markerRef.current.scale.setScalar(scale)
            } else if (hovered) {
                markerRef.current.scale.setScalar(1.3)
            } else {
                markerRef.current.scale.setScalar(1)
            }
        }
        
        if (pinHeadRef.current && (hovered || isSelected)) {
            const pulse = 1 + Math.sin(state.clock.elapsedTime * 6) * 0.1
            pinHeadRef.current.scale.setScalar(pulse)
        } else if (pinHeadRef.current) {
            pinHeadRef.current.scale.setScalar(1)
        }
    })

    const getMarkerColor = () => {
        if (city.tags.includes('capital')) return '#FFD700'    // 금색 - 수도
        if (city.tags.includes('megacity')) return '#FF0000'   // 빨강 - 메가시티
        if (city.tags.includes('tech-hub')) return '#00FF00'   // 초록 - 기술허브
        if (city.tags.includes('financial-hub')) return '#0066FF' // 파랑 - 금융허브
        return '#FF8800' // 주황 - 기본
    }
    const getPinSize = () => {
        if (!city.population) return { head: 0.008, tail: 0.015 }
        if (city.population > 15000000) return { head: 0.015, tail: 0.025 }  // 초대형
        if (city.population > 10000000) return { head: 0.012, tail: 0.020 }  // 대형  
        if (city.population > 5000000) return { head: 0.010, tail: 0.018 }   // 중형
        return { head: 0.008, tail: 0.015 } // 소형
    }

    const handleClick = (event: any) => {
        event.stopPropagation()
        onCityClick(city)
    }
    const color = getMarkerColor()
    const size = getPinSize()
    
    const up = new THREE.Vector3(0, 1, 0)
    const quaternion = new THREE.Quaternion().setFromUnitVectors(up, direction)

    return (
        <group
            ref={markerRef}
            position={[position.x, position.y, position.z]}
            quaternion={quaternion}
            onClick={handleClick}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
        >
            <mesh 
                ref={pinTailRef}
                position={[0, -size.tail/2, 0]}
            >
                <coneGeometry args={[size.tail/3, size.tail, 8]} />
                <meshBasicMaterial 
                    color={color}
                    transparent={true}
                    opacity={0.8}
                />
            </mesh>
            
            <mesh 
                ref={pinHeadRef}
                position={[0, size.head, 0]}
            >
                <sphereGeometry args={[size.head, 12, 8]} />
                <meshBasicMaterial 
                    color={color}
                    transparent={true}
                    opacity={0.9}
                />
            </mesh>
            
            {/* 호버/클릭 시 글로우 효과 */}
            {(hovered || isSelected) && (
                <mesh position={[0, size.head, 0]}>
                    <sphereGeometry args={[size.head * 1.8, 12, 8]} />
                    <meshBasicMaterial 
                        color={color}
                        transparent={true}
                        opacity={0.2}
                    />
                </mesh>
            )}
        </group>
    )
}

interface CityMarkersProps {
    onCityClick: (city: City) => void
    selectedCityId: number | null
}

export const CityMarkers = ({ onCityClick, selectedCityId }: CityMarkersProps) => {

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
            <CityMarker key={city.id} city={city} onCityClick={onCityClick} selectedCityId={selectedCityId} />
        ))}
        </group>
    )
}
