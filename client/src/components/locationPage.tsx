import React, {useEffect, useState} from 'react';
import {ApolloClient, InMemoryCache, gql} from '@apollo/client'
import {RouteComponentProps, StaticContext} from 'react-router'
import {ColumnChart} from "@toast-ui/react-chart"
import 'tui-chart/dist/tui-chart.css'
import '../index.css'

type Props = RouteComponentProps<{}, StaticContext, {from: {pathname: String}}>

export const LocationPage: React.FC<Props> = (props) => {
    const [data, setData] = useState({})
    const [loaded, setLoaded] = useState(false)


    const client = new ApolloClient({
        uri: `/graphql`,
        cache: new InMemoryCache({
            addTypename: false //Removes '__typename' key from the query result
        })
    })

    const labels: string[] = [
        "12 AM", "1 AM", "2 AM", "3 AM",
        "4 AM", "5 AM", "6 AM", "7 AM", 
        "8 AM", "9 AM", "10 AM", "11 AM", 
        "12 PM", "1 PM", "2 PM", "3 PM", 
        "4 PM", "5 PM", "6 PM", "7 PM", 
        "8 PM", "9 PM", "10 PM", "11 PM", 
    ]

    //Builds the initial GQL query. This query fetches data for all nearby locations so the user can visually see the difference.
    function buildQuery(): string {
        let query = ""
        for (var loc in props.location.state) {
            const template = `
                ${loc.replace("-", "")}: locationHistory(location: "${loc}") {
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
            `

            query = query.concat(template)
        }

        return `query{${query}}`
    }

    useEffect(() => {
        const query = gql`${buildQuery()}`

        client
            .query({query: query})
            .then(result => setData(result.data))
        setLoaded(true)
    }, [])

    if (loaded) {
        const primaryLocationName = props.match.params['name']
                                    .replace('-', ' ')
                                    .toLowerCase()
                                    .split(' ')
                                    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                                    .join(' ')

        let seriesArray: [{ name: string; data: number[] }] = [{ name: "", data: [] }]
        seriesArray.pop() //Removes the empty value after initialization

        for (let key in data) {
            seriesArray.push({
                name: key,
                data: Object.values(data[key])
            })
        }

        /*
        https://nhn.github.io/tui.chart/latest/tui.chart
        Chart library docs
        */
        var options = {
            chart: {
                width: window.innerWidth,
                height: window.innerHeight,
                title: {
                    text: `${primaryLocationName} Population History`,
                    align: "center"
                }
            },
            yAxis: {
                title: 'Population count',
            },
            xAxis: {
                title: 'Times',
                pointOnColumn: true
            },
            legend: {
                align: "bottom"
            }
        }

        return (
            <div>
                <ColumnChart 
                    data={{categories: labels, series: seriesArray}}
                    options={options}
                />
            </div>
        )
    }
    else
        return <div>Fetching...</div> 
}