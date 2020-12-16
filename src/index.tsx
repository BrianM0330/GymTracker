import React from 'react';
import ReactDOM from 'react-dom';
import {Gym} from './components/locationCard'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'

ReactDOM.render(
  <div>
    <Gym 
      // lastFetch={"Recently"} 
      locationName={"Cicero"} 
      locationURL={"http://localhost:4000/cicero"}
    />,
    <Gym 
    // lastFetch={"Recently"} 
    locationName={"Forest Park"} 
    locationURL={"http://localhost:4000/forest-park"}
    />
</div>, 
  document.getElementById('root')
);