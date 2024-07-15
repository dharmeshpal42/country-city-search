export * from "./functions";
export * from "./types";

import csvParser from "csv-parser";
import { stringify } from "csv-stringify/sync";
//**---------------------------------------------------------------------------------------------- */
// const fs = require("fs");
// const csv = require("csv-parser");

import fs from "fs";

const cityFile = "./cities.csv";
const stateFile = "./states.csv";
const countryFile = "./countries.csv";
const outputFile = "updated.csv";

let cities = [] as any;
let states = {} as any;
let countries = {} as any;
let combinedData = [] as any;

const readCSV = (filePath: string) => {
  return new Promise((resolve, reject) => {
    const results = [] as any;
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on("data", (data: any) => results.push(data))
      .on("end", () => resolve(results))
      .on("error", (error: any) => reject(error));
  });
};
Promise.all([readCSV(cityFile), readCSV(stateFile), readCSV(countryFile)])
  .then(([cityData, stateData, countryData]: any) => {
    // Process state and country data
    stateData.forEach((state: any) => {
      states[state.state_code] = state;
    });

    countryData.forEach((country: any) => {
      countries[country.iso2] = country;
    });

    // Process city data and combine with state and country data
    cityData.forEach((city: any) => {
      const cityStateCode = city.state_code;
      const cityName = city.name;

      if (cityStateCode && cityName) {
        const state = states[cityStateCode];

        if (state && state.state_code === cityStateCode) {
          const country = countries[state.country_code];

          if (country) {
            combinedData.push({
              city_name: city.name,
              state_name: state.name,
              country_name: country.name,
              ...city,
              ...state,
              ...country,
            });
          }
        }
      }
    });

    const csvString = stringify(
      combinedData.map((data: any) => {
        delete data.id;
        delete data.state_id;
        delete data.country_id;
        delete data.name;
        delete data.iso2;
        delete data.numeric_code;
        delete data.currency_name;
        delete data.tld;
        delete data.region_id;
        delete data.subregion;
        delete data.currency;
        delete data.subregion_id;
        delete data.nationality;
        delete data.region;

        return data;
      }),
      {
        header: true,
      }
    );

    // Write combined data to a JSON file
    fs.writeFile(outputFile, csvString, (err: any) => {
      if (err) {
        console.error("Error writing to JSON file:", err);
      } else {
        console.log("Data has been successfully combined and written to", outputFile);
      }
    });
  })
  .catch((error) => {
    console.error("Error reading CSV files:", error);
  });
