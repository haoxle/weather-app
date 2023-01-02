import "./App.scss";
import Home from "./Pages/Home/Home";
import { Route, Routes } from "react-router-dom";
import Clock from "react-live-clock";
import { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Forecast from "./Pages/Forecast/Forecast";
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
    <Router>
      <h1 className="greeting">{greeting}</h1>
      <div className="clock-ctner">
        <Clock format="HH" interval={1000} ticking={true} className="clock" />
        <Clock format="mm" interval={1000} ticking={true} className="clock" />
        <Clock format="ss" interval={1000} ticking={true} className="clock" />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/forecast" element={<Forecast />} />
      </Routes>
    </Router>
  );
};

export default App;
