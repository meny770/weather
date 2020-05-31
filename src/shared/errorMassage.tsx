import React, { useEffect } from 'react';
import { AppState } from '../AppState';
import { observer } from 'mobx-react';


export const ErrorMassage = observer( (props: { store: AppState, favorite?: boolean}) => {
   const { homeErrorMassage, favoriteErrorMassage } = props.store;
   let errorMassage = props.favorite ? favoriteErrorMassage: homeErrorMassage;

   const resetMassage = () => {
      props.favorite
      ?props.store.favoriteErrorMassage = ""
      : props.store.homeErrorMassage = "";
   }

   let alertErrorMassage;
   if (errorMassage) {
      alertErrorMassage = <div className="container alert alert-danger alert-dismissible fade show" role="alert">
                              <strong>Error: </strong> {errorMassage}
                              <button type="button" 
                                       className="close" 
                                       data-dismiss="alert" 
                                       aria-label="Close"
                                       onClick={resetMassage}>
                                 <span aria-hidden="true">&times;</span>
                              </button>
                           </div>
   } else {
      alertErrorMassage = <span></span>
   }

   // useEffect(() => {
   //    return resetMassage;
   // },[]);

   return (alertErrorMassage);
})

