import React from 'react';
import { DayWeather } from './../../shared/daysWeather';
import { AppState } from '../../AppState';

export const Favorite = (props: {store: AppState}) => {
   
   const { WeatherForFavoriteCities, temperatureType } = props.store
   return(
      <div className="jumbotron">
         <div className="row" > 
            {WeatherForFavoriteCities?.map((WeatherCity, i)=>
               <DayWeather key={i}
               title={WeatherCity.cityName} 
               temperature={WeatherCity.Temperature[temperatureType].Value}
               weather={WeatherCity.WeatherText}/>
            )
            }
         </div>
      </div>
   )
}



