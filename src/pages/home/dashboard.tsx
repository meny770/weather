import React from 'react';
import { ShowWeather } from '../../shared/showWeather';
import { AppState } from '../../AppState';
import { observer } from 'mobx-react';
import { AddToFavorite } from './addToFavorite';


export const WeatherDashboard = observer((props: { store: AppState }) => {
   const { cityName, currentWeather, dailyForecasts, temperatureType, color, } = props.store

   return (
      <div className={`jumbotron container alert-${color}`}>
         <div className=" row" >
            <h1>
               <i className='fa fa-cloud'></i>
            </h1>
            
            <div className="media-body col-9" style={{ textAlign: "left" }}>
               <h5 className="mt-0">{cityName}</h5>
               <h5 className="card-title">
               { (temperatureType === 'Metric') ? <span>&#8451;</span> : <span>&#8457;</span>}&nbsp;
                  {currentWeather?.Temperature?.[temperatureType]?.Value}
               </h5>
            </div>
            <AddToFavorite store={props.store}/>
         </div>
         <h1 className="mt-0">
            {currentWeather?.WeatherText}
         </h1>
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