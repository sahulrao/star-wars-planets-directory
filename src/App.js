import React, { useState, useEffect } from 'react';
import PlanetCard from './components/PlanetCard';
import Pagination from './components/Pagination';
import './styles.css';

const App = () => {
  const [planets, setPlanets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchPlanets = async () => {
      try {
        const response = await fetch(`https://swapi.dev/api/planets/?format=json&page=${currentPage}`);
        const data = await response.json();
        setPlanets(data.results);
        setTotalPages(Math.ceil(data.count / 10)); // Assuming 10 planets per page
      } catch (error) {
        console.error('Error fetching planets:', error);
      }
    };

    fetchPlanets();
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="app">
      <h1>Star Wars Planets Directory</h1>
      <div className="planets-container">
        {planets.map((planet) => (
          <PlanetCard key={planet.name} planet={planet} />
        ))}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
};

export default App;
