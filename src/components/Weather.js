import React from "react";
import rainImg from "../images/rain.png";
import rainyImg from "../images/rainy.png";
import cloudImg from "../images/cloud.png";
import cloudyImg from "../images/cloudy.png";

import clearImg from "../images/clear.png";

export default function Weather() {
  const [city, setCity] = React.useState("");
  const [img, setImg] = React.useState();
  const [cityWeather, setCityWeather] = React.useState(null);
  const [wind_direction, setDirection] = React.useState("");
  const [dataFetched, setDataFetched] = React.useState(true);

  const handleSearch = () => {
    if (city) {
      fetchData(city);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  function makeDirection(wd) {
    let compas = wd;

    if ((wd > 315 && wd <= 360) || (wd > 0 && 45 > wd)) {
      compas = "N";
    } else if (wd > 45 && wd <= 135) {
      compas = "E";
    } else if (wd > 135 && wd <= 225) {
      compas = "S";
    } else {
      compas = "W";
    }
    return compas;
  }

  const apiKey = "a239b7d13dab53cb92a7c7c65c3dc402";
  const fetchData = (city) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        setCityWeather(data);
        console.log(data);

        switch (data.weather[0].main) {
          case "Clouds":
            setImg(cloudImg);
            break;
          case "Rain":
            setImg(rainImg);
            break;
          case "Clear":
            setImg(clearImg);
            break;
        }
        setDataFetched(true);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        setDataFetched(false);
      });
  };

  return (
    <div className="weather">
      <div className="header">
        <i className="fa-solid fa-location-dot fa-2xl"></i>
        <input
          className="city-input"
          placeholder="Enter a city.."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSearch}>
          <i className="fa-solid fa-magnifying-glass fa-2xl"></i>
        </button>
      </div>
      {dataFetched ? (
        <>
          {cityWeather && cityWeather.main && (
            <>
              <div className="weather-symbol">
                {img && (
                  <img src={img} height="200px" width={"200px"} alt="Weather" />
                )}
              </div>
              <div className="weather-data">
                <span className="weather-celsius">
                  {cityWeather.main.temp}°C
                </span>
                <span className="feelslike">
                  feels like: {cityWeather.main.feels_like}°C
                </span>
                <span>{cityWeather.weather[0].description}</span>
              </div>
              <div className="footer">
                <div className="humidity weather-data-footer">
                  <i className="fa-solid fa-water fa-2xl"></i>
                  <div className="details">
                    <span className="details-data">
                      {cityWeather.main.humidity}%
                    </span>
                    <span className="details-text">Humidity</span>
                  </div>
                </div>
                <div className="wind weather-data-footer">
                  <i className="fa-solid fa-wind fa-2xl"></i>
                  <div className="details">
                    <span className="details-data">
                      {cityWeather.wind.speed}m/s
                    </span>
                    <span className="details-text">Wind Speed</span>
                    <div className="wind_direction">
                      <i className="fa-regular fa-compass"></i>
                      <span className="wind-direction">
                        {makeDirection(cityWeather.wind.deg)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        <>
          <i className="fa-solid fa-circle-exclamation fa-shake fa-2xl"></i>
          <span>City not found</span>
        </>
      )}
    </div>
  );
}
