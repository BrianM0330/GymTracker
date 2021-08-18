import React, { useEffect, useState, Component } from 'react';
import { GymCard } from './locationCard'
import axios from 'axios'
import '../index.css'

import 'bootstrap/dist/css/bootstrap.min.css'
import { CardDeck } from 'react-bootstrap'

export const DeckOfLocations: React.FC = () => {
    const PORT = process.env.PORT || 4000
    const [locations, setLocations] = useState({})
    const [userPosition, setUserPosition] = useState({lat: 0, lon: 0})

    //Callback fuunction for getCurrentPosition
    function setResponse(data) {
        setLocations(data)
    }

    // When both coordinates are loaded, call server endpoint to get closest locations using the distance formula.
    useEffect(() => {
        if (navigator.geolocation) {

            navigator.geolocation.getCurrentPosition((pos) =>{

                const newUserPos = { 
                    lat: pos.coords.latitude,
                    lon: pos.coords.longitude,
                };

                setUserPosition(newUserPos) // store data in usestate
            });
        }
    }, [])

    useEffect(() => {
        if (userPosition.lat != 0) {
            const findNearest = () => {
                axios
                    .post(`/findNearest`, { "latitude": userPosition.lat, "longitude": userPosition.lon })
                    .then(res => (setResponse(res.data)))
                    .then(() => console.log('Successfully received locations from API'))
                    .catch(err => console.log(err))
            }
            findNearest()
        }                
    }, [userPosition])

    /*
    If locations were successfully loaded, return a CardDeck of Card components generated
    by mapping every object in locations. 
    */
    
    if ((Object).keys(locations).length > 0) {
        return (
            <div>
                <CardDeck>
                    {Object.keys(locations).map(function (key, index) {
                        return (
                            <GymCard
                                key={index}
                                nearbyLocations={locations}
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
                There are no locations nearby or the app was unable to connect
            </div>
        )
    }
}