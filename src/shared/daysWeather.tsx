import React from 'react';
import { AppState } from './../AppState';
import { observer } from 'mobx-react';


export const DayWeather = observer(props => {
   let { weather, temperature, title ,cityCode, cityName,  store} = props
   console.log(weather, temperature, title);

   return (
      
         <div className="text-white bg-success mb-2 col-11 col-sm-2 text-center" style={{margin: '1.65%'}}
            onClick={() => {
               if(store.getWeather) {
                  console.log(cityCode)
                  store.cityCode = cityCode
                  store.cityName = cityName
                  store.getWeather();
                  window.document.getElementById('home-Link')?.click();
               }
            }}>
            
            <div>{title}</div>
            <hr className="my-2" />
            <h5 className="card-title"><i className='fa fa-thermometer'></i> {temperature}</h5>
            {weather && <p className="card-text">{weather}</p>}
         </div>
       
   );
})