# 🌍 Interactive Earth - Backend

> Nest.js 기반의 확장 가능한 지구 데이터 API 서버

## 🚀 Quick Start

```bash
# 개발 서버 실행
npm run start:dev

# 빌드
npm run build

# 프로덕션 실행
npm run start:prod

# 테스트
npm run test
```

**서버 실행 후**: http://localhost:3001

---

## 🚀 API 문서

### 🌍 **Countries API**

#### **GET** `/api/countries`
모든 국가 목록 조회
```typescript
// Response
interface Country {
  code: string          // ISO 3166-1 alpha-2
  name: string          // 국가명
  capital: string       // 수도
  population: number    // 인구
  area: number         // 면적 (km²)
  region: string       // 대륙
  coordinates: {
    lat: number        // 위도
    lng: number        // 경도
  }
  flag: string         // 국기 이미지 URL
  currencies: string[] // 통화
  languages: string[]  // 언어
}
```

#### **GET** `/api/countries/:code`
특정 국가 상세 정보
```bash
GET /api/countries/kr
```

#### **GET** `/api/countries/:code/cities`
국가별 주요 도시 목록
```typescript
interface City {
  id: string
  name: string
  countryCode: string
  population: number
  coordinates: { lat: number; lng: number }
  timezone: string
}
```

### 🌤️ **Weather API**

#### **GET** `/api/weather/global`
전 세계 주요 도시 날씨 (ISR용)
```typescript
interface GlobalWeather {
  cities: WeatherData[]
  lastUpdated: string
  summary: {
    hottest: { city: string; temp: number }
    coldest: { city: string; temp: number }
    rainiest: { city: string; precipitation: number }
  }
}
```

#### **GET** `/api/weather/city/:cityId`
특정 도시 상세 날씨
```typescript
interface WeatherData {
  cityId: string
  cityName: string
  countryCode: string
  coordinates: { lat: number; lng: number }
  current: {
    temperature: number      // 섭씨
    feelsLike: number
    humidity: number         // %
    pressure: number         // hPa
    windSpeed: number        // m/s
    windDirection: number    // degrees
    visibility: number       // km
    uvIndex: number
    condition: string        // "clear", "cloudy", "rain", etc.
    icon: string            // 날씨 아이콘 코드
  }
  forecast: WeatherForecast[]
  timestamp: string
}
```

### 🔍 **Search API**

#### **GET** `/api/search?q={query}&type={type}`
통합 검색
```typescript
// Query Parameters
interface SearchParams {
  q: string           // 검색어
  type?: 'country' | 'city' | 'all'
  limit?: number      // 기본값: 10
}

// Response
interface SearchResult {
  countries: Country[]
  cities: City[]
  total: number
  query: string
  suggestions: string[]  // 검색어 제안
}
```

---

## 📊 데이터베이스 스키마

### 🗺️ **Countries Table**
```sql
CREATE TABLE countries (
  code VARCHAR(2) PRIMARY KEY,        -- ISO 3166-1 alpha-2
  name VARCHAR(100) NOT NULL,
  capital VARCHAR(100),
  population BIGINT,
  area DECIMAL(12,2),                 -- km²
  region VARCHAR(50),
  subregion VARCHAR(50),
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  flag_url VARCHAR(255),
  currencies JSONB,                   -- ["USD", "EUR"]
  languages JSONB,                    -- ["en", "es"]
  borders JSONB,                      -- ["US", "MX"]
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 인덱스
CREATE INDEX idx_countries_region ON countries(region);
CREATE INDEX idx_countries_population ON countries(population);
CREATE INDEX idx_countries_coordinates ON countries(latitude, longitude);
```

### 🏙️ **Cities Table**
```sql
CREATE TABLE cities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  country_code VARCHAR(2) REFERENCES countries(code),
  population INTEGER,
  latitude DECIMAL(10,8) NOT NULL,
  longitude DECIMAL(11,8) NOT NULL,
  timezone VARCHAR(50),
  is_capital BOOLEAN DEFAULT FALSE,
  elevation INTEGER,                   -- meters
  founded_year INTEGER,
  description TEXT,
  landmarks JSONB,                     -- ["Eiffel Tower", "Louvre"]
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 인덱스
CREATE INDEX idx_cities_country ON cities(country_code);
CREATE INDEX idx_cities_population ON cities(population);
CREATE INDEX idx_cities_coordinates ON cities(latitude, longitude);
CREATE INDEX idx_cities_name ON cities(name);
```

### 🌤️ **Weather Cache Table**
```sql
CREATE TABLE weather_cache (
  city_id UUID REFERENCES cities(id),
  data JSONB NOT NULL,                 -- 날씨 데이터 JSON
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (city_id)
);

-- 인덱스
CREATE INDEX idx_weather_expires ON weather_cache(expires_at);
```

---

## 🔧 Nest.js 모듈 구조

