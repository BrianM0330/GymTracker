import "reflect-metadata"
import {createConnection} from "typeorm"
import express from "express"
import cors from "cors"
import axios from "axios"
import {ApolloServer} from "apollo-server-express"
import {buildSchema} from "type-graphql"
import { popDataResolver } from "./resolvers/popDataResolver"

(async () => {
    const app = express();
    app.use(cors())
  
    app.get('/cicero', async function(_req,res) {
      const apiResult = await axios.get("https://www.planetfitness.com/gyms/pfx/api/clubs/pfx:clubs:c202927e-c284-11e8-999a-a511d4663031")
      res.send(apiResult.data)
      console.log(apiResult.data.occupancy)
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
  