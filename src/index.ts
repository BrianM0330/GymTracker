import express from 'express'
import axios from 'axios'
import cron from 'node-cron'
import urlsJson from './pf-api-urls.json'

//GraphQL imports
import 'reflect-metadata'
import { ApolloServer } from 'apollo-server-express'
import { graphqlHTTP } from 'express-graphql'
import { buildSchema } from 'type-graphql'
import { createConnection } from 'typeorm'
import { request, gql } from 'graphql-request'
import { popDataResolver } from './resolvers/popDataResolver'
import path from 'path'

(async () => {
    var cors = require('cors')
    const app = express()
    const PORT = process.env.PORT || 4000

    app.use(cors())
    await createConnection()

    //Schema created using resolvers
    const schema = await buildSchema({
        resolvers: [popDataResolver],
    })

    //ApolloServer running on the same port
    const apolloServer = new ApolloServer({
        schema,
        context: ({ req, res }) => ({ req, res }),
        playground: true,
        introspection: true,
    })
    apolloServer.applyMiddleware({ app, path: '/graphql' })

    app.use(express.json())

    //Enable graphql middleware for browser playground
    app.use(
        '/graphql',
        graphqlHTTP({
            schema: schema,
            graphiql: true,
        })
    )
    app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

    //@ts-expect-error
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
    })

    //Paramaterized GET endpoint used for returning Planet Fitness API data to the front end
    app.get('/api/:locationName', async function (_req, res) {
        const urlToUse = urlsJson[_req.params.locationName.toLowerCase()].url //locationName.url

        if (urlToUse == undefined) {
            console.log(
                'Invalid location',
                _req.params.locationName.toLocaleUpperCase(),
                'entered'
            )
            res.send('This location does not exist')
        } 
        
        else {
            const apiResult = await axios.get(urlToUse)
            console.log(
                _req.params.locationName.toUpperCase(),
                'data successfully accessed'
            )
            res.send(apiResult.data)
        }
    })

    /*POST endpoint that returns a list of nearby gym locations based on the 
      user's latitude and longitude (received from frontend). Uses the 
      Haversine location formula to calculate distance.
    */
    app.post('/findNearest', function (_req, res) {
        let closestLocations = {}
        let coordinates = _req.body
        console.log('Received coordinates', coordinates)
        let startingLat = coordinates.latitude
        let startingLong = coordinates.longitude

        for (let locObject in urlsJson) {
            let latitude = urlsJson[locObject].latitude
            let longitude = urlsJson[locObject].longitude

            let miles = haversineLocationFormula(
                startingLat,
                startingLong,
                latitude,
                longitude
            )

            if (miles <= 5) {
                //can probably make this parameterized for user defined radius
                closestLocations[locObject] = urlsJson[locObject]
            }
        }

        if (Object.keys(closestLocations).length == 0) {
            //If there are no locations nearby..
            console.log('None found')
            return res.status(200).send({
                success: false,
                msg: 'No locatitons found',
            })
        } 
        else {
            console.log('Final locations', closestLocations)
            return res.status(200).send(closestLocations)
        }
    })

    const haversineLocationFormula = (lat1: number, lon1: number, lat2: number, lon2: number) => {
        var radiansLat1 = (Math.PI * lat1) / 180
        var radiansLat2 = (Math.PI * lat2) / 180
        var theta = lon1 - lon2
        var radiansTheta = (Math.PI * theta) / 180

        var dist =
            Math.sin(radiansLat1) * Math.sin(radiansLat2) +
            Math.cos(radiansLat1) *
                Math.cos(radiansLat2) *
                Math.cos(radiansTheta)
        if (dist > 1) dist = 1
        dist = Math.acos(dist)
        dist = (dist * 180) / Math.PI
        dist = dist * 60 * 1.515
        return dist
    }

    /*GQL Response Format:
      {popHistory: [
          { id: 1, 
            population_8: 1, 
            population_9: 12
          }
          {...}
          {...}
        ]
      }

      {popHistory: [Array of JSON Objects] {jsonObject of location}}
  */

    /* Mutation format
      mutation {
        updateEntry(location: "exampleName", input: {
          population_8: 88
        })
      }
  */

    //Scheduled task for fetching data and updating the database with hourly population information
    cron.schedule('0 30 * * * *', async () => {
        console.log(`<------------------------------SCHEDULED TASK-------------------------------------->`)
        console.log(`API data fetched at ${new Date()}`)
        const currentHour: number = new Date().getHours()

        for (var key in urlsJson) {
            let endpoint = urlsJson[key].url
            const apiResult = await axios.get(endpoint)

            if (apiResult.data.occupancy) {
                const gqlQuery = gql
                `mutation {
                    updateEntry(
                    location: "${key}",
                    input: {population_${currentHour}: ${apiResult.data.occupancy.current}
                    })
                }`

                const gqlResponse = await request(`http://localhost:${PORT}/graphql`,gqlQuery)

                if (gqlResponse)
                    console.log(`Successful update on ${key} for ${currentHour} PM`)

            } 
            else { console.log(`${key} could not be fetched at this time. Location is likely closed.`) }
        }
        console.log(`Cron task successfully updated all locations at ${currentHour} PM`)
    })

    //Mutation for re-initializing the database
    //const gqlQuery = gql`mutation{createEntry(data:{location:"${key}"}){location}}`

    app.listen(PORT, () => {
        console.log(`express server started at ${apolloServer.graphqlPath} on port ${PORT}`)
    })
})()
