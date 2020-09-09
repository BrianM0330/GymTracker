import React from 'react';
import ReactDOM from 'react-dom';
import {Gym} from './components/individual'

ReactDOM.render(
  <Gym 
    lastFetch={"Recently"} 
    locationName={"Cicero"} 
    locationURL={"http://localhost:4000/cicero"}
  />,
  document.getElementById('root')
);