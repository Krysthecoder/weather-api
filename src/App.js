
import "./App.css";
import CurrentWeather from "./components/CurrentWeather";
import Footer from "./components/Footer";
import FutureWeather from "./components/FutureWeather";

function App() {

  
  return (
    <div className="App">
      <CurrentWeather />

      <FutureWeather />

      <Footer />
    </div>
  );

  
}

export default App;