### 📁 **모듈 아키텍처**

```typescript
src/
├── 🏗️ app.module.ts                # 루트 모듈
├── 🌍 modules/
│   ├── countries/               # 국가 관련 기능
│   │   ├── countries.module.ts
│   │   ├── countries.controller.ts
│   │   ├── countries.service.ts
│   │   ├── entities/country.entity.ts
│   │   └── dto/
│   │       ├── create-country.dto.ts
│   │       └── update-country.dto.ts
│   │
│   ├── cities/                  # 도시 관련 기능
│   │   ├── cities.module.ts
│   │   ├── cities.controller.ts
│   │   ├── cities.service.ts
│   │   └── entities/city.entity.ts
│   │
│   ├── weather/                 # 날씨 관련 기능
│   │   ├── weather.module.ts
│   │   ├── weather.controller.ts
│   │   ├── weather.service.ts
│   │   ├── weather-cache.service.ts
│   │   └── dto/weather-response.dto.ts
│   │
│   └── search/                  # 검색 기능
│       ├── search.module.ts
│       ├── search.controller.ts
│       ├── search.service.ts
│       └── dto/search-query.dto.ts
│
├── 🔧 common/                   # 공통 모듈
│   ├── guards/
│   │   ├── api-key.guard.ts     # API 키 검증
│   │   └── rate-limit.guard.ts  # 요청 제한
│   │
│   ├── interceptors/
│   │   ├── response.interceptor.ts    # 응답 형식 통일
│   │   ├── logging.interceptor.ts     # 요청 로깅
│   │   └── cache.interceptor.ts       # 캐시 관리
│   │
│   ├── pipes/
│   │   ├── validation.pipe.ts   # 데이터 검증
│   │   └── transform.pipe.ts    # 데이터 변환
│   │
│   └── filters/
│       ├── http-exception.filter.ts   # 예외 처리
│       └── all-exceptions.filter.ts   # 전역 예외
│
├── ⚙️ config/                   # 설정 관리
│   ├── database.config.ts
│   ├── cache.config.ts
│   ├── api.config.ts
│   └── swagger.config.ts
│
└── 💾 database/                 # 데이터베이스
    ├── migrations/              # 마이그레이션
    ├── seeds/                   # 초기 데이터
    └── database.module.ts
```

### 🎯 **모듈 예시: Countries Module**

```typescript
// countries/countries.service.ts
@Injectable()
export class CountriesService {
  constructor(
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
    private readonly cacheManager: Cache,
    private readonly logger: Logger
  ) {}

  async findAll(): Promise<Country[]> {
    const cacheKey = 'countries:all'
    let countries = await this.cacheManager.get<Country[]>(cacheKey)
    
    if (!countries) {
      countries = await this.countryRepository.find({
        order: { name: 'ASC' }
      })
      await this.cacheManager.set(cacheKey, countries, 3600) // 1시간 캐시
    }
    
    return countries
  }

  async findByCode(code: string): Promise<Country> {
    const country = await this.countryRepository.findOne({
      where: { code: code.toUpperCase() }
    })
    
    if (!country) {
      throw new NotFoundException(`Country with code ${code} not found`)
    }
    
    return country
  }
}
```

---

## 🌐 외부 API 연동

### 🌤️ **OpenWeatherMap API**

```typescript
// weather/external-weather.service.ts
@Injectable()
export class ExternalWeatherService {
  private readonly apiKey = this.configService.get('OPENWEATHER_API_KEY')
  private readonly baseUrl = 'https://api.openweathermap.org/data/2.5'

  async getCurrentWeather(lat: number, lng: number): Promise<WeatherData> {
    const url = `${this.baseUrl}/weather`
    const params = {
      lat: lat.toString(),
      lon: lng.toString(),
      appid: this.apiKey,
      units: 'metric',
      lang: 'en'
    }

    try {
      const response = await this.httpService.axiosRef.get(url, { params })
      return this.transformWeatherData(response.data)
    } catch (error) {
      this.logger.error(`Weather API error: ${error.message}`)
      throw new ServiceUnavailableException('Weather service unavailable')
    }
  }

  private transformWeatherData(apiData: any): WeatherData {
    return {
      temperature: Math.round(apiData.main.temp),
      feelsLike: Math.round(apiData.main.feels_like),
      humidity: apiData.main.humidity,
      pressure: apiData.main.pressure,
      windSpeed: apiData.wind.speed,
      windDirection: apiData.wind.deg,
      visibility: apiData.visibility / 1000, // km로 변환
      condition: apiData.weather[0].main.toLowerCase(),
      icon: apiData.weather[0].icon,
      description: apiData.weather[0].description
    }
  }
}
```

### 🗺️ **REST Countries API**

