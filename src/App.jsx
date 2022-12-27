import "./App.css";
import { getLocation } from "./currentLocation";
import apiKeys from "./apiKeys";
import { useEffect, useState } from "react";

const App = () => {
  const [weather, setWeather] = useState({});
  const getWeather = async (lat, lon) => {
    const response = await fetch(
      `${apiKeys.base}current.json?key=${apiKeys.key}&q=${lat},${lon}&aqi=no`
    );
    const weather = await response.json();
    return setWeather(weather);
  };
  useEffect(() => {
    getLocation();
  }, []);

  return (
    <div>
      <h1>hello world</h1>
    </div>
  );
};

export default App;
