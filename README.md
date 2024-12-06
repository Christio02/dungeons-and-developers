![Logo](https://www.pngkey.com/png/detail/374-3749117_png-file-svg-dnd-logo-png.png)

# Dungeon & Developers

An application to explore the various functionalities and mechanics of the popular roleplaying game Dungeons & Dragons.
Where you can create your own character, explore the games classes, monsters, races and abilityscores!

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
    - [GraphQL API](#graphql-api)
        - [Schema](#schema)
        - [MongoDB models](#mongodb-models)
        - [Resolvers](#resolvers)
    - [Folder Structure](#folder-structure)
    - [Tests](#tests)
    - [AI-tools](#ai-tools)
    - [D\&D API](#dd-api)
    - [Accessibility](#accessibility)
        - [ARIA Labels and Keyboard Navigation](#aria-labels-and-keyboard-navigation)
        - [Accessibility Mode](#accessibility-mode)
        - [Screen Reader](#screen-reader)
    - [Sustainability](#sustainability)
        - [Optimized Image Handling](#optimized-image-handling)
        - [Efficient API Usage](#efficient-api-usage)
        - [State Management and Pagination](#state-management-and-pagination)
        - [Secure and User-Friendly Navigation](#secure-and-user-friendly-navigation)
    - [Known Issues](#known-issues)
    - [Authors](#authors)
    - [License](#license)

## Features

#### Explore monsters

- Browse a variety of D&D monsters with key stats and information.
- View attributes like hit points (HP) and monster type.
- Filter by type and search for specific monsters.
- Add reviews to monsters, including difficulty rating and description.
- Save monsters to your dungeon.

#### Dungeon

- View your saved monsters and their combined HP.
- Rename your dungeon.

#### My character

- Explore available races, classes, ability scores, and equipment.
- Assign features to build and customize your character.

## Tech Stack

### Frontend

The frontend of this project is built using React and TypeScript.

TailwindCSS was used for styling due to its utility-first approach, which makes it easy to rapidly design consistent
layouts. Additionally, we integrated Apollo Client to manage GraphQL queries and caching, reducing redundant network
requests and improving performance.

We used Framer Motion for smooth animations, and Material UI to speed up development
by leveraging pre-built, customizable components.

- [**React**](https://react.dev/): Provides a component-based structure for building interactive UIs.
- [**TypeScript**](https://www.typescriptlang.org/): Enhances code reliability with static typing, making the
  application more maintainable.
- [**TailwindCSS**](https://tailwindcss.com/): Allows for shorthand CSS styling inline, while also creating and using
  our own global styles.
- [**Framer Motion**](https://motion.dev/): Allows for animations that make the UI more personal and dynamic.
- [**Lodash**](https://www.npmjs.com/package/lodash): Offers utility functions, simplifying common tasks like
  debouncing.
- [**Apollo Client**](https://www.apollographql.com/docs/react): A statemanagement library used to manage GraphQL data
  by fetching, using cache
    - We have used this together with its reactive variables to reduce fetching
- [**Material UI**](https://mui.com/material-ui/): A React component library that implements Google's Material Design.

    - We have used it to reduce time consumption on creating complex components.

- [**LDRS**](https://uiball.com/ldrs): A library that provides loading spinners
- [**React Toastify**](https://fkhadra.github.io/react-toastify/introduction): A library that provides a way to
  customize Toast for giving feedback during interaction for users
- [**React blurhash**](https://www.npmjs.com/package/react-blurhash): Renders blurhashes for images

### Backend

This project uses a Node.js server where we're using Apollo server with GraphQL to interact with our database, which we
chose to be MongoDB.

We chose MongoDB as our database because it was well documented, which made learning and implementing it easy. It is
also ideal for our use we can store the same entities but with different attributes.

Having already decided on MongoDB and GraphQL for our technologies, we found Apollo to be a efficient and fitting server
to use.

- [**Node.js**](https://nodejs.org/en): Enables running JavaScript on the server, handling requests, and serving
  content.
- [**Axios**](https://www.npmjs.com/package/axios):
  A simple promise based HTTP client
- [**Apollo Server**](https://www.apollographql.com/docs/apollo-server): Used to implement a GraphQL API, facilitating
  flexible data fetching for the frontend.
- [**GraphQL**](https://graphql.org/): Provides efficient querying of data, allowing clients to request exactly what
  they need.
- [**MongoDB**](https://www.mongodb.com/): A NoSQL database that stores data in a flexible, document-oriented format.
- [**Express**](https://www.npmjs.com/package/express): A webframework for node. We use it to set-up backend server
- [**P-limit**](https://www.npmjs.com/package/p-limit): A tool to run multiple promise-returning & async functions with
  limited concurrency
    - We use it to optimize fetching monsters to our database'
- [**Joi**](https://joi.dev/api/?v=17.13.3): A validation tool used to validate database schema
    - We use it to validate our mongoose schema
- [**Sharp**](https://sharp.pixelplumbing.com/): An image tool to convert large images to smaller formats like WEBP.
    - We use it to optimize images fethed from API

## Run Locally

Clone the project
Link: <http://it2810-20.idi.ntnu.no/project2>

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

## GraphQL API

In this project, we’ve implemented a GraphQL API. The API allows clients to query and mutate data related to D&D
monsters, user information, races, and classes.

### Schema

In the GraphQL schema, we are defining the types of data that the client can query or mutate. We defined separate
schemas for monsters, users, races, and classes to structure our data effectively.

### MongoDB models

We used Mongoose to define models that map our MongoDB documents to JavaScript objects. Each GraphQL schema type
corresponds to a MongoDB model:

- **Monster Model (monsterSchema):** Stores monster information, including nested reviews.
- **Class Model (ClassSchema):** Represents different classes in the D&D universe.
- **Race Model (RaceSchema):** Stores race-specific information.
- **User Model (playerSchema):** Manages user information, including references to favorite monsters, class, and race.
- **Ability Score Model (abilityScoreSchema):** Represents ability scores with properties such as index, name, and
  associated skills.
- **Equipment Model (equipmentSchema):** Tracks equipment details, including name, category, and attributes.

### Resolvers

Resolvers are functions that handle GraphQL queries and mutations. We implemented resolvers to handle various operations
for each type:

- **Queries**: Fetch data for monsters, users, classes, and races. Supports filtering and pagination.
- **Mutations**: Create and update records, including user registration, adding reviews to monsters, and managing
  favorite monsters.

### Use in frontend

To be able to use all this functionality we have defined multiple GraphQL queries and mutations in the frontend, by
using Apollo Client.

## Folder Structure

```plaintext
T20-Project-2
├── backend
│   ├── src
│   │   ├── graphql
│   │   │   ├── model
│   │   │   ├── resolvers
│   │   │   └── typeDefs
│   │   ├── scripts
│   │   ├── utils
│   │   ├── app.ts
│   │   └── main.ts
├── docs
frontend
├── cypress
│   ├── e2e
│   ├── fixtures
│   └── support
├── public
├── src
│   ├── assets
│   │   ├── fonts
│   │   └── images
│   ├── client
│   ├── components
│   │   ├── ... (component folders)
│   ├── context
│   ├── graphql
│   │   ├── mutations
│   │   ├── queries
│   │   └── queryInterface.ts
│   ├── hooks
│   ├── interfaces
│   ├── pages
│   │   ├── mainPages
│   │   ├── subPages
│   ├── test
│   ├── utils
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── tests
│   ├── components
│   │   ├── ... (component folders)
│   │   │   ├── __snapshots__
│   │   │   ├── (component).test.tsx
│   ├── context
│   │   │   ├── __snapshots__
│   │   │   ├── AuthContext.test.tsx
│   ├── mocks
│   └── utils
```

## Tests

Read about testing here: [Testing](docs/testing.md)

## AI-tools

Read about the use of AI-tools here: [AI-tools](docs/ai-tools.md)

## D&D API

We use the [D&D 5e API](https://www.dnd5eapi.co/) to fetch the different objects used for the page. Such at the
different classes, monsters, equipment etc. Which helps us keep the page true to how D&D works and what is possible in
the game.
We use [5e-encouter](https://github.com/seball/5e-encounter/tree/master/src/assets/monsters) to retrieve or pixel art
images

## Accessibility

### ARIA Labels and Keyboard Navigation

- **ARIA Labels:** Essential elements include ARIA labels to provide additional context for custom components and ensure
  compatibility with assistive technologies. This enhances the overall usability of the application for all users.
- **Keyboard Navigation:** The entire application is fully navigable using a keyboard. All interactive elements, such as
  buttons and links, are accessible without requiring a mouse.

### Accessibility Mode

- **Accessibility Mode:** A dedicated accessibility mode is available via a toggle button in the navigation bar and on
  the login page. This mode adjusts the user interface by removing background images and applying a black background,
  making text and buttons more distinguishable and easier to interact with for users with visual impairments.

### Screen Reader
- **Screen Reader Only (sr-only):** Some visual elements, such as figure captions and non-visible text, are hidden using sr-only styling to ensure they are accessible to screen readers without interfering with the visual layout.

## Sustainability

### Optimized Image Handling

- **Compression and Local Storage:** Images are compressed and stored directly in the database rather than relying on
  external URLs. Initially, we used URLs
  pointing to large PNG images, which led to slow loading times. By compressing these images, we have significantly
  reduced bandwidth usage and improved performance.

### Efficient API Usage

- **Caching:** We utilize caching mechanisms to minimize redundant data fetching and reduce unnecessary calls to
  external
  APIs. This ensures efficient use of both client and server resources.
- **Apollo Client Reactive Variables:** State is managed locally using Apollo Client’s reactive variables, which allows
  us to avoid unnecessary refetching of data. For example, when a user adds a monster to their dungeon, we update the
  dungeon state locally without fetching the entire dataset again.

### State Management and Pagination

- **Session Storage:** States such as the search term, current page, selected filters, and sorting options, are stored
  in sessionStorage. This allows users to navigate between pages without losing their search results or filter settings.
- **Pagination:** Instead of fetching the entire dataset at once, we implement pagination to retrieve only the relevant
  monsters for the current page.

### Secure and User-Friendly Navigation

- **Protected Routes:** Users cannot access any part of the application except the login page unless authenticated
  (logged in)
- **404 Page:** A custom 404 page has been implemented to handle invalid routes. This minimizes confusion and helps
  guide users back to valid pages.

## Known Issues

The following are low-priority issues we are aware of but were unable to address before the deadline:

- **Tab Navigation in Safari:** Tabbing does not work seamlessly in Safari, and some buttons or links are not accessible
  via the keyboard.
- **Text Selection on Safari Mobile:** When holding down the increment/decrement arrows (counter) on Safari mobile, the
  text gets unintentionally selected.
- **Cypress Test Coverage:** The application does not currently display Cypress coverage.
- **Keyboard Navigation for Monster Grid:** When using tab navigation, pressing “Enter” on a highlighted monster does
  not open the monster details. Instead, users need to press “Shift + Enter” to access the details.

## Authors

- [@matskva](https://git.ntnu.no/matskva)
- [@christgh](https://git.ntnu.no/christgh)
- [@eirikekv](https://git.ntnu.no/eirikekv)
- [@augustm](https://git.ntnu.no/augustm)

## License

[MIT](https://choosealicense.com/licenses/mit/)
