import "./Home.scss";
import apiKeys from "../../apiKeys";
import { useEffect, useState } from "react";

const Home = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  const getWeather = async (latitude, longitude) => {
    const response =
      await fetch(`${apiKeys.base}/current.json?key=${apiKeys.key}&q=${latitude},${longitude}&aqi=no
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
          {weather.location.name} {weather.current.temp_c}°C{" "}
          {weather.current.condition.text}
          <img
            src={weather.current.condition.icon}
            alt={weather.current.condition.text}
          />
        </h1>
      )}
    </div>
  );
};

export default Home;
