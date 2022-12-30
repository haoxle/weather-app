import "./Home.scss";
import apiKeys from "../../apiKeys";
import { useEffect, useState } from "react";
import Clock from "react-live-clock";
import Weather from "../../Components/Weather/Weather";

const Home = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [greeting, setGreeting] = useState("Good Morning");
  const [threeHour, setThreeHour] = useState([]);

  const getWeather = async (latitude, longitude) => {
    const response =
      await fetch(`${apiKeys.base}/forecast.json?key=${apiKeys.key}&q=${latitude},${longitude}&days=7&aqi=no&alerts=no
    `);
    const data = await response.json();
    setWeather(data);
    console.log(data);
    setLoading(false);

    const getNth = (arr, nth) => {
      const threeHourArr = [];
      for (let i = 0; i < arr.length; i += nth) {
        threeHourArr.push(arr[i]);
      }
      const mappedWeather = threeHourArr.map((weather, i) => {
        return (
          <div key={i + "three hourly weather"}>
            <Weather
              temperature={weather.temp_c}
              image={weather.condition.icon}
              time={weather.time.slice(10)}
              weather={weather.condition.text}
              ctnerClass={"hourly-weather"}
            />
          </div>
        );
      });
      setThreeHour(mappedWeather);
      return threeHourArr;
    };
    getNth(data.forecast.forecastday[0].hour, 3);
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
    getGreeting();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        getWeather(position.coords.latitude, position.coords.longitude);
      });
    }
  }, []);

  return (
    <div>
      <h1 className="greeting">{greeting}</h1>
      <div className="clock-ctner">
        <Clock format="HH" interval={1000} ticking={true} className="clock" />
        <Clock format="mm" interval={1000} ticking={true} className="clock" />
        <Clock format="ss" interval={1000} ticking={true} className="clock" />
      </div>
      {!loading && !weather.error && (
        <>
          <Weather
            temperature={weather.current.temp_c}
            image={weather.current.condition.icon}
            weather={weather.current.condition.text}
            text={weather.current.condition.text}
            locality={weather.location.name}
            ctnerClass={"current-weather"}
          />
          {threeHour}
        </>
      )}
    </div>
  );
};

export default Home;
