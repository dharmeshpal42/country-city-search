import { ICityObject } from "../types";

export const returnValueOrFalse = <T>(value: T | undefined | null): T | boolean => {
  if (value && (Array.isArray(value) ? value.length !== 0 : true)) {
    return value;
  } else {
    return false;
  }
};

export const getCountryNamesWithCodes = (data: ICityObject[]): string[] => {
  const countrySet = new Set<string>();

  data.forEach((city) => {
    const countryString = `${city.country_name} (${city.country_code})`;
    countrySet.add(countryString);
  });

  return Array.from(countrySet);
};
