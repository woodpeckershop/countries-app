import { Country } from "./App";
const Card = ({
  country: { name, flag, population, area, latlng }
}: {
  country: Country;
}) => {
  return (
    <li className="card">
      <p>{`${flag} ${name}`}</p>
      <p>{`Population: ${population.toLocaleString()}`}</p>
      <p>{`Area: ${area.toLocaleString()} km²`}</p>
      <p>{`Coordinates: ${latlng[0]}°, ${latlng[1]}°`}</p>
    </li>
  );
};

export { Card };
