'use client'
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Stars() {
    const pointsRef = useRef<THREE.Points>(null)
    
    const { positions, colors, sizes } = useMemo(() => {
        const positions = new Float32Array(1000 * 3)
        const colors = new Float32Array(1000 * 3)
        const sizes = new Float32Array(1000)
        
        for (let i = 0; i < 1000; i++) {
        const radius = 50 + Math.random() * 50
        const theta = Math.random() * Math.PI * 2
        const phi = Math.random() * Math.PI
        
        positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
        positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
        positions[i * 3 + 2] = radius * Math.cos(phi)
        
        const brightness = 0.8 + Math.random() * 0.2 
        colors[i * 3] = brightness                    
        colors[i * 3 + 1] = brightness                 
        colors[i * 3 + 2] = brightness + Math.random() * 0.1  
        
        sizes[i] = Math.random() * 3 + 1 
        }
        
        return { positions, colors, sizes }
    }, [])
    
    useFrame((state, delta) => {
        if (pointsRef.current) {
        pointsRef.current.rotation.y += delta * 0.01
        
        const material = pointsRef.current.material as THREE.PointsMaterial
        material.opacity = 0.8 + Math.sin(state.clock.elapsedTime * 2) * 0.2
        }
    })

    return (
        <points ref={pointsRef}>
        <bufferGeometry>
            <bufferAttribute
            attach="attributes-position"
            count={1000}
            array={positions}
            itemSize={3}
            />
            <bufferAttribute
            attach="attributes-color"
            count={1000}
            array={colors}
            itemSize={3}
            />
            <bufferAttribute
            attach="attributes-size"
            count={1000}
            array={sizes}
            itemSize={1}
            />
        </bufferGeometry>
        <pointsMaterial 
            vertexColors={true}          
            size={2}                 
            sizeAttenuation={false}     
            transparent={true}
            opacity={0.9}                
            blending={THREE.AdditiveBlending} 
        />
        </points>
    )
}