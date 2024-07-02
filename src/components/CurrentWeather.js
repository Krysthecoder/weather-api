import React from "react";
import { useState, useEffect } from "react";
import { fetchWeatherApi } from "../apiData/fetchWeatherApi";

const CurrentWeather = () => {
  const [location, setLocation] = useState(null); // Current location setter
  const [weather, setWeather] = useState(null); // Current weather information setter
  const date = new Date();
  const months = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December"
  };

  useEffect(() => {
    // will wait for the page to load to trigger a callback handleLocation function
    handleLocation();
    console.log(weather); // this is a reference for me to work on the object information returned by the API
  }, []);

  function handleLocation() {
    navigator.geolocation.getCurrentPosition(
      // looks for our location
      (position) => {
        // if the geolocation was determined then will use useState hook to set up out location
        const latitude = position.coords.latitude; // set variable for latitude and longitude
        const longitude = position.coords.longitude;
        setLocation({ latitude, longitude }); // set the location to the variables obtaineed
        fetchWeatherApi(latitude, longitude) // will call the function fetchAPI that will return a JSON file
          .then((data) => setWeather(data)) // once we get the json file, we will set our weather var with its information
          .catch((error) => console.log(error)); //  will catch any error
      },
      () => {
        return console.log("unable to get current location"); // will provide us an error in case it was not able to ser our location
      }
    );
  }

  console.log(weather);
  return (
    <div className="test">
      {weather ? (
        <div className="flex flex-col text-center items-center bg-slate-600 text-slate-400" >
          <h2 className="font-bold text-center">
            {weather.timezone}
          </h2>
          <img
            className="w-20 h-20"
            src={`https://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`}
            alt="weather icon"
          />

          <h4 className="text-4xl">{weather.current.temp}&deg;C</h4>
          <p className="text-xs text-gray-500">
            Feels like +{weather.current.feels_like}&deg;C
          </p>
          <p>
            {months[date.getMonth() + 1]} {date.getDate()}
          </p>
        </div>
      ) : (
        <p>loading ...</p>
      )}
    </div>
  );
};

export default CurrentWeather;
