import React from 'react';
import { AppState } from '../../AppState';
import { observer } from 'mobx-react';
import { FavoriteList } from './favoriteList';
import { ErrorMassage } from '../../shared/errorMassage';

export const Favorite = observer((props: {store: AppState}) => {
   
   return(
      <div >
        <FavoriteList store={props.store}/>
        <ErrorMassage store={props.store} favorite={true}/>
      </div>
   );
})



