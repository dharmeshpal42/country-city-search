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
