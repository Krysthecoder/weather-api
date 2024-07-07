import React, { useState, useEffect } from 'react';
import {
  dateUnixToLocaleConverter,
  fetchDataByGeoLocation
  //fetchWeatherApi,
} from '../Utils';
import Spinner from './Spinner';
import ToolTip from './ToolTip';

function FutureWeather() {
  const [weatherInfo, setWeatherInfo] = useState({});
  //const [location, setLocation] = useState({ latitude: null, longitude: null });

  const weatherIconBaseURL = 'https://openweathermap.org/img/wn/';
  const currentDeg = 'ºC.';

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
    <div className="w-full bg-transparent text-cyan-500 flex justify-center flex-col items-center">
      <h1 className="uppercase">Future predictions:</h1>
      <div className="flex items-center justify-evenly flex-wrap">
        {weatherInfo?.daily?.map((weatherObj, i) => {
          return (
            <div
              key={i}
              className="flex text-center items-center flex-col w-30  m-2"
            >
              <ToolTip toolTipText={weatherObj.summary} />

              <img
                className="w-20 h-20"
                src={`${weatherIconBaseURL}${weatherObj.weather[0].icon}@2x.png`}
                alt={weatherObj.summary}
              />

              <p>{`${weatherObj.temp.day} ${currentDeg}`}</p>
              <p className="text-slate-300 font-light text-sm">
                Feels like: {`${weatherObj.feels_like.day} ${currentDeg}`}
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
