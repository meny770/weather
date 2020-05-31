import React from 'react';
import { WeatherDashboard } from './dashboard';
import { Search } from './search/search';
import { AppState } from '../../AppState';
import { observer } from 'mobx-react';
import { ErrorMassage } from './../../shared/errorMassage';

export const Home = observer((props: { store: AppState }) => {
   return (
      <div>
         <Search store={props.store}></Search>
         <WeatherDashboard store={props.store}></WeatherDashboard>
         <ErrorMassage store={props.store} />
      </div>
   );
})