import logo from './cloudy.png';
import './App.css';
import { IoMdSearch } from "react-icons/io";
import { IoSearchCircle } from "react-icons/io5";
import { useState, useEffect } from 'react';



function App() {

  const [searchweather, setSearchweather] = useState("")
  const [weatherData, setWeatherData] = useState(null)
  const [dailyData, setDailyData] = useState(null)
  const [currentData, setCurrentData] = useState(null)
  const [searchClicked, setSearchClicked] = useState(false);



  const searchWeather = async (e) => {
    e.preventDefault();
    console.log('button clicked');
    console.log(searchweather);
  
  
    try {
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${searchweather}&appid=dbd2ac54578f5c6a770906d11e303fd2`;
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      setWeatherData(data);
      console.log("setWeatherData", setWeatherData);

      setSearchClicked(true);


    } catch (error) {
      console.error('Error:', error.message);
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchweather}&appid=dbd2ac54578f5c6a770906d11e303fd2`;
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      setCurrentData(data);
      console.log("currentData", currentData);

    } catch (error) {
      console.error('Error:', error.message);
    }
    
  };


  useEffect(() => {
    if (weatherData) {
      const dilyData = weatherData.list.filter((forecast, index) => index % 8 === 0);
      setDailyData(dilyData);
    }
  }, [weatherData]);
  
  const handleInputChange = (e) => {
  setSearchweather(e.target.value)
  }


  return (
    <div className="App">
      <header className="App-header">
      <h1 className="app-title">Weather App</h1> 

       <div className='searchbar'>
        <input 
        type="text" 
        id="inputweather" 
        name="weather_input" 
        placeholder='Search a city or place'
        value={searchweather}
        onChange = {handleInputChange}/>
        <IoSearchCircle className='searchicon' onClick={searchWeather}/>
       </div>

 
      {searchClicked && weatherData && currentData && (
          <div className='current-forecast'>
            <div className='current-forecast-name'>
              <p> {currentData.name} </p>
              <p>
                  {(currentData.main.temp - 273.15).toFixed(2)} &deg;C&nbsp;/&nbsp;
                  {((currentData.main.temp - 273.15) * 9/5 + 32).toFixed(2)} &deg;F
              </p>

            </div>
           
            <div className='current-image'>
              <img src={`https://openweathermap.org/img/wn/${currentData.weather[0].icon}@2x.png`} className='imgClass' id="img" alt="Weather Logo" />
            </div>
           
            <div className='current-forecast-details'>
              <p className="small">Humidity : {currentData.main.humidity}</p>
              <p className="small">Wind : {currentData.wind.speed}</p>
              <p className="small">Pressure : {currentData.main.pressure}</p>
            </div>

          </div>
        )} 

      

        
      {searchClicked && weatherData && dailyData && (
        <div className='week-forecast'>
          {dailyData.map((dailyForecast, index) => (
          <div className='daily-forecast' key={index}>
            <div className='image'>
              <img src={`https://openweathermap.org/img/wn/${dailyForecast.weather[0].icon}@2x.png`} className='imgClass' id="img" alt="Weather Logo" />
            </div>
            <div className='p-element'>
              <p className='p-element'>{new Date(dailyForecast.dt_txt).toLocaleDateString('en-US', { weekday: 'long' })}</p>
              <p className='min-temp'>min temp is : {(dailyForecast.main.temp_min - 273.15).toFixed(2)} &deg;C</p>
              <p className='max-temp'>max temp is : {(dailyForecast.main.temp_max - 273.15).toFixed(2)} &deg;C</p>
            </div>
         
          </div>
          ))}
       </div> 
      )}

      </header>
    </div>
  );
}

export default App;
