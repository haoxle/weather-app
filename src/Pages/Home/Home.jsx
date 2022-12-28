import "./Home.scss";
import apiKeys from "../../apiKeys";
import { useEffect, useState } from "react";
import Clock from "react-live-clock";
const Home = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [greeting, setGreeting] = useState("Good Morning");

  const getWeather = async (latitude, longitude) => {
    const response =
      await fetch(`${apiKeys.base}/current.json?key=${apiKeys.key}&q=${latitude},${longitude}&aqi=no
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
