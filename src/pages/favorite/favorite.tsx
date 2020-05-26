import React from 'react';
import { DayWeather } from './../../shared/daysWeather';
import { AppState } from '../../AppState';
import { observer } from 'mobx-react';

export const Favorite = observer((props: {store: AppState}) => {
   
   const { WeatherForFavoriteCities, temperatureType } = props.store
   console.log(WeatherForFavoriteCities)
   return(
      <div className="jumbotron">
         <div className="row" > 
            {WeatherForFavoriteCities?.map((WeatherCity)=>
               <DayWeather key={WeatherCity.cityCode}
               cityCode={WeatherCity.cityCode}
               title={WeatherCity.cityName} 
               cityName={WeatherCity.cityName} 
               temperature={WeatherCity.Temperature[temperatureType].Value}
               weather={WeatherCity.WeatherText}
               store={props.store}/>
            )
            }
         </div>
      </div>
   )
})



