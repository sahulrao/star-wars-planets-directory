import React, { useState, useEffect } from 'react';
import ResidentsList from './ResidentsList';

const PlanetCard = ({ planet }) => {
  const [residents, setResidents] = useState([]);

  useEffect(() => {
    const fetchResidents = async () => {
      const promises = planet.residents.map(async (residentURL) => {
        const response = await fetch(residentURL);
        const data = await response.json();
        return data;
      });

      const residentsData = await Promise.all(promises);
      setResidents(residentsData);
    };

    fetchResidents();
  }, [planet.residents]);

  return (
    <div className="planet-card">
      <h2>{planet.name}</h2>
      <p>Climate: {planet.climate}</p>
      <p>Population: {planet.population}</p>
      <p>Terrain: {planet.terrain}</p>
      <ResidentsList residents={residents} />
    </div>
  );
};

export default PlanetCard;
