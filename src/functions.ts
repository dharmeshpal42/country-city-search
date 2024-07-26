import { fetchDataAndProcess, fetchDataFromJson, getCountryNamesWithCodes, returnValueOrFalse } from "./constants/constant";
import { ICityObject, ICountriesObject, countryData } from "./types";

/**
 *
 * Search City by it's Name
 * @param cityName
 * @returns
 */
export async function searchCityByName(cityName: string): Promise<ICityObject[]> {
  const jsonData = await fetchDataAndProcess(); // Wait for jsonData to be fetched

  const lowerCaseCityName = cityName.toLowerCase();

  const exactMatches = jsonData.filter((city: any) => city?.name?.toLowerCase() === lowerCaseCityName);

  const partialMatches = jsonData.filter((city: any) => city?.name?.toLowerCase().includes(lowerCaseCityName) && city?.name?.toLowerCase() !== lowerCaseCityName);

  return [...exactMatches, ...partialMatches];
}

//----------------------------------------------//

/**
 * Get All Country's Name in single array with country code
 * @returns
 */

export async function getAllCountries(): Promise<string[]> {
  const jsonData = await fetchDataAndProcess(); // Wait for jsonData to be fetched
  const data = getCountryNamesWithCodes(jsonData);
  return data;
}

//----------------------------------------------//

/**
 * Get City object using city name, state name and country name
 * @param countryData
 * @returns
 */

export const getCityByNameAndCountryData = async (countryData: countryData): Promise<ICityObject> => {
  const jsonData = await fetchDataAndProcess(); // Wait for jsonData to be fetched

  const { cityName, state_name, country_name } = countryData;

  const foundedCity = jsonData.find((item: ICityObject) => {
    return item?.country_name?.toLowerCase() === country_name?.toLowerCase() && (state_name ? item?.state_name?.toLowerCase() === state_name?.toLowerCase() : true) && item?.name?.toLowerCase() === cityName?.toLowerCase();
  });

  return returnValueOrFalse(foundedCity);
};
//----------------------------------------------//

/**
 * Get List array of cities objects using state and country name
 * @param state_name
 * @param country_name
 * @returns
 */

export const getCitiesByStateAndCountry = async (state_name: string, country_name: string): Promise<ICityObject[]> => {
  const jsonData = await fetchDataAndProcess();

  const filteredCities = jsonData.filter((city: ICityObject) => city?.state_name?.toLowerCase() === state_name?.toLowerCase() && city?.country_name?.toLowerCase() === country_name?.toLowerCase()).map((city: ICityObject) => city);

  return returnValueOrFalse(filteredCities);
};
//----------------------------------------------//

/**
 * Get Country Details from the country code
 * @param countryCode
 * @returns
 */
export const getCountryByCode = async (countryCode: string) => {
  const countryData = await fetchDataFromJson();

  const country = countryData
    .filter((item: ICountriesObject) => item.iso2 === countryCode)
    .map((cObj: ICountriesObject) => {
      const { states, ...rest } = cObj; // Destructure to remove states
      return rest;
    });
  return returnValueOrFalse(country);
};
//----------------------------------------------//

/**
 * Get All States List from the country code
 * @param countryCode
 * @returns
 */
export const getStatesOfCountry = async (countryCode: string) => {
  const countryData = await fetchDataFromJson();

  const country = countryData
    .filter((item: ICountriesObject) => item.iso2 === countryCode)
    .map((cObj: ICountriesObject) => cObj.states)
    .flat();

  return returnValueOrFalse(country);
};
//----------------------------------------------//

/**
 * Get Cities data from using stateCode
 * @param stateCode
 * @returns
 */
export const getAllCitiesOfState = async (stateCode: string) => {
  const jsonData = await fetchDataAndProcess();
  const cities = jsonData.filter((city: ICityObject) => city.state_code === stateCode).map((city: ICityObject) => city);

  return returnValueOrFalse(cities);
};
