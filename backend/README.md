# 🌍 Interactive Earth - Backend

> Nest.js 기반의 확장 가능한 지구 데이터 API 서버

---

## Nest.js 모듈 구조

### **모듈 아키텍처**

```typescript
src/
├── app.module.ts                # 루트 모듈
├── modules/
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

---

**🌍 Ready to serve global data? Let's build the future of geographic intelligence!**

*For frontend integration, check the [Frontend README](../frontend/README.md)*