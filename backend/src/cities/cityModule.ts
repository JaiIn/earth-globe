import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from './entities/city';
import { CityController } from './controller/cityController';
import { CityService } from './Service/cityService';
import { DatabaseSeederService } from './Service/databaseSeederService';

@Module({
    imports: [TypeOrmModule.forFeature([City])],
    controllers: [CityController],
    providers: [CityService, DatabaseSeederService],
    exports: [CityService, DatabaseSeederService],
})
export class CityModule {}
