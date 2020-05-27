import React from 'react';
import { observer } from 'mobx-react';
import { AppState } from '../../../AppState';
import { AutoComplete } from './autocomplete'

export const Search = observer((props: { store: AppState }) => {
  const { searchAutoComplete: searchAutocomplete, color, search, } = props.store

  const [openAutocomplete, setOpenAutocomplete] = React.useState('none');
  const [inputValue, setInputValue] = React.useState('');

  const debounce = (timer: number, value: string, action: Function) => {
      setTimeout(() => 
      action(value)
    , timer)
  }

  const CatchTheChosenCity = () => {
    searchAutocomplete.find(city => {
      if (city.cityName === inputValue) {
        props.store.cityName = city.cityName
        props.store.cityCode = city.cityCode
        props.store.getWeather()
      }
    })
  }

  const OnChange = (event) => {
    setInputValue(event.target.value);
    debounce(1000, event.target.value , search)
  }

  let searchStyle = {
    overflow: 'visible', 
    height: '40px', 
    zIndex: 1000, 
    margin: '20px auto', 
    textAlign: 'left',
  } as React.CSSProperties

  return (
    <div className="col-12" >
      <form className="form-inline my-2 my-lg-0">
        <div style={searchStyle} >
        <input className={`form-control mr-sm-2 border-${color}`}
              type="search" 
              placeholder="Search" 
              aria-label="Search" 
              value={inputValue} 
              onChange={OnChange} 
              onFocus={() => setOpenAutocomplete('block')} 
              onBlur={() => debounce(1000, "none" , setOpenAutocomplete)}/>

          <button className={`btn btn-outline-${color} my-2 my-sm-0`}
                type="button" 
                onClick={CatchTheChosenCity}>
            <i className="fa fa-search"></i>
          </button>
          <AutoComplete openAutocomplete={openAutocomplete} 
                        searchAutocomplete={searchAutocomplete} 
                        inputValue={inputValue}
                        setInputValue={setInputValue}
          />
        </div>
      </form>
    </div>
  )
});

