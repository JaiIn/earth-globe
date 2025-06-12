"use client";
import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import * as THREE from 'three'


export default function Earth() {

    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state, delta) => {
        if (meshRef.current){
            meshRef.current.rotation.y += delta * 0.2
        }
    })

    return (
        <mesh ref={meshRef}>
            <sphereGeometry args={[1, 64, 32]} />
            <meshStandardMaterial color="blue" />
        </mesh>
    );
}
