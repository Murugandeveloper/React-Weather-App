import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import "./App.css";
import Cloud from "./assets/cloud.png";
import Drizzle from "./assets/drizzle.png";
import Humidity from "./assets/humidity.png";
import Search from "./assets/magnifying-glass.png";
import sunImage from "./assets/sun.png";
import Rain from "./assets/rain.png";
import Snow from "./assets/snow.png";
import Wind from "./assets/wind.png";
import Weatherdetails from './componets/Weatherdetails';

// let weatherApi=https://api.openweathermap.org/data/2.5/weather?q=london&appid=86b0e0fea7c7b2ef0f01d8bc1971a625&units=Metric;

const App = () => {
  let apiKey="86b0e0fea7c7b2ef0f01d8bc1971a625";
  const [snowicon, setSnowIcon]=useState(Snow)
  const [temp, setTemp]=useState(0)
  const [city, setCity]=useState("")
  const [country, setCountry]=useState("")
  const [lat, setLat]=useState(0)
  const [log, setLog]=useState(0)
  const [humidityImg, sethumidityImg]=useState(Humidity)
  const [windImg, setWindImg]=useState(Wind)
  const [humidity, setHumidity]=useState(0)
  const [wind, setWind]=useState(0)
  const [inital, setIntial]=useState("Chennai")
  const [loading, setLoading]=useState(false)
  const [dataNotFound, setDataNotFound]=useState(false)
  const [error, setError]=useState(null)

  const weatherIcons={
     "01d":sunImage,
     "01n":sunImage,
     "02d":Cloud,
     "02n":Cloud,
     "03d":Drizzle,
     "03n":Drizzle,
     "04d":Drizzle,
     "04n":Drizzle,
     "09d":Rain,
     "09n":Rain,
     "10d":Rain,
     "10n":Rain,
     "13d":Snow,
     "13n":Snow,
  }

  const inputRef=useRef();
  const weatherApifn=async()=>{
    setLoading(true)
    let weatherApi=`https://api.openweathermap.org/data/2.5/weather?q=${inital}&appid=${apiKey}&units=Metric`;
    try{
      let res=await fetch(weatherApi);
      let data=await res.json();
      // console.log(data)
     if(data.cod==="404"){
      setDataNotFound(true);
      setLoading(false);
      console.error("Check Your City")
      // return
     }
     setTemp(Math.floor(data.main.temp))
     setCity(data.name)
     setCountry(data.sys.country)
     setLat(data.coord.lat)
     setLog(data.coord.lon)
     setHumidity(data.main.humidity)
     setWind(data.wind.speed)
     const weatherDatas=data.weather[0].icon
     setSnowIcon(weatherIcons[weatherDatas] || sunImage)
     setDataNotFound(false)
    }catch(error){
      console.warn("An errour occured:",error.message)
      setError("An error In Fetching Data")
    }finally{
      setLoading(false);
    }
  }

  const handleInput=(e)=>{
      setIntial(e.target.value)
  }

  const handleKey=(e)=>{
    if(e.key ==="Enter") {
      weatherApifn();
    }
  }
 const inputFoucus=()=>{
  inputRef.current.focus()
 }
  

 useEffect(function(){
  weatherApifn();
  inputFoucus();
 },[])

  return (
    <>
    <div className='container'>
      <div className="input-container">
        <input type='text' 
        className='cityInput' 
        placeholder='Search city'
        onChange={handleInput}
        value={inital}
        onKeyDown={handleKey}
        ref={inputRef}
        />
        <div className="search-icon"
        onClick={()=>{
          weatherApifn();
          inputFoucus();
        }}>
          <img src={Search} alt='search' width={25}/>
        </div>
      </div>
      {!loading && !dataNotFound &&<Weatherdetails 
      snowIcon={snowicon} 
      WeTemp={temp} 
      Wecity={city} 
      Wecountry={country} 
      Welat={lat} 
      Welog={log} 
      Wehum={humidityImg} 
      Wewind={windImg}
      Wetexthum={humidity}
      Wetextwind={wind}
      />}
      {loading && <div className="loading server-data">Loading...</div>}
      {error && <div className="error server-data">{error}</div>}
      {dataNotFound &&<div className="null-data server-data">Data Not Found</div>}
    </div>
    </>
  )
}


export default App;