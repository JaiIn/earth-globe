import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Flight } from '../interfaces/flight.interface';

@Injectable()
export class OpenSkyService {
  private readonly apiUrl = 'https://opensky-network.org/api/states/all';

  async getFlights(): Promise<Flight[]> {
    try {
      const response = await axios.get(this.apiUrl);
      const { states } = response.data;

      if (!states || !Array.isArray(states)) {
        return [];
      }

      return states
        .filter(state => 
          state[5] !== null && 
          state[6] !== null && 
          !state[8] &&
          state[5] >= -180 && state[5] <= 180 &&
          state[6] >= -90 && state[6] <= 90
        )
        .map(state => ({
          icao24: state[0],
          callsign: state[1]?.trim() || '',
          originCountry: state[2] || '',
          longitude: state[5],
          latitude: state[6],
          altitude: state[7] || 0,
          velocity: state[9] || 0,
          heading: state[10] || 0,
          onGround: state[8] || false,
        }));
    } catch (error) {
      console.error('OpenSky API 호출 실패:', error.message);
      return [];
    }
  }
}