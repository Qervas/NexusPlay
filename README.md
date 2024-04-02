# NexusPlay

An online game hub featuring a multiplayer shooter game.

* File Structure:
  * backend:
    * `src/`: All your TypeScript source files.
      * `controllers/`: Functions that respond to HTTP requests.
      * `models/`: Mongoose models for your database.
      * `routes/`: Express routes defining your API endpoints.
      * `services/`: Business logic, such as authentication and chat services.
      * `utils/`: Utility functions.
      * `app.ts`: Entry point of your Express application.
    * `dist/`: Where the compiled JavaScript files will reside.
  * frontend:
    * `pages/`: Contains page components.
    * `components/`: Reusable UI components.
    * `styles/`: Global styles and themes.
    * `utils/`: Utility functions and constants.
    * `services/`: Services for API calls and WebSocket connections.

###### Configure

`npm install` at the same directory of `package.json`
