# Country-City-Search

A Project to get Data about the country cities and states according the request.

## Installation

Install country city search with npm

```bash
  npm i country-city-search
```

## Features

- Get all countries names across the world in single array
- Get exact city using country,state,city name
- Get All cities in particular state using country name and state name
- Search city by it's name
  Get Country details by using country code
  Get All states from the country by using country code
- Cross platform usable for frontend and backend

## Usage/Examples

```javascript
import { getAllCountries, getCitiesByStateAndCountry, getCityByNameAndCountryData, searchCityByName } from "country-city-search";

const Home = () => {
  const fetchData = async () => {
    //Get All Countries Name with country code in single array

    const allCountries = await getAllCountries();

    // Output : ['Afghanistan (AF)', 'Albania (AL)',....]
    //------------------------------------------------------

    //Get City object using city name, state name and country name

    const cityObject = await getCityByNameAndCountryData({
      cityName: "rajkot",
      state_name: "gujarat",
      country_name: "India",
    });

    /*Output :
     {
        country_code: "IN";
        country_id: "101";
        country_name: "India";
        id: "133679";
        latitude: "22.33333000";
        longitude: "70.83333000";
        name: "Rajkot";
        state_code: "GJ";
        state_id: "4030";
        state_name: "Gujarat";
        time_zone_name: "Asia/Kolkata";
        wikiDataId: "Q11854";
      }
*/
    //------------------------------------------------------------

    //Get List array of cities object using state and country name

    const allCitiesFromState = await getCitiesByStateAndCountry("gujarat", "India");

    /*
    Output :
    [{
      "id": "57588",
      "name": "Abrama",
      "state_id": "4030",
      "state_code": "GJ",
      "state_name": "Gujarat",
      "country_id": "101",
      "country_code": "IN",
      "country_name": "India",
      "latitude": "20.85865000",
      "longitude": "72.90648000",
      "wikiDataId": "Q490916",
      "time_zone_name": "Asia/Kolkata"
    }....]
    */
    //------------------------------------------------------------

    //Search City by it's Name

    const city = await searchCityByName("ahmedabad");

    /*
    Output :
        [
         {
           "id": "57606",
           "name": "Ahmedabad",
           "state_id": "4030",
           "state_code": "GJ",
           "state_name": "Gujarat",
           "country_id": "101",
           "country_code": "IN",
           "country_name": "India",
           "latitude": "23.02579000",
           "longitude": "72.58727000",
           "wikiDataId": "Q1070",
           "time_zone_name": "Asia/Kolkata"
          }, ...
        ]

    */

    //------------------------------------------------------------

    //Get country by its Country code
    const country = await getCountryByCode("IN");
    /*
    Output =
    [
      {
        name: "India",
        iso3: "IND",
        iso2: "IN",
        numeric_code: "356",
        phone_code: "91",
        capital: "New Delhi",
        currency: "INR",
        currency_name: "Indian rupee",
        currency_symbol: "₹",
        tld: ".in",
        native: "भारत",
        region: "Asia",
        region_id: "3",
        subregion: "Southern Asia",
        subregion_id: "14",
        nationality: "Indian",
        timezones: [...],
        translations: {....},
        latitude: "20.00000000",
        longitude: "77.00000000",
        emoji: "🇮🇳",
        emojiU: "U+1F1EE U+1F1F3",
      }
    ];
    */
    //------------------------------------------------------------

    //Get All States List from the country code
    const state = await getStatesOfCountry("IN");

    /*  Output :
     [
      {
            "id": 4023,
            "name": "Andaman and Nicobar Islands",
            "state_code": "AN",
            "latitude": "11.74008670",
            "longitude": "92.65864010",
            "type": "Union territory"
      } ....]
    */

    //------------------------------------------------------------

    //Get All States List from the country code
    const cityies = await getAllCitiesOfState("BDS");

    /* Output :
     [
      {
        "id": "52",
        "name": "Ashkāsham",
        "state_id": "3901",
        "state_code": "BDS",
        "state_name": "Badakhshan",
        "country_id": "1",
        "country_code": "AF",
        "country_name": "Afghanistan",
        "latitude": "36.68333000",
        "longitude": "71.53333000",
        "wikiDataId": "Q4805192",
        "time_zone_name": "Asia/Kabul",
        "emoji": "🇦🇫",
        "currency_symbol": "؋"
        }....]

     */
  };

  useEffect(() => {
    fetchData();
  });

  return (
    <>
      <div> Simple Examples for country-city-search package</div>
    </>
  );
};
```

## Package Enhancement Suggestions

- Please identify any additional functionalities or data types that would enhance the package.
- Kindly suggest any further functionalities or data types to be integrated into the package.

## Author

- [@Dharmesh Pal](https://github.com/dharmeshpal42)

## Support

For support, email dharmeshpal42@gmail.com

## License

[MIT](https://choosealicense.com/licenses/mit/)
