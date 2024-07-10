import { getCountryNamesWithCodes, returnValueOrFalse } from "./constants/constant";
import { ICityObject, countryData } from "./types";

let jsonData: any;

// https://drive.google.com/file/d/13y1piefeU8Qin6h3AWOViLmGxRM-bzlg/view?usp=drive_link === tempJson
// https://drive.google.com/file/d/1YbBIVdPFRFpx88bPAxZY8LeXnsIFx7cV/view?usp=drive_link === update.json

async function fetchDataAndProcess() {
  try {
    const url = "https://drive.google.com/uc?export=download&id=13y1piefeU8Qin6h3AWOViLmGxRM-bzlg";
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const jsonDatas = await response.json();
    jsonData = jsonDatas; // Store the parsed JSON data

    // Optional: Example processing
    const processedData = processJsonData(jsonData);

    return processedData; // Return any processed data if needed
  } catch (error) {
    console.error("Error fetching or parsing JSON:", error);
    throw error; // Re-throw the error
  }
}
function processJsonData(jsonData: any) {
  // Process jsonData here if needed
  return jsonData;
}

// export async function getCitiesByStateAndCountry(state_name: string, country_name: string): Promise<string[] | boolean> {
//   await fetchDataAndProcess(); // Wait for jsonData to be fetched

//   const filteredCities = jsonData.data.filter((city: any) => city.state_name.toLowerCase() === state_name.toLowerCase() && city.country_name.toLowerCase() === country_name.toLowerCase()).map((city: any) => city);

//   return returnValueOrFalse(filteredCities);
// }

// export async function searchCityByName(cityName: string): Promise<any[]> {
//   await fetchDataAndProcess(); // Wait for jsonData to be fetched

//   const lowerCaseCityName = cityName.toLowerCase();
//   const exactMatches = jsonData.data.filter((city: any) => city.name.toLowerCase() === lowerCaseCityName);

//   // Partial matches excluding exact matches
//   const partialMatches = jsonData.data.filter((city: any) => city.name.toLowerCase().includes(lowerCaseCityName) && city.name.toLowerCase() !== lowerCaseCityName);

//   return [...exactMatches, ...partialMatches];
// }

export async function getAllCountries(): Promise<any> {
  const js = await fetchDataAndProcess(); // Wait for jsonData to be fetched
  // console.log("getAllCountries  ~ js:", js);
  const data = getCountryNamesWithCodes(js.data);
  return data;
}

// export const AllCountries = getCountryNamesWithCodes(jsonData.data);

// export const getCityByNameAndCountryData = (countryData: countryData) => {
//   const { cityName, state_name, country_name } = countryData;

//   const foundedCity = jsonData.data.find((item: ICityObject) => item.country_name.toLowerCase() === country_name.toLowerCase() && (state_name ? item.state_name.toLowerCase() === state_name.toLowerCase() : true) && item.name.toLowerCase() === cityName.toLowerCase());
//   return returnValueOrFalse(foundedCity);
// };

// export const getCitiesByStateAndCountry = (state_name: string, country_name: string): string[] | boolean => {
//   const filteredCities = jsonData.data.filter((city: ICityObject) => city.state_name.toLowerCase() === state_name.toLowerCase() && city.country_name.toLowerCase() === country_name.toLowerCase()).map((city: ICityObject) => city);
//   return returnValueOrFalse(filteredCities);
// };

// export const searchCityByName = (cityName: string) => {
//   const lowerCaseCityName = cityName.toLowerCase();
//   const exactMatches = jsonData.data.filter((city: ICityObject) => city.name.toLowerCase() === lowerCaseCityName);

//   // Partial matches excluding exact matches
//   const partialMatches = jsonData.data.filter((city: ICityObject) => city.name.toLowerCase().includes(lowerCaseCityName) && city.name.toLowerCase() !== lowerCaseCityName);

//   return [...exactMatches, ...partialMatches];
// };

// console.log(searchCityByName("london"));
