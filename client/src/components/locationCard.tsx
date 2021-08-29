import * as React from "react"
import {useState, useEffect} from "react"
import {Button, Card} from 'react-bootstrap'
import axios from 'axios'
import { useHistory } from "react-router-dom"

interface Props {
    nearbyLocations: Object,
    locationName: string,
    locationURL: string,
}

export const GymCard: React.FC<Props> = (props) => {
    const history = useHistory()

    const [count, setCount] = useState<number>()
    const [fetchTime, setFetchTime] = useState<string>()
    const [percentCapacity, setPercentCapacity] = useState<number>()
    const [hoursOpen, setHoursOpen] = useState<string>()
    
    useEffect(() => {
        var d = new Date()
        setFetchTime(d.toLocaleTimeString('en-US'))
        const asyncFetch = async () => {
            const apiFetch = await axios.get(`http://localhost:4000/api/${props.locationName.replace(" ", "-").toLocaleLowerCase()}`)
            setCount(apiFetch.data.occupancy.current)
            setPercentCapacity(apiFetch.data.occupancy.percentage)
            setHoursOpen(apiFetch.data.hours.description)
        }
        asyncFetch()
    }, [])

    function clickHandler() {
        history.push({pathname: `/location/${props.locationName.replace(' ', '-')}`, state: props.nearbyLocations})
    }


    return (
        //@ts-ignore
        <Card border={percentCapacity >= 30 ? "danger" : "success"}>
            <Card.Title>{props.locationName}: {count}</Card.Title>
            <Card.Subtitle>Last checked at {fetchTime}</Card.Subtitle>
            <Card.Body>This location currently has {count} people ({percentCapacity}%)</Card.Body>
            <Card.Body>{hoursOpen}</Card.Body>
            <Button onClick={clickHandler}>View Details</Button>
        </Card>
    )
}