```typescript
// countries/external-countries.service.ts
@Injectable()
export class ExternalCountriesService {
  private readonly baseUrl = 'https://restcountries.com/v3.1'

  async syncCountriesData(): Promise<void> {
    this.logger.log('Starting countries data synchronization...')
    
    const response = await this.httpService.axiosRef.get(`${this.baseUrl}/all`)
    const countriesData = response.data

    for (const countryData of countriesData) {
      await this.upsertCountry(this.transformCountryData(countryData))
    }

    this.logger.log(`Synchronized ${countriesData.length} countries`)
  }

  private transformCountryData(apiData: any): Partial<Country> {
    return {
      code: apiData.cca2,
      name: apiData.name.common,
      capital: apiData.capital?.[0],
      population: apiData.population,
      area: apiData.area,
      region: apiData.region,
      subregion: apiData.subregion,
      latitude: apiData.latlng?.[0],
      longitude: apiData.latlng?.[1],
      flagUrl: apiData.flags.svg,
      currencies: Object.keys(apiData.currencies || {}),
      languages: Object.values(apiData.languages || {}),
      borders: apiData.borders || []
    }
  }
}
```

---

## 🔒 보안 및 인증

### 🔑 **API Key 인증**

```typescript
// common/guards/api-key.guard.ts
@Injectable()
export class ApiKeyGuard implements CanActivate {
  private readonly validApiKeys = this.configService.get('API_KEYS')?.split(',') || []

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest()
    const apiKey = request.headers['x-api-key']

    if (!apiKey) {
      throw new UnauthorizedException('API key required')
    }

    if (!this.validApiKeys.includes(apiKey)) {
      throw new UnauthorizedException('Invalid API key')
    }

    return true
  }
}
```

### ⏱️ **Rate Limiting**

```typescript
// common/guards/rate-limit.guard.ts
@Injectable()
export class RateLimitGuard implements CanActivate {
  constructor(private readonly cacheManager: Cache) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const clientIp = request.ip
    const key = `rate_limit:${clientIp}`

    const requestCount = await this.cacheManager.get<number>(key) || 0
    
    if (requestCount >= 100) { // 시간당 100회 제한
      throw new TooManyRequestsException('Rate limit exceeded')
    }

    await this.cacheManager.set(key, requestCount + 1, 3600) // 1시간
    return true
  }
}
```

### 🛡️ **입력 검증 및 Sanitization**

```typescript
// common/pipes/validation.pipe.ts
@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    if (!metadata.metatype || !this.toValidate(metadata.metatype)) {
      return value
    }

    const object = plainToClass(metadata.metatype, value)
    const errors = await validate(object)

    if (errors.length > 0) {
      const errorMessages = errors.map(error => 
        Object.values(error.constraints || {}).join(', ')
      ).join('; ')
      
      throw new BadRequestException(`Validation failed: ${errorMessages}`)
    }

    return object
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object]
    return !types.includes(metatype)
  }
}

// DTO 예시
class SearchQueryDto {
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  @Matches(/^[a-zA-Z0-9\s-_.]+$/) // SQL injection 방지
  q: string

  @IsOptional()
  @IsIn(['country', 'city', 'all'])
  type?: string

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(50)
  limit?: number = 10
}
```

### 🔒 **CORS 및 보안 헤더**

```typescript
// main.ts
async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // CORS 설정
  app.enableCors({
    origin: [
      'http://localhost:3000',      // 개발용 프론트엔드
      'https://interactive-earth.vercel.app' // 프로덕션
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-API-Key'],
    credentials: true
  })

  // 보안 헤더
  app.use(helmet({
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", 'data:', 'https:'],
      },
    },
  }))

  await app.listen(3001)
}
```

---

## 🛠️ 개발 도구

### 📊 **Swagger API 문서**

```bash
# 개발 서버 실행 후 접속
http://localhost:3001/api/docs
```

### 🧪 **테스트**

```bash
# 단위 테스트
npm run test

# E2E 테스트
npm run test:e2e

# 테스트 커버리지
npm run test:cov
```

### 📈 **성능 모니터링**

```typescript
// health check 엔드포인트
@Controller('health')
export class HealthController {
  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.db.pingCheck('database'),
      () => this.http.pingCheck('weather-api', 'https://api.openweathermap.org'),
      () => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024),
    ])
  }
}
```

### 🔧 **환경 변수**

```bash
# .env.example
NODE_ENV=development
PORT=3001

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_DATABASE=interactive_earth

# External APIs
OPENWEATHER_API_KEY=your_api_key_here
REST_COUNTRIES_CACHE_TTL=86400

# Redis Cache
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# Security
API_KEYS=dev-key-123,prod-key-456
JWT_SECRET=your-secret-key
CORS_ORIGINS=http://localhost:3000,https://yourdomain.com

# Monitoring
LOG_LEVEL=debug
ENABLE_SWAGGER=true
```

---

**🌍 Ready to serve global data? Let's build the future of geographic intelligence!**

*For frontend integration, check the [Frontend README](../frontend/README.md)*