import { csvToJson, getCountryNamesWithCodes, returnValueOrFalse } from "./constants/constant";
import { ICityObject, countryData } from "./types";

let fetchedData: any = null; // Flag to store fetched data
let isFetching = false;

// Fetch Data by CSV

async function fetchDataAndProcess() {
  if (fetchedData !== null) {
    // If data is already fetched, return it
    return fetchedData;
  }

  if (isFetching) {
    // If fetching is in progress, wait for it to complete
    return new Promise((resolve, reject) => {
      const interval = setInterval(() => {
        if (fetchedData !== null) {
          clearInterval(interval);
          resolve(fetchedData);
        } else if (!isFetching) {
          clearInterval(interval);
          reject(new Error("Fetching failed"));
        }
      }, 100);
    });
  }

  isFetching = true;

  try {
    const url = "https://country-city-search.s3.eu-north-1.amazonaws.com/data.csv";
    const response = await fetch(url, {
      headers: {
        "Content-Type": "text/csv",
      },
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const csvData = await response.text();
    const parsedData = csvToJson(csvData);
    fetchedData = processJsonData(parsedData);
    return fetchedData;
  } catch (error) {
    console.error("Error fetching or parsing JSON:", error);
    throw error;
  } finally {
    isFetching = false;
  }
}
function processJsonData(jsonData: any) {
  // Process jsonData here if needed
  return jsonData;
}
//----------------------------------------------//

// Search City by it's Name
export async function searchCityByName(cityName: string): Promise<any[]> {
  const jsonData = await fetchDataAndProcess(); // Wait for jsonData to be fetched

  const lowerCaseCityName = cityName.toLowerCase();

  const exactMatches = jsonData.filter((city: any) => city?.name?.toLowerCase() === lowerCaseCityName);

  const partialMatches = jsonData.filter((city: any) => city?.name?.toLowerCase().includes(lowerCaseCityName) && city?.name?.toLowerCase() !== lowerCaseCityName);

  return [...exactMatches, ...partialMatches];
}

//----------------------------------------------//

//Get All Country's Name in single array with country code

export async function getAllCountries(): Promise<any> {
  const jsonData = await fetchDataAndProcess(); // Wait for jsonData to be fetched
  const data = getCountryNamesWithCodes(jsonData);
  return data;
}

//----------------------------------------------//

//Get City object using city name, state name and country name

export const getCityByNameAndCountryData = async (countryData: countryData) => {
  const jsonData = await fetchDataAndProcess(); // Wait for jsonData to be fetched

  const { cityName, state_name, country_name } = countryData;

  const foundedCity = jsonData.find((item: ICityObject) => {
    return item?.country_name?.toLowerCase() === country_name?.toLowerCase() && (state_name ? item?.state_name?.toLowerCase() === state_name?.toLowerCase() : true) && item?.name?.toLowerCase() === cityName?.toLowerCase();
  });

  return returnValueOrFalse(foundedCity);
};
//----------------------------------------------//

// Get List array of cities object using state and country name

export const getCitiesByStateAndCountry = async (state_name: string, country_name: string) => {
  const jsonData = await fetchDataAndProcess();

  const filteredCities = jsonData.filter((city: ICityObject) => city?.state_name?.toLowerCase() === state_name?.toLowerCase() && city?.country_name?.toLowerCase() === country_name?.toLowerCase()).map((city: ICityObject) => city);

  return returnValueOrFalse(filteredCities);
};
//----------------------------------------------//
