// const weatherAPI="60ea3<8f07fd15b92a1r068775fb01ca"
const locationBtn = document.querySelector(".locationBtn");
const locationBtncurrent = document.querySelector(".locationBtncurrent");
const cityform = document.querySelector("#cityform");
const errorText = document.querySelector(".errorText");
const locationStatus = document.querySelector(".locationStatus");
const weather__icon=document.querySelector(".weather__icon");
const currentCity = document.querySelector(".currentCity");
const temp = document.querySelector(".temp");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
const date = document.querySelector(".date");
const time = document.querySelector(".time");
const desc = document.querySelector(".desc");
const week = document.querySelector(".week");
const weather_body = document.querySelector(".weather__body")



let city;
let states;

weather_body.style.display="none"
errorText.innerText ="please allow Locatoion permission in your device  to see your current position weather data or insert city name you want to see weather data"

locationBtn.addEventListener('click',()=>{
  cityform.style.display="block"
  locationBtncurrent.style.display='block'
  locationBtn.style.display='none'

})
locationBtncurrent.addEventListener('click',()=>{
    cityform.style.display="none"
    locationBtncurrent.style.display='none'
    locationBtn.style.display='block'
    currentWeather()
    locationStatus.innerText="your location"

})

const currentWeather=()=>{
    week.innerHTML=""
    let long;
    let lat;
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition
      ((position)=>{
        long=position.coords.longitude;
        lat=position.coords.latitude;
        weather_body.style.display="block"
        errorText.innerText=""
        result(long,lat)
        weeklyResult(long,lat)
        
          
      })}

      else{
      weather_body.style.display="none"
      errorText.innerText = "please Allow location In your Device Or Insert City home You Want To See Weather Data" 
    
      } }

window.addEventListener("load",()=>{
currentWeather()})

const weatherAPI="9b79d7876426b0d7f2e2231d04b96674"


const result=(long,lat)=> {
fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${weatherAPI}&units=metric`)
.then((response)=> {
  return response.json()
})
  .then((data)=>{
  temp.innerText=data.main.temp
  humidity.innerText=data.main.humidity
  wind.innerText=data.wind.speed
  desc.innerText=data.weather[0].description
  const iconId=data.weather[0].icon
  const icon=iconId[0]+iconId[1]+'d'
  weather__icon.innerHTML= `<img src="./icons/${icon}.svg" alt="" />`
  
  })
}
  
  const currentTime=()=>{
  const currentDate=new Date()
  date.innerText=currentDate.toDateString()
  time.innerText=currentDate.toLocaleTimeString()
  }
  currentTime()
    

  cityform.addEventListener("submit",(e)=>{
    e.preventDefault()
    week.innerHTML=""
  
    city=e.target.city.value
    states=e.target.state.value
    fetch(` https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=7&appid=${weatherAPI}`)
   
    .then((response)=>{
      return response.json()
    }) .then((data)=>{
      if(data.length|=0){
        weather_body.style.display="block"
        errorText.innerText=""

        if(e.target.state.value==""){
          locationStatus.innerText=data[0].name + '/'+ data[0].state
          long=data[0].lon
          lat=data[0].lat
          result(long,lat)
          weeklyResult(long, lat)}
        else{

      
         data.map((city)=>{
          let apiState=(city.state) && (city.
            state).toUpperCase()
            const currentState=e.target.state.value
            if(apiState==(currentState.toUpperCase())){
            
              locationStatus.innerText=city.name+'/'+city.state
              long=city.lon;
              lat=city.lat
              result(long,lat)
              weeklyResult(long, lat)
        }})}

         }
       })
    
        })
  

      const weathericon = (weathercode) => {
        if (weathercode === 0) {
          return "01d";
        } else if (weathercode === 1 || weathercode === 2 || weathercode === 3) {
          return "02d";
        } else if (weathercode === 45 || weathercode === 48) {
          return "03d";
        } else if (
          weathercode === 51 ||
          weathercode === 53 ||
          weathercode === 55 ||
          weathercode === 56 ||
          weathercode === 57
        ) {
          return "04d";
        } else if (
          weathercode === 61 ||
          weathercode === 63 ||
          weathercode === 65 ||
          weathercode === 66 ||
          weathercode === 67 ||
          weathercode === 80 ||
          weathercode === 81 ||
          weathercode === 82
        ) {
          return "09d";
        } else if (weathercode === 80 || weathercode === 81 || weathercode === 82) {
          return "10d";
        } else if (
          weathercode === 71 ||
          weathercode === 73 ||
          weathercode === 75 ||
          weathercode === 77 ||
          weathercode === 85 ||
          weathercode === 86
        ) {
          return "13d";
        } else if (weathercode === 95 || weathercode === 96 || weathercode === 99) {
          return "11d";
        }
      };
    const weeklyResult=(long,lat)=>{
      // console.log(long)
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto`)

    .then(response=>{
      return response.json()
    }).then((data)=>{

     
   
    const arr=[0,1,2,3,4,5,6]
    const weekday = ['Sun','Mon','Tue','Wed','Thu','Fri','sat'];
    const day =new Date()
    const today=day.getDay()
    

    arr.map((x)=>{
      return week.innerHTML+=`<div class="week_day">
      <div class="day">${(today+x<7)?weekday[today+x]
      :weekday[today+x-7]}</div>
         <div class="day_icon">
         <img src="./icons/${(weathericon(data.daily.
          weathercode[x]))}.svg" alt="" srcset="" id="weather-icon" />
        </div>
        <div class="day_temp">
          <div class="day_temp_high">${data.daily.
          temperature_2m_max[x]}&deg;</div>
           <div class="day_temp_low">${data.daily.
           temperature_2m_min[x]}&deg;</div>
           
         
          </div>
         </div>`
          })
        })}
  