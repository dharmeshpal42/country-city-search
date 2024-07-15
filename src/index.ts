export * from "./functions";
export * from "./types";

import csvParser from "csv-parser";
import { stringify } from "csv-stringify/sync";
//**---------------------------------------------------------------------------------------------- */
// const fs = require("fs");
// const csv = require("csv-parser");

import fs from "fs";

// const cityFile = "./cities.csv";
// const stateFile = "./states.csv";
// const countryFile = "./countries.csv";
// const outputFile = "updated.csv";

const firstFile = "./data.csv";
const secondFile = "./updated.csv";
const outputFile = "combined.csv";

// let cities = [] as any;
// let states = {} as any;
// let countries = {} as any;
// let combinedData = [] as any;

let secondFileData = {} as any;
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
Promise.all([readCSV(firstFile), readCSV(secondFile)])
  .then(([firstData, secondData]: any) => {
    console.log(secondData[0]);

    // Process state and country data
    secondData.forEach((country: any) => {
      secondFileData[country.country_code] = country;
    });
    // console.log("secondData.forEach  ~ secondFileData:", secondFileData);

    firstData.forEach((item: any) => {
      const countryName = item.country_name;
      const countryCode = item.country_code;
      const country = secondFileData[countryCode];

      if (country && country.country_name === countryName) {
        const combinedObject = {
          ...item,
          emoji: country.emoji,
          currency_symbol: country.currency_symbol,
        };
        combinedData.push(combinedObject);
      }
    });

    console.log("firstData.forEach  ~ combinedData:", combinedData);
    // const csvString = stringify(
    //   combinedData.map((data: any) => {
    //     delete data.id;
    //     delete data.state_id;
    //     delete data.country_id;
    //     delete data.name;
    //     delete data.iso2;
    //     delete data.numeric_code;
    //     delete data.currency_name;
    //     delete data.tld;
    //     delete data.region_id;
    //     delete data.subregion;
    //     delete data.currency;
    //     delete data.subregion_id;
    //     delete data.nationality;
    //     delete data.region;

    //     return data;
    //   }),
    //   {
    //     header: true,
    //   }
    // );

    const csvString = stringify(combinedData, {
      header: true,
    });

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
