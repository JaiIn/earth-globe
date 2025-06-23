'use client'
import React from 'react';
import { X, MapPin, Users, Clock, Tag } from 'lucide-react';
import { City } from '@/lib/api/cities';

interface CityInfoPanelProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCity: City | null;
}

export default function CityInfoPanel({ isOpen, onClose, selectedCity }: CityInfoPanelProps) {
  // 선택된 도시가 없으면 렌더링하지 않음
  if (!selectedCity) {
    return null;
  }

  const formatPopulation = (population?: number) => {
    if (!population) return 'N/A';
    if (population > 1000000) {
      return `${(population / 1000000).toFixed(1)}M`;
    }
    return population?.toLocaleString();
  };

  const getTagColor = (tag: string) => {
    const colors: Record<string, string> = {
      'capital': 'bg-yellow-100 text-yellow-800 border-yellow-300',
      'megacity': 'bg-red-100 text-red-800 border-red-300',
      'tech-hub': 'bg-green-100 text-green-800 border-green-300',
      'financial-hub': 'bg-blue-100 text-blue-800 border-blue-300'
    };
    return colors[tag] || 'bg-gray-100 text-gray-800 border-gray-300';
  };

  return (
    <>
      {/* 패널 */}
      <div className={`
        fixed left-0 top-0 h-full z-20 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        w-80 lg:w-96
      `}>
        <div className="h-full flex flex-col">
          {/* 패널 헤더 */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{selectedCity.flag || '🌍'}</span>
                <h2 className="text-2xl font-bold">{selectedCity.name}</h2>
              </div>
              <p className="text-blue-100 flex items-center gap-1">
                <MapPin size={16} />
                {selectedCity.country}
              </p>
            </div>
            <button 
              onClick={onClose}
              className="text-white hover:text-gray-300 transition-colors p-1"
            >
              <X size={24} />
            </button>
          </div>

          {/* 패널 내용 */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* 기본 정보 */}
            <div className="space-y-4 mb-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <Users size={18} />
                  인구 정보
                </h3>
                <p className="text-2xl font-bold text-blue-600">
                  {formatPopulation(selectedCity.population)}
                </p>
                <p className="text-sm text-gray-600">명</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <Clock size={18} />
                  시간대
                </h3>
                <p className="text-lg text-gray-700">{selectedCity.timezone || 'N/A'}</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <MapPin size={18} />
                  위치 좌표
                </h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>위도: {selectedCity.latitude}°</p>
                  <p>경도: {selectedCity.longitude}°</p>
                </div>
              </div>
            </div>

            {/* 태그 */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <Tag size={18} />
                특성
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedCity.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className={`px-3 py-1 rounded-full text-xs font-medium border ${getTagColor(tag)}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* 설명 */}
            {selectedCity.description && (
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-3">설명</h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {selectedCity.description}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 모바일 오버레이 */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-30 z-10 lg:hidden"
          onClick={onClose}
        />
      )}
    </>
  );
}