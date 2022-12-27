import "./App.css";

import { useEffect, useState } from "react";

const App = () => {
  const [longitude, setLongitude] = useState();
  const [latitude, setLatitude] = useState();
  const [weather, setWeather] = useState({});
  const getWeather = async (longitude, latitude) => {
    const response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=326cc5d6256e4eae995154922222712&q=${latitude},${longitude}&aqi=no
      `
    );
    const data = await response.json();
    setWeather(data);
    console.log(weather);
  };
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      });
    } else {
      alert("Sorry Not available!");
    }

    getWeather(longitude, latitude);
  }, [latitude, longitude]);
  return (
    <div>
      <h1>hello world</h1>
      <h1></h1>
    </div>
  );
};

export default App;
