'use client'
import { Canvas } from '@react-three/fiber'
import React from 'react'
import Earth from './Earth'

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
        <Earth/>
    </Canvas>    
  )
}
