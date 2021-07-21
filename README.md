# Population Tracker

This is a React web application made to monitor population at user's nearby Planet Fitness locations. I was inspired to make it because during the COVID-19 lockdown my primary gym shut down indefinitely, and I had to find a way to get to the gym at '*safe*' times. Unfortunately, Planet Fitness (at the time) didn't have any kind of population tracking, so I made this!

The website uses your current location to locate any nearby chains and allows you to view information relevant to that location.

## Technologies Used ##
Backend
* Express
* Cron
* GraphQL
* TypeORM
* SQLite

Frontend
* React
    * Router
    * Bootstrap
* TOAST UI

## Where is the data coming from?
I'm getting this data directly from the Planet Fitness API. The API is queried every 30 minutes [by the nodeJS back end](https://github.com/BrianM0330/GymTracker/blob/main/src/index.ts) with a cron job. The cron job gets the URLs from [a JSON file](https://github.com/BrianM0330/GymTracker/blob/main/src/pf-api-urls.json) and runs a GET request on every location using that URL. On every successful GET, the data is written to a SQLite database via graphQL. 

## Why TypeScript?
To practice! In fact, the entirety of this project was just to practice full stack development. It started as a very simple web scraper in Python, but I wanted to do a little more and really get my feet wet with web development. This project could have very easily been made with raw Javascript and React, but I really wanted to get familiar with Typescript and GraphQL on top of the base of JS and React. Luckily it worked really well! My Typescript is far from perfect and the GraphQL feels a bit redundant, but I'm sure that if I ever expand the project having GQL and TypeORM set up will make it a breeze. 

## How can I adapt this project for other gyms?
It shouldn't be too difficult. A decent amount of this code isn't specific to Planet Fitness. If you were to attempt to modify this, I'd start with getting the data requests working on [index.ts](https://github.com/BrianM0330/GymTracker/blob/main/src/index.ts). Since it uses hard coded URLs [in a JSON file](https://github.com/BrianM0330/GymTracker/blob/main/src/pf-api-urls.json), you could write a quick web scraper to get the endpoints and write the data that way. Modifying the database implementation will probably be the trickiest part, I found LogRocket's resources incredibly helpful. After that, you should be able to modify the React front end in the *client* folder and hopefully have a working prototype.

* https://blog.logrocket.com/how-build-graphql-api-typegraphql-typeorm/
* https://blog.logrocket.com/integrating-typescript-graphql/
* https://blog.logrocket.com/crud-with-node-graphql-react/

