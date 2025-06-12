'use client'
import { OrbitControls } from '@react-three/drei'

export default function Controls() {
    return (
        <OrbitControls 
        enablePan={false}
        enableZoom={true}
        enableRotate={true}
        minDistance={1.2}
        maxDistance={5}
        enableDamping={false}
        dampingFactor={0.05}
        rotateSpeed={0.3}
        />
    )
}