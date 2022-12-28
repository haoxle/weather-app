import "./App.css";

import { useEffect, useState } from "react";

const App = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  const getWeather = async (latitude, longitude) => {
    const response =
      await fetch(`http://api.weatherapi.com/v1/current.json?key=326cc5d6256e4eae995154922222712&q=${latitude},${longitude}&aqi=no
    `);
    const data = await response.json();
    setWeather(data);
    console.log(data);
    setLoading(false);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        getWeather(position.coords.latitude, position.coords.longitude);
      });
    }
  }, []);

  return (
    <div>
      <h1>hello world</h1>
      {!loading && !weather.error && (
        <h1>
          {weather.location.name} {weather.current.temp_c}
        </h1>
      )}
    </div>
  );
};

export default App;
