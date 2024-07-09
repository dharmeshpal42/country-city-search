export type countryData = {
  cityName: string;
  state_name?: string;
  country_name: string;
};

export type ICityObject = {
  id: number;
  name: string;
  state_id: number;
  state_code: string;
  state_name: string;
  country_id: number;
  country_code: string;
  country_name: string;
  latitude: string;
  longitude: string;
  wikiDataId: string;
  timezone: string;
  time_zone_name: string;
};
