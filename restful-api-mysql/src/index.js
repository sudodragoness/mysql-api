const express = require('express');
const multer = require('multer');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const socialRoutes = require('./routes/social.routes');
const middleware = require('./middleware/errors.middleware');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const fileRoutes = require('./routes/file.routes');

const app = express();

// Middleware - logs server requests to console
app.use(logger('dev'));

// Middleware - parse incoming requests (https://github.com/expressjs/body-parser)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Middleware - enable CORS
app.use(cors());

// Routes
app.use('/api/accounts', socialRoutes); // http://localhost:3000/api/accounts
app.use('/api/auth', authRoutes); // http://localhost:3000/api/auth
app.use('/api/users', userRoutes); // http://localhost:3000/api/users
app.use('/api/files', fileRoutes);

// Error handling middleware
app.use(middleware.error404); // http://localhost:3000/users
app.use(middleware.error500);

// listen on server port
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});