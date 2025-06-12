'use client'
import { Canvas } from '@react-three/fiber'
import React from 'react'
import Earth from './Earth'
import { OrbitControls } from '@react-three/drei'

export default function Scene() {
  return (
    <Canvas
        camera={{
            position:[0,0,3],
            fov:75,
            near: 0.1,
            far: 1000
        }}
        className="w-full h-full bg-black">
        <ambientLight intensity={0.4}/>
        <directionalLight
            position={[10,10,5]}
            intensity={1} />

        <OrbitControls 
            enablePan={false}     
            enableZoom={true}     
            enableRotate={true}  
            minDistance={1.5}     
            maxDistance={5}      
            enableDamping={false}  
            dampingFactor={0.05}  
        />
        <Earth/>
    </Canvas>    
  )
}
