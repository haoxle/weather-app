import "./App.scss";
import Forecast from "./Pages/Forecast/Forecast";

import Clock from "react-live-clock";
import { useEffect, useState } from "react";
const App = () => {
  const [greeting, setGreeting] = useState("Good Morning");
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
  }, [greeting]);
  return (
    <>
      <h1 className="greeting">{greeting}</h1>
      <div className="clock-ctner">
        <Clock format="HH" interval={1000} ticking={true} className="clock" />
        <Clock format="mm" interval={1000} ticking={true} className="clock" />
        <Clock format="ss" interval={1000} ticking={true} className="clock" />
      </div>
      <Forecast />;
    </>
  );
};

export default App;
