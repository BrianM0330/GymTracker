import * as React from "react"
import {useState, useEffect} from "react"
import axios from 'axios'

interface Props {
    lastFetch: string,    
    locationName: string,
    locationURL: string,
}

export const Gym: React.FC<Props> = (props) => {
    const [count, setCount] = useState<number>()
    
    useEffect(() => {
        console.log('Fetching...')
        const asyncFetch = async () => {
            const apiFetch = await axios.get(props.locationURL)
            setCount(apiFetch.data.occupancy.current)
        }
        asyncFetch()
        // setCount(result.data)
    }, [])

    return (
        <div>
            <h1> {props.locationName} </h1>
            <div> Amount as of {props.lastFetch}: {count}</div>
        </div>
    )
}