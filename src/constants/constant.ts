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
