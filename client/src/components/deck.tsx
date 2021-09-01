import React, { useEffect, useState} from 'react';
import { GymCard } from './locationCard'
import axios from 'axios'
import '../index.css'

import 'bootstrap/dist/css/bootstrap.min.css'
import { CardDeck } from 'react-bootstrap'

export const DeckOfLocations: React.FC = () => {
    const [locations, setLocations] = useState({})
    const [userPosition, setUserPosition] = useState({lat: 0, lon: 0})
    const [loaded, setLoaded] = useState(false)

    //Callback fuunction for getCurrentPosition
    function setResponse(data) {
        setLocations(data)
        setLoaded(true)
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
            const findNearest = async () => {
                const locationResponse = await axios.post(`http://localhost:4000/findNearest`, { "latitude": userPosition.lat, "longitude": userPosition.lon })
                setResponse(locationResponse.data)
            }
            findNearest()
        }                
    }, [userPosition])

    /*
    If locations were successfully loaded, return a CardDeck of Card components generated
    by mapping every object in locations. 
    */
    
    if (loaded) {
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