import "./App.css";

import { useEffect, useState } from "react";

const App = () => {
  const [longitude, setLongitude] = useState([]);
  const [latitude, setLatitude] = useState([]);
  const [weather, setWeather] = useState({});
  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition(function (position) {
  //     setLatitude(position.coords.latitude);
  //     setLongitude(position.coords.longitude);
  //   });

  //   console.log("Latitude is:", latitude);
  //   console.log("Longitude is:", longitude);
  // }, [latitude, longitude]);

  useEffect(() => {
    const getWeather = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        });
        console.log("Latitude is:", latitude);
        console.log("Longitude is:", longitude);
      } else {
        alert("Sorry Not available!");
      }
      const response = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=326cc5d6256e4eae995154922222712&q=${latitude},${longitude}&aqi=no
      `
      );
      const data = await response.json();
      setWeather(data);
      console.log(data);
    };
    getWeather();
  }, [latitude, longitude]);

  return (
    <div>
      <h1>hello world</h1>
      {/* <h1>{weather.location.name}</h1>
      <h1>{weather.location.country}</h1>
      <h1>{weather.current.temp_c}°C</h1> */}
    </div>
  );
};

export default App;
