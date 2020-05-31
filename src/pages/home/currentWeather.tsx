import React from 'react';
import { AppState } from '../../AppState';
import { observer } from 'mobx-react';
import { AddToFavorite } from './addToFavorite';
import { apiKey, baseUrl } from '../../shared/weather-api';
import image from '../../images/image.jpg';

export const CurrentWeather = observer((props: { store: AppState }) => {
   const { cityName, temperatureType, currentWeather, cityCode, } = props.store;
   const metric = (temperatureType === 'Metric');
   const temperature = currentWeather?.Temperature?.[temperatureType]?.Value;
   const src = `${baseUrl}/imagery/v1/maps/radsat/480x480/${cityCode}?apikey=${apiKey}`;

   return (
      <div>
         <div className=" row" >
            <img src={image} 
                  alt={`${cityName} satellite`} 
                  width="100" 
                  height='100'>
            </img>
            <div className="media-body col-9" style={{ textAlign: "left" }}>
               <h5 className="mt-0">{cityName}</h5>
               <h5 className="card-title">
                  { metric ? <span>&#8451;</span> : <span>&#8457;</span>}&nbsp;
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