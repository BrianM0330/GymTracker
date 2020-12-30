import React, {useEffect, useState} from 'react';
import {ApolloClient, InMemoryCache, gql} from '@apollo/client'
import {RouteComponentProps} from 'react-router'
import {ColumnChart} from "@toast-ui/react-chart"
import 'tui-chart/dist/tui-chart.css'
import '../index.css'

//TODO: For comparing all locations, pass the data in props and add it to graphs in series
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
        
    }, [setData, props.match.params])

    if ((Object).keys(data).length > 0) {
        //https://nhn.github.io/tui.chart/latest/tui.chart
        //Docs for chart library

        const formattedLocationName = props.match.params['name']
                                    .replace('-', ' ')
                                    .toLowerCase()
                                    .split(' ')
                                    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                                    .join(' ')
        
        //Object.values was returning type: unknown[]
        const typedData: number[] = Object.values(data)
        const labels: string[] = []
        
        //Removes population_ substring from the GQL query
        Object.keys(data).map(x => {
            if (x !== '__typename') {
                var time: number = eval(x.substr(11))
                var timeFormat = 
                (time >= 12 && time<=23)  //Times 12PM - 11PM
                ? "PM"
                : "AM"

                if (time > 12) labels.push(`${time-12} ${timeFormat}`)
                else if (time === 12) labels.push(`${time} ${timeFormat}`)
                else if (time === 0) labels.push(`${time+12} ${timeFormat}`)
                else labels.push(`${time} ${timeFormat}`)
            }
        })

        var formattedData = {
            categories: labels,

            //To add other lines, just create another series with more data + name.
            series: [
                {
                    name: `${formattedLocationName}`,
                    data: typedData
                },
            ]
        }

        var options = {
            chart: {
                width: window.innerWidth,
                height: window.innerHeight,
                title: `${formattedLocationName} Population History`,
                // format: '5'
            },
            yAxis: {
                title: 'Population count',
                min: 0,
                max: 60
            },
            xAxis: {
                title: 'Times',
                pointOnColumn: true
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
    else //Loading page
        return <div>Fetching...</div> 
}

//Stylize everything