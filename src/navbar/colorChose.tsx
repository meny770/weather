import React from 'react';
import { observer } from 'mobx-react';
import { AppState } from '../AppState';


export const ColorChose = observer((props: { store: AppState }) => {
   const { color, } = props.store;
   const colors = ["primary", "secondary", "success", "danger", "warning", "info", "dark"]

   return ( 
      <div className="btn-group " role="group">
         <button id="btnGroupDrop1" type="button" className={`btn btn-outline-${color} dropdown-toggle`} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{margin: '1px'}}>
            <i className="fa fa-paint-brush"></i>
         </button>
         <div className={`dropdown-menu alert-${color}`}>
            {colors.map(color => 
            <button className={`btn btn-${color} col-12`} 
                     onClick={() => props.store.color = color}></button>)}
         </div>
      </div>
   )
})