import { NavLink } from "react-router-dom";
import "./Home.scss";

const Home = () => {
  return (
    <div className="app-ctner">
      <NavLink to="weather-app/forecast" className="app-forecast">
        Forecast
      </NavLink>
      <NavLink to="weather-app/" className="app-list">
        To-Do List
      </NavLink>
    </div>
  );
};

export default Home;
