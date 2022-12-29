import "./Home.scss";
import apiKeys from "../../apiKeys";
import { useEffect, useState } from "react";
import Clock from "react-live-clock";
const Home = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [greeting, setGreeting] = useState("Good Morning");
  // const [threeHour, setThreeHour] = useState([]);

  const getWeather = async (latitude, longitude) => {
    const response =
      await fetch(`${apiKeys.base}/forecast.json?key=${apiKeys.key}&q=${latitude},${longitude}&days=7&aqi=no&alerts=no
    `);
    const data = await response.json();
    setWeather(data);
    console.log(data);
    setLoading(false);
  };

  const getGreeting = () => {
    const d = new Date();
    const time = d.getHours();
    if (time > 12) {
      setGreeting("Good Afternoon");
    }
    if (time > 18) {
      setGreeting("Good Evening");
    }
    if (time > 21) {
      setGreeting("Good Night");
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        getWeather(position.coords.latitude, position.coords.longitude);
      });
    }
    getGreeting();
  }, []);

  return (
    <div>
      <h1 className="greeting">{greeting}</h1>
      <div className="clock-ctner">
        {/* <div className="clock"> */}
        <Clock format="HH" interval={1000} ticking={true} className="clock" />
        {/* </div> */}
        {/* <div className="clock"> */}
        <Clock format="mm" interval={1000} ticking={true} className="clock" />
        {/* </div> */}
        {/* <div className="clock"> */}
        <Clock format="ss" interval={1000} ticking={true} className="clock" />
        {/* </div> */}
      </div>
      {!loading && !weather.error && (
        <>
          <div className="current-weather">
            <h1>{weather.current.temp_c}°C</h1>
            <img
              className="current-image"
              src={weather.current.condition.icon}
              alt={weather.current.condition.text}
            />
            <h2>{weather.current.condition.text}</h2>
            <h2> {weather.location.name}</h2>
          </div>
          <div className="hourly-weather">
            <h1>{weather.forecast.forecastday[0].hour[0].temp_c}°C</h1>
            <img
              className="current-image"
              src={weather.forecast.forecastday[0].hour[0].condition.icon}
              alt={weather.forecast.forecastday[0].hour[0].condition.text}
            />
            <h2>{weather.forecast.forecastday[0].hour[0].time.slice(10)}</h2>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
