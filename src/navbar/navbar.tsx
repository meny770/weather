import * as React from 'react';
// import { Navbar, Container, Button, Col, Nav, NavDropdown, Form, FormControl}from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AppState } from './../AppState';
import { observer } from 'mobx-react';

export const Header = observer((props: { store: AppState }) =>  {
   const { color } = props.store;
   return(

<nav className={`navbar navbar-expand-lg navbar-light alert-${color}`}>
   <div className="container">
   <div className="navbar-brand">Menachem Mashraki</div>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
    <div className="navbar-nav">
    <Link type="button" id='home-Link' className={`btn btn-${color}`} to='/home' style={{margin: '1px'}}>Home</Link>
    <Link type="button" className={`btn btn-${color}`} to='/favorites' style={{margin: '1px'}}>Favorites</Link>
    <div className="btn-group " role="group">
    <button id="btnGroupDrop1" type="button" className="btn btn-outline-success dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    <i className="fa fa-paint-brush"></i>
    </button>
    <div className={`dropdown-menu alert-${color}`}>
    <ul className='btn-group' aria-labelledby="btnGroupDrop1">
      <li className={`btn btn-${color}`} ></li>
      <li className={`btn btn-danger`} ></li>
    </ul>
    </div>

  </div>
    </div>
  </div>
   </div>
</nav>

   )
})
//       <nav className="navbar navbar-expand-lg navbar-light alert-success" id='menu'>
//          <div className="container">
//          <a className="navbar-brand" href="#">Navbar</a>
//   <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//     <span className="navbar-toggler-icon"></span>
//   </button>
//     <div className="collapse navbar-collapse " id="navbarSupportedContent" style={{width: '60%', float: 'right'}}>

//   <ul className="navbar-nav mr-auto">
//       <li className="nav-item active">
//   <Link type="button" className="btn btn-success float-right" to='/home'>Home</Link>
//   </li>
//   <li className="nav-item active">

//   <Link type="button" className="btn btn-success float-right" to='/favorites'>Favorites</Link>
//   </li>
//   </ul>
//   </div>
//          </div>
  
// </nav>