import { City } from './../entities/city';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CityDto } from './../dto/cityDto';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(City)
    private citiesRepository: Repository<City>,
  ) {}

  async findAll(): Promise<City[]> {
    return this.citiesRepository.find({
      order: { population: 'DESC' },
    });
  }

  async findMajorCities(): Promise<City[]> {
    return this.citiesRepository
      .createQueryBuilder('city')
      .where('JSON_CONTAINS(city.tags, :tag)', { tag: '"major"' })
      .orWhere('JSON_CONTAINS(city.tags, :megacity)', { megacity: '"megacity"' })
      .orderBy('city.population', 'DESC')
      .getMany();
  }

  async findCapitals(): Promise<City[]> {
    return this.citiesRepository
      .createQueryBuilder('city')
      .where('JSON_CONTAINS(city.tags, :tag)', { tag: '"capital"' })
      .orderBy('city.population', 'DESC')
      .getMany();
  }

  async findMegacities(): Promise<City[]> {
    return this.citiesRepository
      .createQueryBuilder('city')
      .where('JSON_CONTAINS(city.tags, :tag)', { tag: '"megacity"' })
      .orderBy('city.population', 'DESC')
      .getMany();
  }

  async findByContinent(continent: string): Promise<City[]> {
    return this.citiesRepository
      .createQueryBuilder('city')
      .where('city.timezone LIKE :timezone', { timezone: `${continent}/%` })
      .orderBy('city.population', 'DESC')
      .getMany();
  }

  async findByTag(tag: string): Promise<City[]> {
    return this.citiesRepository
      .createQueryBuilder('city')
      .where('JSON_CONTAINS(city.tags, :tag)', { tag: `"${tag}"` })
      .orderBy('city.population', 'DESC')
      .getMany();
  }

  async search(searchDto: CityDto): Promise<City[]> {
    const query = this.citiesRepository.createQueryBuilder('city');

    if (searchDto.q) {
      query.where('city.name LIKE :search OR city.country LIKE :search', {
        search: `%${searchDto.q}%`,
      });
    }

    if (searchDto.filter) {
      const condition = searchDto.q ? 'andWhere' : 'where';
      query[condition]('JSON_CONTAINS(city.tags, :filter)', {
        filter: `"${searchDto.filter}"`,
      });
    }

    if (searchDto.continent) {
      const condition = searchDto.q || searchDto.filter ? 'andWhere' : 'where';
      query[condition]('city.timezone LIKE :continent', {
        continent: `${searchDto.continent}/%`,
      });
    }

    if (searchDto.tag) {
      const condition = searchDto.q || searchDto.filter || searchDto.continent ? 'andWhere' : 'where'
      query[condition]('JSON_CONTAINS(city.tags, :tag)', {
        tag: `"${searchDto.tag}"`,
      });
    }

    query.orderBy('city.population', 'DESC');

    if (searchDto.limit) {
      query.limit(searchDto.limit);
    }

    return query.getMany();
  }

  async findOne(id: number): Promise<City | null> {
    return this.citiesRepository.findOne({ where: { id } })
  }
}