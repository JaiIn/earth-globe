'use client'
import { Canvas } from '@react-three/fiber'
import React, { useState } from 'react' 
import Earth from './Earth'
import Stars from './Stars'
import Atmosphere from './Atmosphere'
import Controls from './Controls'
import Clouds from './Clouds'
import DayNightToggle from './DayNightToggle' 

export default function Scene() {
    const [isNight, setIsNight] = useState(false) 

    return (
        <div className="relative w-full h-full">
        <DayNightToggle isNight={isNight} onToggle={setIsNight} />
        
        <Canvas
            camera={{
                position:[0,0,3],
                fov:75,
                near: 0.1,
                far: 1000
            }}
            className="w-full h-full bg-black"
        >
            {/* 밤/낮에 따른 조명 조절 */}
            <ambientLight intensity={isNight ? 2.0 : 2.0} />
            {!isNight && (
                <directionalLight 
                    position={[10, 5, 5]} 
                    intensity={0.8} 
                />
            )}
            
            <Controls />
            
            <Stars />
            <Earth isNight={isNight} />  
            <Clouds />
            <Atmosphere />
        </Canvas>
        </div>
    )
}