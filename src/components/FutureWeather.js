import React, { useState, useEffect } from 'react';
import {
  dateUnixToLocaleConverter,
  fetchDataByGeoLocation
  //fetchWeatherApi,
} from '../Utils';

function FutureWeather() {
  const [weatherInfo, setWeatherInfo] = useState({});
  //const [location, setLocation] = useState({ latitude: null, longitude: null });

  useEffect(() => {
    const test = async () => {
      const fetchedData = await fetchDataByGeoLocation();
      setWeatherInfo(fetchedData);
    };
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
    return <p>Loading...</p>;
  }

  return (
    <div className="w-90 bg-neutral-800 p-4 text-cyan-500">
      <h1>Future predictions:</h1>
      <div className="flex text-center items-center justify-around flex-wrap">
        {weatherInfo?.daily?.map((weatherObj, index) => {
          return (
            <div className="flex text-center items-center flex-col w-20  m-4">
              <img
                className="w-20 h-20"
                src={`https://openweathermap.org/img/wn/${weatherObj.weather[0].icon}@2x.png`}
                alt="weather icon"
              />
              <p>{weatherObj.temp.day}&deg;C</p>
              <p>Feels like: {weatherObj.feels_like.day}&deg;C.</p>
              <p>{dateUnixToLocaleConverter(weatherObj.dt)}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FutureWeather;
