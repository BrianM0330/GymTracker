import "reflect-metadata"
import {createConnection} from "typeorm"
import express from "express"
import cors from "cors"
import axios from "axios"
import urlsJson from './pf-api-urls.json'
import {ApolloServer} from "apollo-server-express"
import {buildSchema} from "type-graphql"
import { popDataResolver } from "./resolvers/popDataResolver"

(async () => {
    const app = express();
    app.use(cors())

    app.get('/:locationName', async function(_req, res) {
      const urlToUse = urlsJson[_req.params.locationName.toLowerCase()]
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

    await createConnection();

    //initializing apolloserver 
    const apolloServer = new ApolloServer({
      schema: await buildSchema({
        resolvers: [popDataResolver]
      }),
      context: ({ req, res }) => ({ req, res })
    });
  
    //use cors to connect to express
    apolloServer.applyMiddleware({ app, cors: false });
  
    app.listen(4000, () => {
      console.log("express server started");
    });
  })();
  