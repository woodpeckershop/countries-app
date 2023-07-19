import "./styles.css";
import { useState, useEffect } from "react";
import { Card } from "./Card";
import { Button } from "./Button";

// Define the Country type
export type Country = {
  name: string;
  population: number;
  area: number;
  flag: string;
  latlng: number[];
};

export default function App() {
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const countryArr: Country[] = [];
        data.forEach((country: any) => {
          countryArr.push({
            name: country.name.common,
            flag: country.flag,
            population: country.population,
            area: country.area,
            latlng: country.latlng
          });
        });
        setCountries(countryArr);
      });
  }, []);

  // "biggest country" could be either about land size or population,
  // I made use of both.
  // To find the biggest country by land size.
  // As the requirement didn't specify "how many biggist countries",
  // I just made a sort function.
  const sortByArea = () => {
    const arr = [...countries];
    arr.sort((countryA, countryB) => {
      return countryB.area - countryA.area;
    });

    setCountries(arr);
  };

  // Same idea as "sortByArea"
  const sortByPopulation = () => {
    const arr = [...countries];
    arr.sort((countryA, countryB) => {
      return countryB.population - countryA.population;
    });

    setCountries(arr);
  };

  // To find the warmest/coldest countries,
  // I made use of the absolute value of the latitude.
  // The smaller the latitude's absolute value is (closer to the Equator),
  // the warmer it generally is.
  const sortByTemperature = (highest: boolean) => {
    const arr = [...countries];
    if (highest) {
      arr.sort((countryA, countryB) => {
        return Math.abs(countryA.latlng[0]) - Math.abs(countryB.latlng[0]);
      });
    } else {
      arr.sort((countryA, countryB) => {
        return Math.abs(countryB.latlng[0]) - Math.abs(countryA.latlng[0]);
      });
    }
    setCountries(arr);
  };

  return (
    <div className="App">
      <div className="button-list">
        <Button sortFunc={sortByArea} label="Sort By Area" />
        <Button sortFunc={sortByPopulation} label="Sort By Population" />
        <Button
          sortFunc={() => sortByTemperature(true)}
          label="Highest Temperature"
        />
        <Button
          sortFunc={() => sortByTemperature(false)}
          label="Lowest Temperature"
        />
      </div>
      <ul className="list">
        {countries.map((country) => (
          <Card country={country} key={country.name} />
        ))}
      </ul>
    </div>
  );
}
