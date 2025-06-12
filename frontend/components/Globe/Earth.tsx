"use client";
import { useLoader } from "@react-three/fiber";
import React, { useRef } from "react";
import { TextureLoader } from 'three'
import * as THREE from 'three'

interface EarthProps {
    isNight: boolean  
}

export default function Earth({ isNight }: EarthProps) {
    const meshRef = useRef<THREE.Mesh>(null);
    
    const dayTexture = useLoader(TextureLoader, '/textures/earth_day.jpg')
    const nightTexture = useLoader(TextureLoader, '/textures/earth_night.jpg')

    return (
        <mesh ref={meshRef}>
            <sphereGeometry args={[1, 64, 32]} />
            <meshStandardMaterial 
                map={isNight ? nightTexture : dayTexture}  
                emissive={isNight ? "#111111" : "#000000"} 
                emissiveIntensity={isNight ? 2.0 : 0}     
            />
        </mesh>
    );
}