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
  dateClass,
  date,
  uv,
  humidity,
  imgClass,
  uvClass,
  humidityClass,
}) => {
  return (
    <div className={ctnerClass}>
      <h1 className={tempClass}>{temperature}°</h1>
      <h2 className={uvClass}>{uv}</h2>
      <h2 className={humidityClass}>{humidity}</h2>{" "}
      <img className={imgClass} src={image} alt={weather} />{" "}
      <h2 className={textClass}>{text}</h2>
      <h2 className={timeClass}>{time}</h2>{" "}
      <h2 className={localClass}>{locality}</h2>
      <h2 className={dateClass}>{date}</h2>
    </div>
  );
};

export default Weather;
