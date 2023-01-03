import "./Forecast.scss";
import apiKeys from "../../apiKeys";
import { useEffect, useState } from "react";
import Weather from "../../Components/Weather/Weather";
import { NavLink } from "react-router-dom";
import Form from "../../Components/Form/Form";

const Forecast = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [threeHour, setThreeHour] = useState([]);
  const [dailyWeather, setDailyWeather] = useState([]);
  const [field, setField] = useState("");

  const getWeather = async (latitude, longitude) => {
    const response =
      await fetch(`${apiKeys.base}/forecast.json?key=${apiKeys.key}&q=${latitude},${longitude}&days=7&aqi=no&alerts=no
      `);
    const data = await response.json();

    setWeather(data);
    console.log(data);
    setLoading(false);

    const daily = data.forecast.forecastday.map((daily, i) => {
      return (
        <Weather
          image={daily.day.condition.icon}
          temperature={
            Math.round(daily.day.mintemp_c) +
            "°" +
            "- " +
            Math.round(daily.day.maxtemp_c)
          }
          uv={daily.day.uv}
          humidity={daily.day.avghumidity}
          locality={daily.day.condition.text}
          date={daily.date.slice(8) + "/" + daily.date.slice(5, 7)}
          localClass={"daily-text"}
          tempClass={"daily-temp"}
          key={i + "daily weather"}
          dateClass={"daily-date"}
          ctnerClass={"daily-weather"}
          imgClass={"daily-img"}
        />
      );
    });
    setDailyWeather(daily);

    const threeHourArr = [];
    for (let i = 0; i < data.forecast.forecastday[0].hour.length; i += 3) {
      threeHourArr.push(data.forecast.forecastday[0].hour[i]);
    }
    const mappedWeather = threeHourArr.map((weather, i) => {
      return (
        <Weather
          temperature={Math.round(weather.temp_c)}
          image={weather.condition.icon}
          time={weather.time.slice(10)}
          weather={weather.condition.text}
          tempClass={"hourly-temp"}
          timeClass={"hourly-time"}
          ctnerClass={"hourly-weather"}
          key={i + "three hourly weather"}
        />
      );
    });
    setThreeHour(mappedWeather);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        getWeather(position.coords.latitude, position.coords.longitude);
      });
    }
  }, [field]);

  const getLocatedWeather = async (e) => {
    e.preventDefault();
    console.log(field);
    const response =
      await fetch(`${apiKeys.base}/forecast.json?key=${apiKeys.key}&q=${field}&days=7&aqi=no&alerts=no
      `);
    const data = await response.json();
    setWeather(data);
    console.log(data);
    setLoading(false);
  };

  const locatedWeather = (e) => {
    e.preventDefault();
    setField(e.target.value);
  };
  return (
    <div>
      {" "}
      <NavLink to="/" className="home">
        Home
      </NavLink>
      {!loading && !weather.error && (
        <>
          <Weather
            temperature={Math.round(weather.current.temp_c)}
            image={weather.current.condition.icon}
            weather={weather.current.condition.text}
            text={weather.current.condition.text}
            locality={weather.location.name}
            ctnerClass={"current-weather"}
            tempClass={"current-temp"}
            textClass={"current-text"}
            localClass={"current-local"}
          />
          <div className="threeHourWeather-ctner">{threeHour}</div>

          <div className="dailyWeather-ctner">
            <Weather
              image={weather.current.condition.icon}
              temperature="temp"
              uv="UV"
              humidity="Humidity"
              locality="Weather"
              date="Date"
              localClass={"daily-text"}
              tempClass={"daily-temp"}
              dateClass={"daily-date"}
              ctnerClass={"title-weather"}
              imgClass={"daily-img"}
            />{" "}
            {dailyWeather}
          </div>
        </>
      )}
      {loading && (
        <div className="loader-ctner">
          <div className="loader"></div>
        </div>
      )}
      <Form handleChange={locatedWeather} handleSubmit={getLocatedWeather} />
    </div>
  );
};

export default Forecast;
