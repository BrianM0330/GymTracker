import * as React from "react"
import { useState, useEffect } from "react"
import { Button, Card } from "react-bootstrap"
import axios from "axios"
import { useHistory } from "react-router-dom"

interface Props {
  nearbyLocations: Object
  locationName: string
  locationURL: string
}

export const GymCard: React.FC<Props> = (props) => {
  const history = useHistory()

  const [fetchTime, setFetchTime] = useState<string>("")
  const [cardData, setCardData] = useState({
      person_count: 0,
      percent_capacity: 0,
      hours_open: ""
  })

  useEffect(() => {
    setFetchTime(new Date().toLocaleTimeString("en-US"))

    const asyncFetch = async () => {
      const response = await axios.get(
        `http://localhost:4000/api/${props.locationName.replace(" ", "-").toLocaleLowerCase()}`
      )

      setCardData({
          person_count: response.data.occupancy.current,
          percent_capacity: response.data.occupancy.percentage,
          hours_open: response.data.hours.description
      })
    }
    
    asyncFetch()
  }, [])

  function clickHandler() {
    history.push({
      pathname: `/location/${props.locationName.replace(" ", "-")}`,
      state: props.nearbyLocations,
    })
  }

  return (
    <Card className={cardData.percent_capacity >= 50 ? 'riskyCard' : 'safeCard'}>
      <Card.Title>
        {props.locationName}: {cardData.person_count}
      </Card.Title>
      <Card.Subtitle>Last checked at {fetchTime}</Card.Subtitle>
      <Card.Body>
        This location currently has {cardData.person_count} people ({cardData.percent_capacity}%)
      </Card.Body>
      <Card.Body>{cardData.hours_open}</Card.Body>
      <Button onClick={clickHandler}>View Details</Button>
    </Card>
  )
}
