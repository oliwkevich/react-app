import axios from "axios";
import { useState } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = (evt) => {
    if (evt.key === "Enter") {
      axios
        .get(`${API.url}weather?q=${query}&units=metric&APPID=${API.key}`)
        .then((results) => {
          setWeather(results.data);
          setQuery("");
          console.log(results.data);
        });
    }
  };

  const API = {
    key: "d7fbbf3980983775efee8494fec9fc88",
    url: "https://api.openweathermap.org/data/2.5/",
  };
  const dateBuilder = (d) => {
    let months = [
      "Січень",
      "Лютий",
      "Березень",
      "Квітень",
      "Травень",
      "Червень",
      "Липень",
      "Серпень",
      "Вересень",
      "Жовтень",
      "Листопад",
      "Грудень",
    ];
    let days = [
      "Понеділок",
      "Вівторок",
      "Середа",
      "Четверг",
      "Пятниця",
      "Суботу",
      "Неділя",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <div>
      <main className="bg-[url('./assets/bg.jpg')] h-screen">
        <div>
          <input
            type="text"
            className="w-full rounded-2xl p-4 outline-none mt-10 text-2xl
            "
            placeholder="Введіть назву міста..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        <div>
          <div className="text-white">
            {weather.name ? (
              <p className="absolute text-xl top-[22%] left-[12%]">
                {weather.name}, {weather.sys?.country}
              </p>
            ) : null}
            {weather.main ? (
              <h1 className="text-7xl absolute top-[25%] left-10">
                {weather.main?.temp}℃
              </h1>
            ) : null}
            {weather.name ? (
              <p className="absolute top-[34%] left-[25%]">
                {dateBuilder(new Date())}
              </p>
            ) : null}
          </div>
          <div
            className="absolute right-[-20px] top-[50%] -rotate-90 text-white
          text-4xl font-bold"
          >
            {weather.weather?.map((item) => (
              <p>{item.main}</p>
            ))}
          </div>
          <div>
            <div className="text-white absolute bottom-32 border rounded-lg p-3 
            left-12 bg-slate-500/80 space-y-5">
              <div>
                {weather.main ? (
                  <p>Відчувається як: <span className="font-bold">{weather.main?.feels_like} ℃</span></p>
                ) : null}
              </div>
              <div>
                {weather.main ? (
                  <p>Максимальная температура: <span className="font-bold">{weather.main?.temp_max} ℃</span></p>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
