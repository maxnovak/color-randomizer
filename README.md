# color-randomizer
Restful API that will display random colors

The goal of this project is to show the power of RESTful interfaces.  A RESTful API doesn't really care what it is implemented in it just cares about doing stateless operations.  To illustrate this the UI is all built in React and the backend has been implemented in multiple languages, which all behave the same way.  The data that is being used is stored in a simple MongoDB, which is hosted on [Cloud MongoDB](https://www.mongodb.com/cloud).

The first implementation, in NodeJS, of the API is at the root of the project, allowing easy Heroku deployment.  The Node version uses [Express](https://expressjs.com/) for the server & [Mongoose](https://mongoosejs.com/) for MongoDB connections.

The second implementation of the backend is implented in Python 3 using [Flask](http://flask.pocoo.org/) for the server & [PyMongo](https://api.mongodb.com/python/current/) for DB connections.  Currently, the Flask implemetation is fully functional, but requires some manual configuration that needs to be added to this project.

### Setting up Environments
##### To setup the NodeJS environment:
The `MONGODB_URI` variable needs to be set to a MongoDB instance, this can be done with setting it to an environment variable or by creating an `.env` file.

##### To setup the Python environment:
WIP

### Running the application locally
##### To run NodeJS API and React UI together:
Navigate to root directory and run:
`npm run dev`

##### To run React UI:
Navigate to `client` folder and run:
`npm run start`

##### To run Python API:
Navigate to `python_api` folder and run:
`flask run -p 8000` (the 8000 is to set the port to where the frontend will be looking)

##### To run NodeJS API:
Navigate to root directory and run:
`npm run start`
