import "./Weather.scss";

const Weather = ({
  temperature,
  image,
  time,
  weather,
  text,
  locality,
  ctnerClass,
}) => {
  return (
    <div className={ctnerClass}>
      <h1>{temperature} °C</h1>
      <img className="current-image" src={image} alt={weather} />
      <h2>{time}</h2>
      <h2>{text}</h2>
      <h2>{locality}</h2>
    </div>
  );
};

export default Weather;
