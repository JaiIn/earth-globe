'use client'
import React from 'react'
import { Flight } from '../../types/flight'

interface FlightMarkersProps {
  flights: Flight[]
}

export const FlightMarkers = ({ flights }: FlightMarkersProps) => {
  // 비행기 렌더링 제거 - 웹소켓 데이터만 받아서 처리
  console.log(`받은 비행기 데이터: ${flights.length}개`)
  
  return null
}