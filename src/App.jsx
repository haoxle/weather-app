import "./App.css";
import { getLocation } from "./currentLocation";
import apiKeys from "./apiKeys";
import { useEffect, useState } from "react";

const App = () => {
  const getWeather = async () => {
    const response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=326cc5d6256e4eae995154922222712&q=51.5114223,-0.1165972&aqi=no
      `
    );
    const data = await response.json();
    console.log(data);
  };
  useEffect(() => {
    getWeather();
  }, []);
  return (
    <div>
      <h1>hello world</h1>
    </div>
  );
};

export default App;
