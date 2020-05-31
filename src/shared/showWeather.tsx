import React from 'react';
import { observer } from 'mobx-react';


export const ShowWeather = observer(props => {
   let { weather, temperature, title ,cityCode, cityName,  store,} = props 
   const hover = store?.getWeather? 'btn': '';
   const metric = (store.temperatureType === 'Metric')

   return (
      <div className={`${hover} text-white bg-${store.color} mb-2 col-11 col-sm-2 text-center`} style={{margin: '1.65%'}}
         onClick={() => {
            if(weather) {
               console.log(cityCode)
               store.cityCode = cityCode
               store.cityName = cityName
               store.getWeather();
               window.document.getElementById('home-Link')?.click();
            }
         }}>
         <div>{title}</div>
         <hr className="my-2" />
         <h5 className="card-title">
            { metric ? <span>&#8451;</span> : <span>&#8457;</span>}&nbsp;
            {temperature}
         </h5>
         {weather && <p className="card-text">{weather}</p>}
      </div>
   );
})
