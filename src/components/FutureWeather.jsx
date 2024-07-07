import React, { useState, useEffect } from 'react';
import {
  dateUnixToLocaleConverter,
  fetchDataByGeoLocation
  //fetchWeatherApi,
} from '../Utils';
import Spinner from './Spinner';

function FutureWeather() {
  const [weatherInfo, setWeatherInfo] = useState({});
  //const [location, setLocation] = useState({ latitude: null, longitude: null });

  const test = async () => {
    const fetchedData = await fetchDataByGeoLocation();
    setWeatherInfo(fetchedData);
  };

  useEffect(() => {
    test();
  }, []);

  // useEffect(()=>{
  //   const getCurrentLocation = () => {
  //     navigator.geolocation.getCurrentPosition(
  //       ({ coords: { latitude, longitude } }) => {
  //         setLocation({latitude, longitude})
  //       },
  //       () => console.log("unable to get current location")
  //     );
  //   }
  //   getCurrentLocation()
  // },[])

  // useEffect(() => {
  //   if(!!location.latitude && !!location.longitude){
  //     const fetchApiResolver = async () => {
  //       const data = await fetchWeatherApi(location.latitude, location.longitude)
  //       setWeatherInfo(data)
  //     }
  //     fetchApiResolver();
  //   }
  // },[location])

  if (weatherInfo?.daily?.length === 0) {
    return <Spinner />;
  }

  return (
    <div className="w-full bg-neutral-800 text-cyan-500 flex justify-center flex-col items-center">
      <h1 className="uppercase">Future predictions:</h1>
      <div className="flex items-center justify-evenly flex-wrap">
        {weatherInfo?.daily?.map((weatherObj, i) => {
          return (
            <div
              key={i}
              className="flex text-center items-center flex-col w-30  m-2"
            >
              <img
                className="w-20 h-20"
                src={`https://openweathermap.org/img/wn/${weatherObj.weather[0].icon}@2x.png`}
                alt="weather icon"
              />
              <p>{weatherObj.temp.day}&deg;C</p>
              <p className="text-slate-300 font-light text-sm">
                Feels like: {weatherObj.feels_like.day}&deg;C.
              </p>
              <p className="text-red-400 font-light text-sm">
                {dateUnixToLocaleConverter(weatherObj.dt)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FutureWeather;
