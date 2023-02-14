import React, { useState, useEffect } from "react";
import "./Weather.css";
import axios from "axios";

const Weather = () => {
  const apikey = "bd4f4ee82a57cbd4d0f461299adcec0e";
  const [Data, setData] = useState({});
  const [City, setCity] = useState("");
  const [CurrTemp, setCurrTemp] = useState(0);
  const [Icon, setIcon] = useState("");
  const getData = (name) => {
    if (!name) return;
    const currApi =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      name +
      "&appid=" +
      apikey;
    const apiURL =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      name +
      "&appid=" +
      apikey;
    axios
      .get(apiURL)
      .then((res) => {
        setData(res.data);
        let s = document.getElementById("search");
        s.style.border = "none";
      })
      .catch((err) => {
        let s = document.getElementById("search");
        s.style.border = "1px solid red";
      });
    axios
      .get(currApi)
      .then((res) => {
        setCurrTemp(res.data.main.temp);
        setIcon(res.data.weather[0].icon);
      })
      .catch((err) => {});
  };
  const HandleChange = (e) => {
    setCity(e.target.value);
  };
  useEffect(() => {
    getData("Delhi");
  }, []);
  const HandleSearch = (e) => {
    getData(City);
    setCity("");
  };

  return (
    <div className="main">
      <input
        id="search"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            HandleSearch();
          }
        }}
        onChange={HandleChange}
        value={City}
        type="search"
        placeholder="search for cities"
      ></input>
      <button className="submit" onClick={HandleSearch}>
        Search
      </button>
      <div className="center">
        <div className="content">
          <div className="city-temp">
            <h1 className="city">
              {Data.city?.name}, {Data.city?.country}
            </h1>
            <h1 className="temp">{(CurrTemp - 273.15).toFixed(0)}°C</h1>
            <div className="main-icon">
              <div className="icon-label">
                <img
                draggable={false}
                
                src={`http://openweathermap.org/img/wn/${Icon.slice(
                  0,
                  2
                )}d@2x.png`}
                width={50}
                alt=""
              />
              <div className="labell">{Data.list?.[0].weather[0].description}</div>
              
              </div>
              
            </div>
          </div>

          <div className="forecast">
            <div>TODAYS FORECAST</div>
            <div className="horizontal">
              {Data.list?.map((item, index) => {
                if (index < 8) {
                  return (
                    <div className="today-item">
                      <div className="time">{item.dt_txt.slice(11, 16)}</div>
                      <div className="icon">
                        <img
                          draggable={false}
                          id="imageBox"
                          src={`http://openweathermap.org/img/wn/${Data.list[
                            index
                          ].weather[0].icon.slice(0, 2)}d@2x.png`}
                          width={50}
                          alt=""
                        />
                      </div>
                      <div className="temper">
                        {(item.main.temp - 273.15).toFixed(0)}°C
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          </div>

          <div className="details">
            MORE INFO
            <div className="items">
              <div className="detail-item">
                <div className="detail-name">Description</div>
                <div className="detail-value">
                  {Data.list?.[0].weather[0].description}
                </div>
              </div>
              <div className="detail-item">
                <div className="detail-name">Humidity</div>
                <div className="detail-value">
                  {Data.list?.[0].main.humidity}%
                </div>
              </div>
              <div className="detail-item">
                <div className="detail-name">Feels like</div>
                <div className="detail-value">
                  {(Data.list?.[0].main.feels_like - 273.15).toFixed(0)}°C
                </div>
              </div>
              <div className="detail-item">
                <div className="detail-name">Pressure</div>
                <div className="detail-value">
                  {Data.list?.[0].main.pressure}mb
                </div>
              </div>
              <div className="detail-item">
                <div className="detail-name">Wind Speed</div>
                <div className="detail-value">
                  {Data.list?.[0].wind.speed}m/s
                </div>
              </div>
              <div className="detail-item">
                <div className="detail-name">Visibility</div>
                <div className="detail-value">{Data.list?.[0].visibility}m</div>
              </div>
            </div>
          </div>

          <div className="summary">
            <div>5-DAY FORECAST</div>
            {Data.list?.map((item, index) => {
              if (index % 8 === 0) {
                return (
                  <div className="forecast-item">
                    <div className="date">{item.dt_txt.slice(0, 11)}</div>
                    <div className="icon">
                      <img
                        draggable={false}
                        id="imageBox"
                        src={`http://openweathermap.org/img/wn/${Data.list[
                          index
                        ].weather[0].icon.slice(0, 2)}d@2x.png`}
                        width={50}
                        alt=""
                      />
                    </div>
                    <div className="type">
                      {Data.list[index].weather[0].main}
                    </div>
                    <div className="temp-range">
                      <div className="max-temp">
                        {(item.main.temp_max - 273.15).toFixed(2)}°C
                      </div>
                      <div className="min-temp">
                        {(item.main.temp_min - 273.15).toFixed(2)}°C
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
