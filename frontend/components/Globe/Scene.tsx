'use client'
import { Canvas } from '@react-three/fiber'
import React, { useState, useEffect } from 'react' 
import Earth from './Earth'
import Stars from './Stars'
import Atmosphere from './Atmosphere'
import Controls from './Controls'
import Clouds from './Clouds'
import DayNightToggle from './DayNightToggle' 
import { CityMarkers } from './CityMarkers'
import { FlightMarkers } from './FlightMarkers'
import CityInfoPanel from './CityInfoPanel'
import { City } from '@/lib/api/cities'
import { Flight } from '../../types/flight'
import io from 'socket.io-client'

export default function Scene() {
    const [isNight, setIsNight] = useState(false)
    const [isPanelOpen, setIsPanelOpen] = useState(false)
    const [selectedCity, setSelectedCity] = useState<City | null>(null)
    const [flights, setFlights] = useState<Flight[]>([])

    useEffect(() => {
        const socket = io('http://localhost:3001')
        
        socket.on('connect', () => {
            console.log('WebSocket 연결됨')
        })
        
        socket.on('flights-update', (flightData: Flight[]) => {
            console.log(`${flightData.length}개 항공기 데이터 수신`)
            setFlights(flightData)
        })
        
        socket.on('disconnect', () => {
            console.log('WebSocket 연결 해제됨')
        })
        
        return () => {
            socket.disconnect()
        }
    }, [])

    const handleCityClick = (city: City) => {
        setSelectedCity(city)
        setIsPanelOpen(true)
    }

    const handlePanelClose = () => {
        setIsPanelOpen(false)
        setSelectedCity(null)
    } 

    return (
        <div className="relative w-full h-full">
            <CityInfoPanel 
                isOpen={isPanelOpen} 
                onClose={handlePanelClose}
                selectedCity={selectedCity}
            />
            
            <div className={`
                transition-all duration-300 ease-in-out w-full h-full
                ${isPanelOpen ? 'lg:ml-96' : 'ml-0'}
            `}>
                <DayNightToggle isNight={isNight} onToggle={setIsNight} />
                
                <Canvas
                    camera={{
                        position:[-1.0, 1.2, -1.5],
                        fov:75,
                        near: 0.1,
                        far: 1000
                    }}
                    className="w-full h-full bg-black"
                >
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
                    <CityMarkers onCityClick={handleCityClick} selectedCityId={selectedCity?.id || null} />
                    <FlightMarkers flights={flights} />
                    <Atmosphere />
                </Canvas>
            </div>
        </div>
    )
}