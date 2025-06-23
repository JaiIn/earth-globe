import { Module } from '@nestjs/common';
import { OpenSkyService } from './service/openSkyService';
import { FlightGateway } from './gateway/flightGateway';

@Module({
  providers: [OpenSkyService, FlightGateway],
  exports: [OpenSkyService],
})
export class FlightModule {}