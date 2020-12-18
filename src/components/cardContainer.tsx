import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom'
import {Gym} from './locationCard'
import axios from 'axios'
import '../index.css'

import 'bootstrap/dist/css/bootstrap.min.css'
import {Card, Button, CardDeck} from 'react-bootstrap'

export const Container: React.FC = () => {
    const [locations, setLocations] = useState(Object)
    const [latitude, setLatitude] = useState(Number)
    const [longitude, setLongitude] = useState(Number)

    function setLocation(data) {
        setLatitude(data.coords.latitude)
        setLongitude(data.coords.longitude)
    }

    function setResponse(data) {
        setLocations(data)
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(setLocation)
        
        //START AXIOS STUFF
        if (latitude && longitude) {
            const findNearest = () => {
                axios
                .post('http://localhost:4000/findNearest', {"latitude": latitude, "longitude": longitude})
                .then(res => (setResponse(res.data)))
                .then(res => console.log('Successfully received locations from server'))
                .catch(err => console.log(err))
            }
            findNearest()
        }
    }, [longitude, setLocations])

    console.log('Locations', locations)

    return (
        <div>
            ERROR PLACEHOLDER
        </div>
    )
}