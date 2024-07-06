import { months } from './utilsData';

export const getCurrentMonth = () => {
  const date = new Date();
  return 0;
};

export function dateUnixToLocaleConverter(unixVal) {
  const date = new Date(unixVal * 1000);
  const month = months[date.getMonth()];
  return `${month} ${date.getDate()}`;
}

export async function fetchWeatherApi(latitude, longitude) {
  const key = process.env.REACT_APP_WEATHER_API_KEY;
  const apiUrl = `${process.env.REACT_APP_WEATHER_API_URL}lat=${latitude}&lon=${longitude}&units=metric&appid=${key}`;
  const fetchedData = await fetch(apiUrl);
  const fetchedDataResponse = fetchedData.json();
  return fetchedDataResponse;
}

const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          reject(error);
        }
      );
    } else {
      reject(new Error('unable to get current location.'));
    }
  });
};

export async function fetchDataByGeoLocation() {
  const { latitude, longitude } = await getCurrentLocation();
  const data = await fetchWeatherApi(latitude, longitude);
  return data;
}
