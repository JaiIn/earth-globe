import { CityService } from './../Service/cityService';
import { CityDto } from './../dto/cityDto';
import { Controller, Get, Param, Query } from '@nestjs/common';

@Controller('city')
export class CityController {
  constructor(private readonly citiesService: CityService) {}

  @Get()
  findAll() {
    return this.citiesService.findAll();
  }

  @Get('major')
  findMajorCities() {
    return this.citiesService.findMajorCities();
  }

  @Get('capitals')
  findCapitals() {
    return this.citiesService.findCapitals();
  }

  @Get('megacities')
  findMegacities() {
    return this.citiesService.findMegacities();
  }

  @Get('continent/:continent')
  findByContinent(@Param('continent') continent: string) {
    return this.citiesService.findByContinent(continent);
  }

  @Get('tag/:tag')
  findByTag(@Param('tag') tag: string) {
    return this.citiesService.findByTag(tag);
  }

  @Get('search')
  search(@Query() searchDto: CityDto) {
    return this.citiesService.search(searchDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.citiesService.findOne(+id);
  }
}