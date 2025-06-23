import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { City } from '../entities/city';
import axios from 'axios';

@Injectable()
export class DatabaseSeederService {
  constructor(
    @InjectRepository(City)
    private cityRepository: Repository<City>,
  ) {}

  async checkAndSeed(): Promise<void> {
    try {
      const count = await this.cityRepository.count();
      
      if (count === 0) {
        console.log('REST Countries API에서 수도 데이터 가져오는 중...');
        const seedCount = await this.seedCapitalCities();
        console.log(`${seedCount}개 수도 데이터 초기화 완료!`);
      } else {
        console.log(`기존 도시 ${count}개 발견 - 시딩 건너뜀`);
      }
    } catch (error) {
      console.error('데이터 시딩 실패:', error);
    }
  }

  async seedCapitalCities(): Promise<number> {
    await this.cityRepository.clear();
    
    try {
      const response = await axios.get('https://restcountries.com/v3.1/all?fields=name,capital,capitalInfo,population,timezones,flag');
      const countries = response.data;
      
      if (!Array.isArray(countries)) {
        console.error('API 응답이 배열이 아닙니다:', typeof countries);
        throw new Error('REST Countries API 응답 형식이 올바르지 않습니다');
      }
      
      console.log(`총 ${countries.length}개 국가 데이터 수신`);
      
      const capitals = countries
        .filter(country => {
          const hasCapital = country.capital && country.capital[0];
          const hasCoords = country.capitalInfo && 
                           country.capitalInfo.latlng && 
                           country.capitalInfo.latlng[0] !== null && 
                           country.capitalInfo.latlng[1] !== null &&
                           !isNaN(country.capitalInfo.latlng[0]) &&
                           !isNaN(country.capitalInfo.latlng[1]);
          return hasCapital && hasCoords;
        })
        .map(country => this.transformToCity(country));
      
      console.log(`${capitals.length}개 수도 데이터 변환 완료`);
      
      await this.cityRepository.save(capitals);
      
      return capitals.length;
    } catch (error) {
      console.error('REST Countries API 호출 오류:', error.message);
      if (error.response) {
        console.error('API 응답 데이터:', error.response.data);
      }
      throw error;
    }
  }

  private transformToCity(countryData: any): Partial<City> {
    return {
      name: countryData.capital[0],
      country: countryData.name.common,
      latitude: countryData.capitalInfo.latlng[0],
      longitude: countryData.capitalInfo.latlng[1],
      population: countryData.population || null,
      timezone: countryData.timezones[0],
      tags: this.generateTags(countryData),
      flag: countryData.flag,
      description: `${countryData.name.common}의 수도`,
    };
  }

  private generateTags(countryData: any): string[] {
    const tags = ['capital'];
    
    if (countryData.population > 50000000) {
      tags.push('megacity');
    }
    
    const techHubCountries = ['United States', 'South Korea', 'Japan', 'Singapore', 'Israel'];
    if (techHubCountries.includes(countryData.name.common)) {
      tags.push('tech-hub');
    }
    
    const financialHubCountries = ['United Kingdom', 'Switzerland', 'Luxembourg', 'Hong Kong'];
    if (financialHubCountries.includes(countryData.name.common)) {
      tags.push('financial-hub');
    }
    
    return tags;
  }
}