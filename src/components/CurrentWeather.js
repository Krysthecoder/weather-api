import React from "react";
import { useState, useEffect } from "react";
import { fetchWeatherApi } from "../apiData/fetchWeatherApi";

const CurrentWeather = () => {
  const [location, setLocation] = useState(null);   // Current location setter
  const [weather, setWeather] = useState(null);     // Current weather information setter

  

  useEffect(() => {         // will wait for the page to load to trigger a callback handleLocation function
    handleLocation();
    console.log(weather);   // this is a reference for me to work on the object information returned by the API
  }, []);

  function handleLocation() {
    navigator.geolocation.getCurrentPosition(           // looks for our location
      (position) => {                                   // if the geolocation was determined then will use useState hook to set up out location
        const latitude = position.coords.latitude;      // set variable for latitude and longitude
        const longitude = position.coords.longitude;
        setLocation({ latitude, longitude });           // set the location to the variables obtaineed
        fetchWeatherApi(latitude, longitude)            // will call the function fetchAPI that will return a JSON file
          .then((data) => setWeather(data))             // once we get the json file, we will set our weather var with its information
          .catch((error) => console.log(error));        //  will catch any error
      },
      () => {
        return console.log("unable to get current location");   // will provide us an error in case it was not able to ser our location
      }
    );
  }
  

  console.log(weather);
  return (
    <div className="test">
      {weather ? (
        <div className="bg-gray-100 antialiased">
          <div className="container mx-auto h-screen w-screen">
            <div className="flex items-center justify-center h-full">
              <div className="bg-white shadow-2xl p-6 rounded-2xl border-2 border-gray-50">
                <div className="flex flex-col">
                  <div>
                    <h2 className="font-bold text-gray-600 text-center">
                      {weather.timezone}
                    </h2>
                  </div>
                  <div className="my-6">
                    <div className="flex flex-row space-x-4 items-center">
                      <div id="icon">
                        <span>
                          <img
                            className="w-20 h-20"
                            src={`https://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`}
                            alt="weather icon"
                          />
                        </span>
                      </div>
                      <div id="temp">
                        <h4 className="text-4xl">
                          {weather.current.temp}&deg;C
                        </h4>
                        <p className="text-xs text-gray-500">
                          Feels like +{weather.current.feels_like}&deg;C
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="w-full place-items-end text-right border-t-2 border-gray-100 mt-2">
                    <p className="text-indigo-600 text-xs font-medium mt-3">
                      Hora de ser un papucho
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>loading ...</p>
      )}
    </div>
  );
};

export default CurrentWeather;

{
  /* <svg
                            className="w-20 h-20 fill-stroke text-yellow-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                            ></path>
                          </svg> */
}
