import React from 'react'
 

export const AutoComplete = props => {
   const { openAutocomplete, searchAutocomplete, inputValue, setInputValue} = props;
   return (
      <div style={{display: openAutocomplete}}>
         {(inputValue.split('').length>0) 
         && searchAutocomplete.map((city, i) =>
            <button key={i} 
                     type="button"
                     className="list-group-item list-group-item-action" 
                     onClick={ ()=> setInputValue(city.cityName)}>
               {city.cityName}
            </button>
         )}
      </div>
  )
}