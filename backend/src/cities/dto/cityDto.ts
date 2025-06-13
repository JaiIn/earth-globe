export class CityDto {
  q?: string;
  filter?: 'major' | 'megacity' | 'capital';
  continent?: 'Asia' | 'Europe' | 'America' | 'Africa' | 'Oceania';
  tag?: string;
  limit?: number;
}