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

export type IDynamicObject = {
  [key: string]: any;
};

export type ICountriesObject = {
  id: number;
  name: string;
  iso3: string;
  iso2: string;
  numeric_code: string;
  phone_code: string;
  capital: string;
  currency: string;
  currency_name: string;
  currency_symbol: string;
  tld: string;
  native: string;
  region: string;
  region_id: string;
  subregion: string;
  subregion_id: string;
  nationality: string;
  timezones: IDynamicObject[];
  translations: IDynamicObject[];
  states: IDynamicObject[];
  latitude: string;
  longitude: string;
  emoji: string;
  emojiU: string;
};
