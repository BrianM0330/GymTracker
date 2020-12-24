import "reflect-metadata"
import {createConnection} from "typeorm"
import express from "express"
import cors from "cors"
import axios from "axios"
import urlsJson from './pf-api-urls.json'
import {ApolloServer} from "apollo-server-express"
import {graphqlHTTP} from 'express-graphql'
import {buildSchema} from "type-graphql"
import { popDataResolver } from "./resolvers/popDataResolver"

(async () => {
    const app = express();
    await createConnection();

    //Schema created using resolvers
    const schema = await buildSchema({
      resolvers: [popDataResolver]
    })

    const apolloServer = new ApolloServer({
      schema, 
      context: ({ req, res }) => ({ req, res }),
      playground: true,
      introspection: true
    });
    apolloServer.applyMiddleware({app, path:'/graphql'});

    app.use(cors())
    app.use(express.json())

    //Enable graphql middleware for browser playground
    app.use('/graphql',
            graphqlHTTP({
              schema: schema,
              graphiql: true
            }))

    app.get('/:locationName', async function(_req, res) {
      const urlToUse = urlsJson[_req.params.locationName.toLowerCase()].url
                        //locationName.url
 
      if (urlToUse == undefined) {
        console.log("Invalid location", _req.params.locationName.toLocaleUpperCase(), "entered")
        res.send('This location does not exist')
      }

      else {
        const apiResult = await axios.get(urlToUse)
        console.log(_req.params.locationName.toUpperCase(),"data successfully accessed")
        res.send(apiResult.data)
      }
    })

    app.post('/findNearest', function (_req, res) {
      let closestLocations = {}
      let coordinates = _req.body
      console.log("Received coordinates", coordinates)
      let startingLat = coordinates.latitude
      let startingLong = coordinates.longitude

      for (let locObject in urlsJson) {
        let latitude = urlsJson[locObject].latitude
        let longitude = urlsJson[locObject].longitude

        let miles = haversineLocationFormula(startingLat, startingLong, latitude, longitude)
        
        if (miles <= 5) { //can probably make this parameterized for user defined radius
          closestLocations[locObject] = urlsJson[locObject]
        }
      }

      if (Object.keys(closestLocations).length == 0) { //If there are no locations nearby..
        console.log("None found")
        return res.status(200).send({
          success: false,
          msg: "No locatitons found"
        })
      }

      else {
        console.log("Final locations", closestLocations)
        return res.status(200).send(closestLocations)
      }
      
    })

    const haversineLocationFormula = (lat1: number, lon1: number, lat2: number, lon2: number) => {
      var radiansLat1 = Math.PI * lat1/180
      var radiansLat2 = Math.PI * lat2/180
      var theta = lon1-lon2
      var radiansTheta = Math.PI * theta/180
      var dist = Math.sin(radiansLat1) * Math.sin(radiansLat2) + Math.cos(radiansLat1) * Math.cos(radiansLat2) * Math.cos(radiansTheta)
      if (dist > 1)
        dist = 1;
      dist = Math.acos(dist)
      dist = dist * 180/Math.PI
      dist = dist*60*1.515
      return dist
    }

    app.listen(4000, () => {
      console.log(`express server started at ${apolloServer.graphqlPath}`);
    });

    // httpServer.listen({port:4001}, (): void => console.log("GRAPHQL RUNNING"))

  })();
  