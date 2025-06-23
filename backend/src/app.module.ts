import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { CityModule } from './cities/cityModule';
import { FlightModule } from './flights/flightModule';
import { DatabaseSeederService } from './cities/Service/databaseSeederService';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306'),
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_DATABASE || 'earth-globe',
      entities: [__dirname + '/**/*{.ts,.js}'],
      synchronize: false,
      logging: process.env.NODE_ENV === 'development',
    }),
    CityModule,
    FlightModule,
  ],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly seeder: DatabaseSeederService) {}
  
  async onModuleInit() {
    if (process.env.NODE_ENV === 'development') {
      await this.seeder.checkAndSeed();
    }
  }
}
