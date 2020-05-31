import React from 'react';
import { ShowWeather } from '../../shared/showWeather';
import { AppState } from '../../AppState';
import { observer } from 'mobx-react';
import { CurrentWeather } from './currentWeather';


export const WeatherDashboard = observer((props: { store: AppState }) => {
   const { dailyForecasts, color, } = props.store

   return (
      <div className={`jumbotron container alert-${color}`}>

         <CurrentWeather store={props.store}/>

         <hr className="my-5" />

         <div className="row">
            {dailyForecasts.map((item, i) =>
                (<ShowWeather key={i}
                  title={item.day.slice(0, 3)}
                  temperature={item.maxTemperature}
                  store={props.store}
               />)
            )}
         </div>
      </div>
   );
})