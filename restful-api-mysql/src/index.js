const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const socialRoutes = require('./routes/social.routes');
const middleware = require('./middleware/errors.middleware');

const app = express();
const port = process.env.PORT || 3000;
const logLevel = process.env.LOG_LEVEL || 'dev';

// Middleware - logs server requests to console
app.use(logger(logLevel));

// Middleware - parse incoming requests (https://github.com/expressjs/body-parser)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.use('/accounts', socialRoutes); // http://localhost:3000/tasks
// app.use('/users', tasksRoutes); // http://localhost:3000/users

// Error handling middleware
app.use(middleware.error404); // http://localhost:3000/users
app.use(middleware.error500); 

// listen on server port
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
