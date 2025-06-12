'use client'
import { useRef, useMemo } from 'react'
// import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Stars() {
    const pointsRef = useRef<THREE.Points>(null)
    
    const positions = useMemo(() => {
        const positions = new Float32Array(1000 * 3)
        for (let i = 0; i < 1000; i++) {
        const radius = 50 + Math.random() * 50  
        const theta = Math.random() * Math.PI * 2  
        const phi = Math.random() * Math.PI  
        
        positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)      
        positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)    
        positions[i * 3 + 2] = radius * Math.cos(phi)                   
        }
        return positions
    }, [])
    
    return (
        <points ref={pointsRef}>
        <bufferGeometry>
            <bufferAttribute
            attach="attributes-position"
            count={1000}
            array={positions}
            itemSize={3}
            />
        </bufferGeometry>
        <pointsMaterial 
        color="white" 
        size={Math.random() * 0.8 + 0.2}  
        transparent={true}
        opacity={Math.random() * 0.8 + 0.2}  
        sizeAttenuation={false}
        />
        </points>
    )
}