import React from "react";
import { useState, useEffect } from "react";
import { fetchWeatherApi } from "../apiData/fetchWeatherApi";

function FutureWeather() {
  const [location, setLocation] = useState(null); // Current location setter
  const [weatherInfo, setWeatherInfo] = useState(null);

  useEffect(() => {
    // will wait for the page to load to trigger a callback handleLocation function
    handleLocation();
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
          .then((data) => setWeatherInfo(data)) // once we get the json file, we will set our weather var with its information
          .catch((error) => console.log(error)); //  will catch any error
      },
      () => {
        return console.log("unable to get current location"); // will provide us an error in case it was not able to ser our location
      }
    );
  }

  function unixConverter(unixVal){
    const date = new Date(unixVal * 1000);
    var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const month = months[date.getMonth()];
    return `${month} ${date.getDate()}`
  }

  return (
    <div className="w-90 bg-neutral-800 p-4 text-cyan-500">
      {weatherInfo ? (
        <>
          <h1>Future predictions:</h1>
          <div className="flex text-center items-center justify-around flex-wrap">
            {weatherInfo.daily.map((weatherObj, index) => {
              return (
                <div key={index} className="flex text-center items-center flex-col w-20  m-4">
                  <img
                    className="w-20 h-20"
                    src={`https://openweathermap.org/img/wn/${weatherObj.weather[0].icon}@2x.png`}
                    alt="weather icon"
                  />
                  <p>{weatherObj.temp.day}&deg;C</p>
                  <p>Feels like: {weatherObj.feels_like.day}&deg;C.</p>
                  <p>{unixConverter(weatherObj.dt)}</p>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default FutureWeather;
