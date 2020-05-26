import React from 'react';


export const DayWeather = props => {
   let { weather, temperature, title } = props
   console.log(weather, temperature, title);

   return (
      <div className="card text-white bg-success mb-2 col-3" style={{maxWidth: '18%', margin: "1%"}}>
         <div className="card-header">{title}</div>
         <div className="card-body">
            <h5 className="card-title"><i className='fa fa-thermometer'></i> {temperature}</h5>
            {weather && <p className="card-text">{weather}</p>}
         </div>
      </div>
   );
}