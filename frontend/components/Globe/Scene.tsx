'use client'
import { Canvas } from '@react-three/fiber'
import React from 'react'
import Earth from './Earth'
import Stars from './Stars'
import Atmosphere from './Atmosphere'
import Controls from './Controls'  
import Clouds from './Clouds'

export default function Scene() {
    return (
        <Canvas
            camera={{
                position:[0,0,3],
                fov:75,
                near: 0.1,
                far: 1000
            }}
            className="w-full h-full bg-black"
        >
            <ambientLight intensity={1.5} />
            {/* <directionalLight 
                position={[10, 5, 5]} 
                intensity={1} 
            />
            <directionalLight 
                position={[-10, -5, -5]} 
                intensity={0.4}
            /> */}
            
            <Controls />
            <Stars />
            <Earth/>
            <Clouds/>
            <Atmosphere />
        </Canvas>    
    )
}