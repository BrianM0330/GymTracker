import React from 'react';
import ReactDOM from 'react-dom';
import {DeckOfLocations} from './components/deck'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { LocationPage } from './components/locationPage';

class App extends React.Component {
  render () {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={DeckOfLocations}/>
            <Route path="/location/:name" component={LocationPage}/>
          </Switch>
        </div>
      </Router>
    )
  }
}

ReactDOM.render(
  //Deck of cards with location data from card components gets rendered.
  <App />, 
  document.getElementById('root')
);