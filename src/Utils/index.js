import { months } from "./utilsData";

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
  const fetchedData = await fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => console.log(error));
  return fetchedData;
}

export async function fetchDataByGeoLocation() {
  navigator.geolocation.getCurrentPosition(
    ({ coords: { latitude, longitude } }) =>
     fetchWeatherApi(latitude, longitude),
    () => console.log("unable to get current location")
  );
  console.log(navigator)
}
