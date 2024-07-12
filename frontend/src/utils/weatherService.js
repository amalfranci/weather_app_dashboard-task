const API_KEY = "ac3436351ecfe8881233ef38696ed0fb";

const makeIconURL = (iconId) =>
  `https://openweathermap.org/img/wn/${iconId}@2x.png`;

console.log("icon", makeIconURL);

const getGeographicalCoordinates = async (city) => {
  const URL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`;
  const data = await fetch(URL).then((res) => res.json());
  if (data.length === 0) {
    throw new Error("City not found");
  }
  const { lat, lon } = data[0];
  return { lat, lon };
};

const getFormattedWeatherData = async (city) => {
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
  const data = await fetch(URL)
    .then((res) => res.json())
    .then((data) => data);

  const {
    weather,
    main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
    wind: { speed },
    sys: { country },
    name,
  } = data;

  const { description, icon } = weather[0];

  return {
    description,
    IconUrl: makeIconURL(icon),
    temp,
    feels_like,
    temp_max,
    temp_min,
    pressure,
    humidity,
    speed,
    country,
    name,
  };
};
const getForecastWeatherData = async (city) => {
  const URL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;
  const data = await fetch(URL).then((res) => res.json());

  const dailyForecasts = [];
  let currentDay = null;

  data.list.forEach((item) => {
    const date = new Date(item.dt_txt).getDate();
    if (date !== currentDay) {
      currentDay = date;
      dailyForecasts.push(item);
    }
  });

  return dailyForecasts
    .map((forecast) => {
      const {
        dt,
        main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
        weather,
        wind: { speed },
      } = forecast;

      const { description, icon } = weather[0];
      return {
        dt,
        description,
        iconUrl: makeIconURL(icon),
        temp,
        feels_like,
        temp_max,
        temp_min,
        pressure,
        humidity,
        speed,
      };
    })
    .slice(0, 7);
};

const getHistoricalWeatherData = async (lat, lon) => {
  const currentTime = Math.floor(Date.now() / 1000);
  const oneDay = 86400;
  const startTime = currentTime - 7 * oneDay;

  const URL = `https://history.openweathermap.org/data/2.5/history/city?lat=${lat}&lon=${lon}&type=hour&start=${startTime}&cnt=168&appid=ac3436351ecfe8881233ef38696ed0fb`;
  const data = await fetch(URL).then((res) => res.json());

  return data.list.map((item) => {
    const {
      dt,
      main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
      weather,
      wind: { speed },
    } = item;

    const { description, icon } = weather[0];
    return {
      dt,
      description,
      iconUrl: makeIconURL(icon),
      temp,
      feels_like,
      temp_max,
      temp_min,
      pressure,
      humidity,
      speed,
    };
  });
};

export {
  getFormattedWeatherData,
  getForecastWeatherData,
  getHistoricalWeatherData,
  getGeographicalCoordinates,
};
