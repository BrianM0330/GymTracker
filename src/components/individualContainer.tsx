import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom'
import {Gym} from './locationCard'
import axios from 'axios'
import '../index.css'

import 'bootstrap/dist/css/bootstrap.min.css'
import {Card, Button, CardDeck} from 'react-bootstrap'

interface Props {
    latitude: number,
    longitude: number,
}

export const Container: React.FC<Props> = (props) => {
    const [locations, setLocations] = useState<Object>()

    useEffect(() => { //initial fetch to API, gets the object
        const coordsObject = {"latitude": props.latitude, "longitude": props.longitude} //makes request below readable
        axios
            .get('localhost:4000/findNearest', {params: coordsObject})
            .then(res => setLocations(res))
            .catch(err => console.log(err)) //placeholder
        console.log("locations set\n", locations)
    }, [])

    return (
        <div>
        </div>
    )
}