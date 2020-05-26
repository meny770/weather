import React from 'react';
import { observer } from 'mobx-react';
import { AppState } from '../../../AppState';
import ReactAutocomplete from 'react-autocomplete'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { searchLocation } from '../../../shared/weather-api';

export const Search = observer((props: { store: AppState }) => {
  const { searchAutocomplete, searchQuery } = props.store
  // const options = [  { id: 'foo', label: 'foo' },
  // { id: 'bar', label: 'bar' },
  // { id: 'baz', label: 'baz' },] 
  // let timer: any;
  // const [open, setOpen] = React.useState(false);
  // const [loading, setloading] = React.useState(false);
  // const OnClick = () => {
  //   // props.store.cityCode = searchAutocomplete?.find(item => item.LocalizedName === searchQuery).Key
  //   let f = searchAutocomplete.find(item=> item.LocalizedName == searchQuery)
  //   console.log(searchQuery, searchAutocomplete[1], f)
  // }
  const debounce = (timer: number, value: string) => {
      setTimeout(() => {
        // props.store.searchAutocomplete = await searchLocation(value)
        props.store.search(value)
    }, timer)
  }
  const [openAutocomplete, setOpenAutocomplete] = React.useState('none');
  const [inputValue, setInputValue] = React.useState('');
  const [getNewCityLest, setGetNewCityLest] = React.useState(true);
  const Onblur = () => {
    setTimeout(()=>setOpenAutocomplete('none'), 200);
  };
  const Onfocus = () => {
    setOpenAutocomplete('block');
  };

  return (
    <div className="col-12" >
      <form className="form-inline my-2 my-lg-0" style={{zIndex: -1000}}>
        {/* <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/> */}
        
        <div style={{overflow: 'visible', height: '40px', zIndex: 1000, margin: '20px auto', textAlign: 'left'}}>
        <input className="form-control mr-sm-2 border-success" 
              type="search" placeholder="Search" 
              aria-label="Search" 
              value={inputValue} 
              onChange={event=>{
                setInputValue(event.target.value);
                debounce(1000, event.target.value )
              }} 
              onFocus={Onfocus} 
              onBlur={Onblur}/>
        <button className="btn btn-outline-success my-2 my-sm-0" type="button" 
        onClick={() => {
          props.store.searchAutocomplete.find(city=>{
            if(city.cityName === inputValue) {
              console.log(city)
              props.store.cityName = city.cityName
              props.store.cityCode = city.cityCode
              props.store.getWeather()
              
            }
          })
        }}>
          <i className="fa fa-search"></i>
        </button>
  {/* <button type="button" className="list-group-item list-group-item-action active">
    Cras justo odio
  </button> */}
  <div style={{display: openAutocomplete}}>
    {(inputValue.split('').length>0) && props.store.searchAutocomplete.map((city, i) =>
      <button key={i} type="button" className="list-group-item list-group-item-action" 
      onClick={ ()=> setInputValue(city.cityName)}>{city.cityName}</button>
    )}
  
  </div>
  
</div>
        
      </form>



      {/* // <ReactAutocomplete
      //   items={options}
      //   shouldItemRender={(item, value) => {
      //     console.log(item.label)
      //     return item?.label.toLowerCase().indexOf(value.toLowerCase()) > 0
      //   }}
      //   getItemValue={item => item.label}
      //   renderItem={(item, highlighted) =>
      //     <div
      //       key={item.id}
      //       style={{ backgroundColor: highlighted ? '#eee' : 'transparent'}}
      //     >
      //       {item.label}
      //     </div>
      //   }
      //   value={searchQuery}
      //   onChange={e => {
      //     console.log( e.target.value)
      //     props.store.searchQuery = e.target.value
      //     // debounce(500, e.target.value)
      //   }}
      //   onSelect={value =>" this.setState({ value })"}
      // />
    //   {/* <Autocomplete
    //     id="asynchronous-demo"
    //     style={{ width: 400, margin: ' 20px auto 20px auto'}}
    //     open={open}
    //     onOpen={(ev) => {
    //       console.log(ev)
    //       setOpen(true);
    //     }}
    //     onClose={(ev) => {
    //       console.log(ev)
    //       setOpen(false);
    //     }}
    //     getOptionSelected={(option, value) => option.LocalizedName === value.LocalizedName}
    //     getOptionLabel={(option) => option.LocalizedName}
    //     options={searchAutocomplete}
    //     loading={loading}
    //     renderInput={(params) => (
    //       <TextField
    //         {...params}
    //         label="Search"
    //         variant="outlined"
    //         InputProps={{
    //           ...params.InputProps,
    //           onChange: ev => {
    //             const { value } = ev.target
    //             console.log('input', value)
    //             props.store.searchQuery = value;
    //             if (timer) clearTimeout(timer);
    //             timer = setTimeout( () => {
    //                props.store.search(value)

    //             }, 400);
    //           },
    //           endAdornment: (
    //             <React.Fragment>
    //               {loading ? <CircularProgress color="inherit" size={20} /> : null}
    //               {/* {params.InputProps.endAdornment} */}
                   {/* <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={OnClick}>
    //                 <i className='fa fa-search'></i>  
    //               </button>
    //             </React.Fragment>
    //           ),
    //         }}
    //       />
    //     )}
    //   // /> */} 
    </div>
  )
});

