import {
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Cron } from '@nestjs/schedule';
import { Server } from 'socket.io';
import { OpenSkyService } from '../service/openSkyService';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:3000'],
    credentials: true,
  },
})
export class FlightGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly openSkyService: OpenSkyService) {}

  @Cron('*/90 * * * * *')
  async fetchAndBroadcastFlights() {
    try {
      const flights = await this.openSkyService.getFlights();
      console.log(`${flights.length}개 항공기 데이터 브로드캐스트`);
      this.server.emit('flights-update', flights);
    } catch (error) {
      console.error('항공기 데이터 브로드캐스트 실패:', error.message);
    }
  }

  handleConnection(client: any) {
    console.log('클라이언트 연결됨:', client.id);
  }

  handleDisconnect(client: any) {
    console.log('클라이언트 연결 해제됨:', client.id);
  }
}