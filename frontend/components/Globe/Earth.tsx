"use client";
import { useLoader } from "@react-three/fiber";
import React, { useRef } from "react";
import { TextureLoader } from 'three'
import * as THREE from 'three'

export default function Earth() {
    const meshRef = useRef<THREE.Mesh>(null);
    
    const texture = useLoader(TextureLoader, '/textures/earth_day.jpg')

    // useFrame((state, delta) => {
    //     if (meshRef.current){
    //         meshRef.current.rotation.y += delta * 0.2
    //     }
    // })

    return (
        <mesh ref={meshRef}>
            <sphereGeometry args={[1, 64, 32]} />
            <meshStandardMaterial map={texture} />
        </mesh>
    );
}