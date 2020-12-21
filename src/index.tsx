import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import {DeckOfLocations} from './components/deck'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { CardDeck } from 'react-bootstrap';

ReactDOM.render(
  //Deck of cards with location data from card components gets rendered.
  <DeckOfLocations />, document.getElementById('root')
);