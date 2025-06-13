'use client'
import { useRef } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'
import * as THREE from 'three'

export default function Clouds() {
    const cloudsRef = useRef<THREE.Mesh>(null)
    
    const cloudTexture = useLoader(TextureLoader, '/textures/earth_clouds.jpg')
    
    useFrame((state, delta) => {
        if (cloudsRef.current) {
        cloudsRef.current.rotation.y += delta * 0.09 
        }
    })

    return (
        <mesh>
        <sphereGeometry args={[1.01, 64, 32]} />
        <meshStandardMaterial 
            map={cloudTexture}           
            transparent={true}
            opacity={0.3}               
            alphaTest={0.1}             
            side={THREE.DoubleSide}    
        />
        </mesh>
    )
}