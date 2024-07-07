import FutureWeather from './components/FutureWeather';
import Footer from './components/Footer';
import bgVideo from './assets/bg.mp4';
import './App.css';

function App() {
  return (
    <div className="app-wrapper">
      <div>
        <video autoPlay loop muted className="video-bg">
          <source src={bgVideo} type="video/mp4" />
        </video>
      </div>
      <div className="content">
        <div className="flex justify-center w-screen align-center mx-auto h-screen">
          <FutureWeather />
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
