import * as React from "react"
import {useState, useEffect} from "react"
import axios from 'axios'

interface Props {
    locationName: string,
    locationURL: string,
}

export const Gym: React.FC<Props> = (props) => {
    const [count, setCount] = useState<number>()
    const [fetchTime, setFetchTime] = useState<string>()
    const [percentCapacity, setPercentCapacity] = useState<number>()
    const [hoursOpen, setHoursOpen] = useState<string>()
    
    useEffect(() => {
        console.log('Fetching...')
        var d = new Date()
        setFetchTime(d.toLocaleTimeString('en-US'))
        const asyncFetch = async () => {
            const apiFetch = await axios.get(props.locationURL)
            setCount(apiFetch.data.occupancy.current)
            setPercentCapacity(apiFetch.data.occupancy.percentage)
            setHoursOpen(apiFetch.data.hours.description)
        }
        asyncFetch()
        // setCount(result.data)
    }, [])

    return (
        <div>
            <h2>{props.locationName} - {percentCapacity}%</h2>
            <div># of people: {count}</div>
            <div>Last checked: {fetchTime}</div>
            <br/>
            <div> 
                Current Hours<br/>{hoursOpen}
            </div>
        </div>
    )
}