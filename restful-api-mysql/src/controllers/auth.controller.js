const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const con = require('../db-config');
const jwtConfig = require('../jwt-config');
const authQueries = require('../queries/auth.queries');
const userQueries = require('../queries/user.queries');

// Register a new user
exports.registerUser = function(req, res) {

    if (!req.body.username || !req.body.email || !req.body.password) {
      console.log('Missing required fields');
      return res.status(400).send({ message: 'Missing required fields' });
    }
  
    const passwordHash = bcrypt.hashSync(req.body.password);
    console.log('Password hashed');
  
    con.query(
      authQueries.INSERT_NEW_USER,
      [req.body.username, req.body.email, passwordHash],
      function(err, result) {
        console.log('Query executed');
        if (err) {
          console.log(err);
          return res.status(500).send({ message: 'Error registering user' });
        }
  
        con.query(
          userQueries.GET_ME_BY_USERNAME, [req.body.username],
          function(err, user) {
            console.log('User retrieved');
            if (err) {
              console.log(err);
              return res.status(500).send({ message: 'Could not retrieve user' });
            }
  
            console.log(user);
            return res.send(user);
          });
      });
  };

// Login a user
exports.login = function(req, res) {
    // Check if user exists
    con.query(
        userQueries.GET_ME_BY_USERNAME_WITH_PASSWORD,
        [req.body.username],
        function(err, user) {
            if (err) {
                res.status(500).send({ message: 'Error logging in user' });
            }

            console.log(user);
            // validate password
            bcrypt
                .compare(req.body.password, user[0].password)
                .then(function(validPassword) {
                    if (!validPassword) {
                        res.status(401).send({ message: 'Invalid password' });
                    } else {
                        // Create token
                        const token = jwt.sign({ id: user[0].id }, jwtConfig.secret);
                        res.header('auth-token', token).status(200).send({
                            auth: true,
                            username: user[0].username,
                            msg: 'Logged in successfully',
                        });
                    }
                })
        }
    );
};

// Update a user
exports.updateUser = function(req, res) {
  console.log(req.user);

  // Check if user exists
  con.query(
    userQueries.GET_ME_BY_ID_WITH_PASSWORD,
    [req.user.id],
    function(err, user) {
        if (err) {
            res.status(500).send({ message: 'Could not retrieve user' });
        }

        console.log(user);

        const passwordHash = bcrypt.hashSync(req.body.password);

        // Update
        con.query(
            authQueries.UPDATE_USER,
            [req.body.username, req.body.email, passwordHash, user[0].id],
            function(err, result) {
              console.log('Before query result');
              if (err) {
                console.log(err);
                return res.status(500).send({ message: 'Error updating user' });
              }
              console.log(result);
              console.log('After query result');
              return res.send({ message: 'User updated successfully' });
            }
          );
    }
  );
};