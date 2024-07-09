import { getCountryNamesWithCodes, returnValueOrFalse } from "./constants/constant";
import { ICityObject, countryData } from "./types";
import { readFileSync } from "fs";

const jsonData = require("../json/update.json");
console.log("jsonData :", jsonData);

// const jsonData = JSON.parse(readFileSync("json/update.json").toString("utf-8")) as any;
// const tempJsonData = JSON.parse(readFileSync("json/temp.json").toString("utf-8")) as any;

export const AllCountries = getCountryNamesWithCodes(jsonData.data);

export const getCityByNameAndCountryData = (countryData: countryData) => {
  const { cityName, state_name, country_name } = countryData;

  const foundedCity = jsonData.data.find((item: ICityObject) => item.country_name.toLowerCase() === country_name.toLowerCase() && (state_name ? item.state_name.toLowerCase() === state_name.toLowerCase() : true) && item.name.toLowerCase() === cityName.toLowerCase());
  return returnValueOrFalse(foundedCity);
};

export const getCitiesByStateAndCountry = (state_name: string, country_name: string): string[] | boolean => {
  const filteredCities = jsonData.data.filter((city: ICityObject) => city.state_name.toLowerCase() === state_name.toLowerCase() && city.country_name.toLowerCase() === country_name.toLowerCase()).map((city: ICityObject) => city);
  return returnValueOrFalse(filteredCities);
};

export const searchCityByName = (cityName: string) => {
  const lowerCaseCityName = cityName.toLowerCase();
  const exactMatches = jsonData.data.filter((city: ICityObject) => city.name.toLowerCase() === lowerCaseCityName);

  // Partial matches excluding exact matches
  const partialMatches = jsonData.data.filter((city: ICityObject) => city.name.toLowerCase().includes(lowerCaseCityName) && city.name.toLowerCase() !== lowerCaseCityName);

  return [...exactMatches, ...partialMatches];
};

console.log(searchCityByName("london"));
