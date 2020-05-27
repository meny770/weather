import React from 'react';
import { AppState } from '../../AppState';
import { observer } from 'mobx-react';
import { AddToFavorite } from './addToFavorite';


export const CurrentWeather = observer((props: { store: AppState }) => {
   const { cityName, temperatureType, currentWeather, } = props.store;
   const metric = (temperatureType === 'Metric');
   const temperature = currentWeather?.Temperature?.[temperatureType]?.Value;
   let icon;

   if(metric) {
      switch (temperature) {
         case 34-50:
            icon = 4;
            break;
         case 18-33:
            icon = 3;
            break;
         case 2-17:
            icon = 2;
            break;
         case -14-1:
            icon = 1;
            break;
         case -30-(-15):
            icon = 0;
            break;
         default:
      }
   } else {
      switch (temperature) {
         case 92-120:
            icon = 4;
            break;
         case 64-91:
            icon = 3;
            break;
         case 36-63:
            icon = 2;
            break;
         case 8-35:
            icon = 1;
            break;
         case -20-7:
            icon = 0;
            break;
         default:
      }
   }
   
   return (
      <div>
         <div className=" row" >
            <h1>
               <i className='fa fa-cloud'></i>
            </h1>
            
            <div className="media-body col-9" style={{ textAlign: "left" }}>
               <h5 className="mt-0">{cityName}</h5>
               <h5 className="card-title">
               { (temperatureType === 'Metric') ? <span>&#8451;</span> : <span>&#8457;</span>}&nbsp;
                  {temperature}
               </h5>
            </div>
            <AddToFavorite store={props.store}/>
         </div>
         <h1 className="mt-0">
            {currentWeather?.WeatherText}
         </h1>
      </div>
     
   )
})