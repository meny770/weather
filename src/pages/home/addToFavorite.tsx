import React from 'react';
import { AppState } from '../../AppState';
import { observer } from 'mobx-react';


export const AddToFavorite = observer((props: { store: AppState }) => {
   const { favoriteCities, cityName, color, deleteCityFromFavorite, setNewCityToFavorite,} = props.store;

   let addToFavorite;
   const cityAlreadySaved = favoriteCities.find(city => city.cityName === cityName);

   if (cityAlreadySaved) {
      addToFavorite = <div className='col-3' style={{ textAlign: "right" }}>
                        <button type="button" 
                                 className={`btn btn-outline-${color}`} 
                                 onClick={deleteCityFromFavorite}>
                              <i className='fa fa fa-times'></i>&nbsp;
                              remove from Favorite
                        </button>
                     </div>
   } else {
      addToFavorite = <div className='col-3' 
                           style={{ textAlign: "right" }}>
                        <button type="button" 
                                 className={`btn btn-outline-${color}`}
                                 onClick={setNewCityToFavorite}>
                              <i className='fa fa-thumb-tack'></i>&nbsp;
                              Add to Favorite
                        </button>
                     </div>
   }
   
   return (addToFavorite);
})