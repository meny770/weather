import React from 'react';
import './App.css';
import { Header } from './navbar/navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Home } from './pages/home/home';
import { Favorite } from './pages/favorite/favorite';
import { AppState } from './AppState';

function App() {
  const store = new AppState()
  store.init();

  return (
    <div className="App">
      <Router>
        <Header />

        <Switch>
          <Route path={'/home'} component={() => <Home store= {store} />} />
          <Route path={'/favorites'} component={() => <Favorite store= {store} />} />

          <Route path={'/'}>
            {() => window.location.replace('/home')}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}


export default App;
