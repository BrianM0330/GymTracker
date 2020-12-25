import React, { useEffect, useState } from 'react';
import { GymCard } from './locationCard'
import axios from 'axios'
import '../index.css'

import 'bootstrap/dist/css/bootstrap.min.css'
import { CardDeck } from 'react-bootstrap'

export const DeckOfLocations: React.FC = () => {
    const [locations, setLocations] = useState({})
    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)

    //Helper function to set coordinates using state
    function setLocation(data) {
        setLatitude(data.coords.latitude)
        setLongitude(data.coords.longitude)
    }

    //Callback fuunction for getCurrentPosition
    function setResponse(data) {
        setLocations(data)
    }

    // When both coordinates are loaded, call server endpoint to get closest locations using the distance formula.
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(setLocation)

        if (latitude && longitude) {
            const findNearest = () => {
                axios
                    .post('http://localhost:4000/findNearest', { "latitude": latitude, "longitude": longitude })
                    .then(res => (setResponse(res.data)))
                    .then(() => console.log('Successfully received locations from server'))
                    .catch(err => console.log(err))
            }
            findNearest()
        }
    }, [longitude, setLocations])

    /*
    If locations were successfully loaded, return a CardDeck of Card components generated
    by mapping every object in locations. 
    */

   function clickHandler() {console.log("BUTTON CLICKED")}

    if ((Object).keys(locations).length > 0) {
        return (
            <div>
                <CardDeck>
                    {Object.keys(locations).map(function (key, index) {
                        return (
                            <GymCard
                                key={index}
                                pageFunction={clickHandler}
                                locationName={key.replace("-", " ")}
                                locationURL={locations[key].url}
                            />
                        )
                    })
                    }
                </CardDeck>
            </div>
        )
    }
    else {
        return (
            <div>
                LOADING PLACEHOLDER
            </div>
        )
    }
}