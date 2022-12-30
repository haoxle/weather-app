import "./Weather.scss";

const Weather = ({
  temperature,
  image,
  time,
  weather,
  text,
  locality,
  ctnerClass,
  tempClass,
  timeClass,
  textClass,
  localClass,
}) => {
  return (
    <div className={ctnerClass}>
      <h1 className={tempClass}>{temperature} °C</h1>
      <img className="current-image" src={image} alt={weather} />
      <h2 className={timeClass}>{time}</h2>
      <h2 className={textClass}>{text}</h2>
      <h2 className={localClass}>{locality}</h2>
    </div>
  );
};

export default Weather;
