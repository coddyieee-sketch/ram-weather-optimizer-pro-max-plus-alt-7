import React, { useState, useEffect } from 'react';
import { FiSettings } from 'lucide-react';
import axios from 'axios';

function App() {
  const [weatherData, setWeatherData] = useState({});
  const [ramUsage, setRamUsage] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:8000/weather-data')
      .then(response => {
        setWeatherData(response.data);
      })
      .catch(error => {
        console.error(error);
      });

    axios.get('http://localhost:8000/ram-usage')
      .then(response => {
        setRamUsage(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleDarkModeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    axios.post('http://localhost:8000/submit-data', formData)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className={`app ${isDarkMode ? 'dark-mode' : ''}`}>
      <header className="header">
        <h1>RAM Weather Optimizer Pro Max Plus Alt 7</h1>
        <button className="settings-button" onClick={handleDarkModeToggle}>
          <FiSettings />
        </button>
      </header>
      <main className="main">
        <section className="weather-section">
          <h2>Weather Data</h2>
          <ul>
            {Object.keys(weatherData).map((key, index) => (
              <li key={index}>{key}: {weatherData[key]}</li>
            ))}
          </ul>
        </section>
        <section className="ram-usage-section">
          <h2>RAM Usage</h2>
          <p>{ramUsage} MB</p>
        </section>
        <section className="submit-data-section">
          <h2>Submit Data</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Key:
              <input type="text" name="key" />
            </label>
            <label>
              Value:
              <input type="text" name="value" />
            </label>
            <button type="submit">Submit</button>
          </form>
        </section>
      </main>
    </div>
  );
}

export default App;