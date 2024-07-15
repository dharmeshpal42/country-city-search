# Country-City-Search

A Project to get Data about the country cities and states accroding the request

## Installation

Install world data package with npm

```bash
  npm i country-city-search
```

## Features

- Get all countries names accross the world in single array
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
    //------------------------------------------------------

    //Get City object using city name, state name and country name

    const cityObject = await getCityByNameAndCountryData({
      cityName: "rajkot",
      state_name: "gujarat",
      country_name: "India",
    });

    //------------------------------------------------------------

    //Get List array of cities object using state and country name

    const allCitiesFromState = await getCitiesByStateAndCountry("gujarat", "India");
    //------------------------------------------------------------

    //Search City by it's Name

    const city = await searchCityByName("ahmedabad");

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
