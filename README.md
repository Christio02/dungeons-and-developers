![Logo](https://www.pngkey.com/png/detail/374-3749117_png-file-svg-dnd-logo-png.png)

# Dungeon & Developers

An application to explore the various functionalities and mechanics of the popular roleplaying game Dungeons & Dragons. Where you can create your own character, explore the games classes, monsters, races and abilityscores!

## Table of Contents

- [Dungeon \& Developers](#dungeon--developers)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
    - [Explore monsters](#explore-monsters)
    - [Dungeon](#dungeon)
    - [My character](#my-character)
  - [Tech Stack](#tech-stack)
    - [Frontend](#frontend)
    - [Backend](#backend)
  - [Run Locally](#run-locally)
    - [Run the frontend](#run-the-frontend)
    - [Run the backend](#run-the-backend)
  - [Backend](#backend-1)
  - [GraphQL API](#graphql-api)
    - [Schema](#schema)
    - [MongoDB models](#mongodb-models)
    - [Resolvers](#resolvers)
    - [Use in frontend](#use-in-frontend)
  - [Tests](#tests)
  - [D\&D API](#dd-api)
    - [Specifications](#specifications)
  - [Accesability](#accesability)
  - [Authors](#authors)
  - [License](#license)

7. ### [D&D API](#dd-api)

- [Specifications](#specifications)

8. ### [Accessibility](#accessibility)

9. ### [Authors](#authors)

10. ### [License](#license)

## Features

#### Explore monsters

- You can explore the different monsters within D&D
  - View the monsters HP, and type
  - Filter by type search for specific monsters
  - Review monsters to assign them difficulties and notes
  - Add monsters to your dungeon

#### Dungeon

- View all saved monsters, and their combined HP. To know how difficult this dungeon would be

#### My character

- Explore the different races, classes, ability scores and equipment which you can assign to your character. With usefull information

## Tech Stack

### Frontend

- [**React**](https://react.dev/): Provides a component-based structure for building interactive UIs.
- [**TypeScript**](https://www.typescriptlang.org/): Enhances code reliability with static typing, making the application more maintainable.
- [**TailwindCSS**](https://tailwindcss.com/): Allows for shorthand CSS styling inline, while also creating and using our own global styles.
- [**Framer Motion**](https://motion.dev/): Allows for animations that make the UI more personal and dynamic.
- [**Lodash**](https://www.npmjs.com/package/lodash): Offers utility functions, simplifying common tasks like debouncing.
- [**Apollo Client**](https://www.apollographql.com/docs/react): A statemanagement library used to manage GraphQL data by fetching, using cache
  - We have used this together with its reactive variables to reduce fetching
- [**Material UI**](https://mui.com/material-ui/): A React component library that implements Google's Material Design.

  - We have used it to reduce time consumption on creating complex components.

- [**LDRS**](https://uiball.com/ldrs): A library that provides loading spinners
- [**React Toastify**](https://fkhadra.github.io/react-toastify/introduction): A library that provides a way to customize Toast for giving feedback during interaction for users
- [**React blurhash**](https://www.npmjs.com/package/react-blurhash): Renders blurhashes for images

### Backend

- [**Node.js**](https://nodejs.org/en): Enables running JavaScript on the server, handling requests, and serving content.
- [**Axios**](https://www.npmjs.com/package/axios):
  A simple promise based HTTP client
- [**Apollo Server**](https://www.apollographql.com/docs/apollo-server): Used to implement a GraphQL API, facilitating flexible data fetching for the frontend.
- [**GraphQL**](https://graphql.org/): Provides efficient querying of data, allowing clients to request exactly what they need.
- [**MongoDB**](https://www.mongodb.com/): A NoSQL database that stores data in a flexible, document-oriented format.
- [**Express**](https://www.npmjs.com/package/express): A webframework for node. We use it to set-up backend server
- [**P-limit**](https://www.npmjs.com/package/p-limit): A tool to run multiple promise-returning & async functions with limited concurrency
  - We use it to optimize fetching monsters to our database'
- [**Joi**](https://joi.dev/api/?v=17.13.3): A validation tool used to validate database schema
  - We use it to validate our mongoose schema
- [**Sharp**](https://sharp.pixelplumbing.com/): An image tool to convert large images to smaller formats like WEBP.
  - We use it to optimize images fethed from API

## Run Locally

Clone the project
Link: <http://it2810-20.idi.ntnu.no/project2>

Remember to use development branch!

Command:

```bash
  git clone https://git.ntnu.no/IT2810-H24/T20-Project-2
```

```bash
  git checkout development
```

### Run the frontend

Go to the frontend folder

```bash
  cd frontend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

### Run the backend

Go to the backend folder

```bash
  cd backend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```

## Backend

This project uses a Node.js server where we're using Apollo server with GraphQL to interact with our database, which we chose to be MongoDB.

We chose MongoDB as our database because it was well documented, which made learning and implementing it easy. It is also ideal for our use we can store the same entities but with different attributes.

Having already decided on MongoDB and GraphQL for our technologies, we found Apollo to be a efficient and fitting server to use.

## GraphQL API

In this project, we’ve implemented a GraphQL API. The API allows clients to query and mutate data related to D&D monsters, user information, races, and classes.

### Schema

In the GraphQL schema, we are defining the types of data that the client can query or mutate. We defined separate schemas for monsters, users, races, and classes to structure our data effectively.

### MongoDB models

We used Mongoose to define models that map our MongoDB documents to JavaScript objects. Each GraphQL schema type corresponds to a MongoDB model:

- Monster Model (monsterSchema): Stores monster information, including nested reviews.
- Class Model (ClassSchema): Represents different classes in the D&D universe.
- Race Model (RaceSchema): Stores race-specific information.
- User Model (playerSchema): Manages user information, including references to favorite monsters, class, and race.

### Resolvers

Resolvers are functions that handle GraphQL queries and mutations. We implemented resolvers to handle various operations for each type:

- **Queries**: Fetch data for monsters, users, classes, and races. Supports filtering and pagination.
- **Mutations**: Create and update records, including user registration, adding reviews to monsters, and managing favorite monsters.

### Use in frontend

To be able to use all this functionality we have defined multiple GraphQL queries and mutations in the frontend, by using Apollo Client.

## Tests

Read about testing here: [Testing](docs/testing.md)

## D&D API

#### Specifications

We use the [D&D 5e API](https://www.dnd5eapi.co/) to fetch the different objects used for the page. Such at the different classes, monsters, equipment etc. Which helps us keep the page true to how D&D works and what is possible in the game.
We use [5e-encouter](https://github.com/seball/5e-encounter/tree/master/src/assets/monsters) to retrieve or pixel art images

## Accesability

For better accesability we have provided ARIA-labels for the essential elements for our code.
Which helps us provide context for our custom elements, and provide information to assistive technologies.

## Authors

- [@matskva](https://git.ntnu.no/matskva)
- [@christgh](https://git.ntnu.no/christgh)
- [@eirikekv](https://git.ntnu.no/eirikekv)
- [@augustm](https://git.ntnu.no/augustm)

## License

[MIT](https://choosealicense.com/licenses/mit/)
