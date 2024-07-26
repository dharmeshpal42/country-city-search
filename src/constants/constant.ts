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

export const csvToJson = (csvString: string) => {
  const lines = csvString.split("\n");
  const result = [];

  // Extract headers from the first line
  const headers = lines[0].split(",");

  // Process each line, skipping the first line (headers)
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line) {
      // Skip empty lines
      const obj = {} as any;
      const currentLine = line.split(",");

      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentLine[j];
      }
      result.push(obj);
    }
  }

  return result;
};

let fetchedData: any = null; // Flag to store fetched data
let isFetching = false;

export async function fetchDataAndProcess() {
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
    const url = "https://country-city-search.s3.eu-north-1.amazonaws.com/country-city-search.csv";
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

export const fetchDataFromJson = async () => {
  try {
    const url = "https://country-city-search.s3.eu-north-1.amazonaws.com/countries-states.json";
    const response = await fetch(url);

    // Check if the response status is not OK (200-299 range)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching or parsing JSON:", error);
    throw error;
  }
};
