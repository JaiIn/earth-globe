'use client'
import React from 'react'

interface ToggleProps{
    isNight: boolean
    onToggle: (isNight: boolean) => void
}

export default function DayNightToggle({isNight, onToggle}: ToggleProps) {
    return (
        <div className="absolute top-6 right-6 z-10">
            <button
                onClick={()=>onToggle(!isNight)}
                className={
                    `px-6 py-3 rounded-full font-semibold transition-all duration-300
                    ${isNight 
                        ? 'bg-indigo-900 text-yellow-300 border-2 border-yellow-300' 
                        : 'bg-sky-500 text-white border-2 border-sky-300'
                    }
                    hover:scale-105 shadow-lg backdrop-blur-sm`
                }
                >
            {isNight ? '🌙 Night Mode' : '☀️ Day Mode'}
            </button>
        </div>
    )
}

