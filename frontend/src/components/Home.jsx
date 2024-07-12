import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Descriptions from "./Descriptions";
import {
  getFormattedWeatherData,
  getForecastWeatherData,
  getGeographicalCoordinates,
} from "../utils/weatherService.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function App() {
  const [city, setCity] = useState("Greater Noida");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  axios.defaults.headers.common["Authorization"] = `${localStorage.getItem(
    "token"
  )}`;

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const { lat, lon } = await getGeographicalCoordinates(city);

        const data = await getFormattedWeatherData(city);
        setWeather(data);

        const forecastData = await getForecastWeatherData(city);
        setForecast(forecastData);
      } catch (error) {
        toast.error("Please enter a valid city name.");
      }
    };

    fetchWeatherData();
  }, [city]);

  const enterKeyPressed = (e) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
    }
  };

  const addToFavorites = async () => {
    try {
      const response = await axios.post("http://localhost:4000/api/favorites", {
        city,
      });

      if (response.data.status === 200) {
        setFavorites([...favorites, response.data.favorite]);
        toast.success("City added to favorites!");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };
  return (
    <div className="min-h-screen">
      <div className="min-h-screen bg-gray-700  flex flex-col items-center justify-center text-white">
        <ToastContainer />
        {weather && (
          <div className="max-w-2xl   p-3">
            <div className="flex flex-col items-center  mb-1">
              <input
                onKeyDown={enterKeyPressed}
                type="text"
                name="city"
                placeholder="Enter City..."
                className="text-black rounded p-2"
              />
              <div className="flex justify-end items-end w-full mt-2">
                <button
                  onClick={addToFavorites}
                  className="bg-gray-900 text-white rounded px-4 py-2 font-bold"
                >
                  Add to Favorite
                </button>
              </div>
            </div>

            <div className="grid grid-cols-4 items-center ">
              <h3 className="text-xl">{`${weather.name} ${weather.country}`}</h3>
              <img
                src={weather.IconUrl}
                width="100px"
                height="100px"
                alt="icon_weather"
              />
              <h3 className="text-xl capitalize">{weather.description}</h3>
              <h1 className="text-2xl">{`${weather.temp.toFixed()} °C`}</h1>
            </div>
            <Descriptions weather={weather} />
            <div className="mt-2">
              <h2 className="text-xl p-4 text-center mb-2"> Forecast</h2>
              <div className="grid grid-cols-6 gap-16">
                {forecast.map((f, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <h3 className="text-lg">
                      {new Date(f.dt * 1000).toLocaleDateString()}
                    </h3>
                    <img
                      src={f.iconUrl}
                      width="50px"
                      height="50px"
                      alt="icon_weather"
                    />
                    <h4 className="text-lg">{`${f.temp.toFixed()} °C`}</h4>
                    <p className="capitalize">{f.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
