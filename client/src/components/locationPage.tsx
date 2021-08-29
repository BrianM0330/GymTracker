import React, {useEffect, useState} from 'react';
import {ApolloClient, InMemoryCache, gql} from '@apollo/client'
import {RouteComponentProps, StaticContext} from 'react-router'
import {ColumnChart} from "@toast-ui/react-chart"
import 'tui-chart/dist/tui-chart.css'
import '../index.css'

type Props = RouteComponentProps<{}, StaticContext, {from: {pathname: String}}>

export const LocationPage: React.FC<Props> = (props) => {
    const [data, setData] = useState([{}])

    useEffect(() => {

        const client = new ApolloClient({
            uri: `http://localhost:4000/graphql`,
            cache: new InMemoryCache({
                addTypename: false //Removes '__typename' key from the query result
            })
        })

        for (let location in props.location.state) {
            const _24_hour_data = gql
                `
                    query {
                        locationHistory(location: "${location}")
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
                .query({query: _24_hour_data})
                .then(result => setData(prevState => [...prevState, {[location]: result.data.locationHistory}]))
        }
        
    }, [props.match.params, props.location.state, setData])

    if (data.length === (Object).keys(props.location.state).length+1) {

        const primaryLocationName = props.match.params['name']
                                    .replace('-', ' ')
                                    .toLowerCase()
                                    .split(' ')
                                    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                                    .join(' ')

        let seriesArray: [{
                name: string,
                data: number[]
            }
        ] =  [{name: "", data: []}]
        seriesArray.pop() //Removes the empty value from initialization

        data.map(x => {
            const nameString = Object.keys(x)[0]
            if (nameString) { //Removes the empty {} from initialization in useState
                //@ts-ignore
                const theData: number[] = Object.values(x)[0]

                const toPush = {
                    name: nameString,
                    data: Object.values(theData)
                }
                seriesArray.push(toPush)
            }
        })


        /*
        https://nhn.github.io/tui.chart/latest/tui.chart
        Docs for chart library 
        */
       
        const labels: string[] = [
        "12 AM", "1 AM", "2 AM", "3 AM",
        "4 AM", "5 AM", "6 AM", "7 AM", 
        "8 AM", "9 AM", "10 AM", "11 AM", 
        "12 PM", "1 PM", "2 PM", "3 PM", 
        "4 PM", "5 PM", "6 PM", "7 PM", 
        "8 PM", "9 PM", "10 PM", "11 PM", 
        ]

        var formattedData = {
            categories: labels,
            series: seriesArray
        }

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
                min: 0,
                max: 100
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
                    data={formattedData}
                    options={options}
                />
            </div>
        )
    }
    else
        return <div>Fetching...</div> 
}