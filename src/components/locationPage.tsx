import React, {useEffect, useState} from 'react';
import {ApolloClient, InMemoryCache, gql, useQuery} from '@apollo/client'
import {RouteComponentProps} from 'react-router'
import {match} from "react-router-dom"
import '../index.css'

interface Props extends RouteComponentProps {
    locationName: string
}

export const LocationPage: React.FC<Props> = (props) => {
    const [data, setData] = useState({})

    useEffect(() => {
        console.log(props.match.params['name'])

        const client = new ApolloClient({
            uri: 'http://localhost:4000/graphql',
            cache: new InMemoryCache()
        })
    
        const GET_DATA = gql
        `
            query {
                locationHistory(location: "${props.match.params['name']}")
                {
                    population_0
                    population_1
                    population_2
                    population_3
                    population_4
                    population_5
                    population_6
                    population_7
                    population_8
                    population_9
                    population_10
                    population_11
                    population_12
                    population_13
                    population_14
                    population_15
                    population_16
                    population_17
                    population_18
                    population_19
                    population_20
                    population_21
                    population_22
                    population_23
                }
            } 
        `
        client
            .query({query: GET_DATA})
            .then(result => setData(result.data.locationHistory))
        
    }, [setData])
    
    if ((Object).keys(data).length > 0) {
        console.log(data)
        console.log(data['population_14'])
        return <div>Placeholder</div>
    }
    else
        return <div>Fetching...</div> 
}

//Add graphs to this page
//Stylize everything