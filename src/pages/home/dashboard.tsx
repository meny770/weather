import React from 'react';
import { DayWeather } from '../../shared/daysWeather';
import { AppState } from '../../AppState';
import { observer } from 'mobx-react';

const test = [
   { day: "Sun", temp: 30, weather: "clouds" },
   { day: "Mon", temp: 30, weather: "---" },
   { day: "Tue", temp: 30, weather: "---" },
   { day: "Wed", temp: 30, weather: "---" },
   { day: "Thu", temp: 30, weather: "---" },
]

export const WeatherDashboard = observer((props: { store: AppState }) => {
   let { cityName, currentWeather, dailyForecasts, setNewCityToFavorite } = props.store

   return (
      <div className="jumbotron container alert-success">
         <div className=" row" >
            <div className="card text-white bg-success col-1"><i className='fa fa-cloud'></i></div>
            <div className="media-body col-9" style={{ textAlign: "left" }}>
               <h5 className="mt-0">{cityName}</h5>
               <h5 className="card-title"><i className='fa fa-thermometer'></i> {currentWeather?.Temperature?.Metric?.Value}</h5>
            </div>
            <div className='col-3' style={{ textAlign: "right" }}>
               <i className='fa fa-thumb-tack'></i>&nbsp; &nbsp;
            <button type="button" className="btn btn-outline-success" onClick={setNewCityToFavorite}>Add to Favorite</button>
            </div>
         </div>
         <h1 className="mt-0">{currentWeather?.WeatherText}</h1>

         <hr className="my-5" />
         <div className="row">
            {dailyForecasts.map((item, i) =>
                (<DayWeather key={i}
                  title={item.day.slice(0, 3)}
                  temperature={item.maxTemperature}
               />)
            )}
         </div>
      </div>
   );
})