import "reflect-metadata"
import {createConnection} from "typeorm"
import express from "express"
import {ApolloServer} from "apollo-server-express"
import {buildSchema} from "type-graphql"
import {HelloWorldResolver} from "./resolvers/HelloWorldResolver"
//import resolvers

(async () => {
    const app = express();
  
    await createConnection();
    
    //initializing apolloserver 
    const apolloServer = new ApolloServer({
      schema: await buildSchema({
        resolvers: [HelloWorldResolver]
      }),
      context: ({ req, res }) => ({ req, res })
    });
  
    //use cors to connect to express
    apolloServer.applyMiddleware({ app, cors: false });
  
    app.listen(4000, () => {
      console.log("express server started");
    });
  })();
  