import * as React from 'react';
import {ApolloClient, InMemoryCache, gql} from '@apollo/client'

import axios from  'axios'
import '../index.css'

interface Props {
    locationName: string
}

export const DetailedPage: React.FC<Props> = (props) => {

    const client = new ApolloClient({
        uri: 'http://localhost:4000/graphql',
        cache: new InMemoryCache()
    })

    const populationQuery = gql
    `
        query {
            locationHistory(location: ${props.locationName})
            {
                population_8
                population_9
                population_10
                population_11
                population_12
                population_13
                population_14
                population_15
                population_16
            }
        } 
    `

    client.query({
        query: populationQuery
    })
    return <div></div>
}

//Add graphs to this page
//Stylize everything