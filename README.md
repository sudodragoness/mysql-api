# web-server
This is the back-end. The features are as follows:
1. User Registration & Authentication
User Registration (POST /api/auth/register): A user can register by providing a username, email, and password. The system checks for duplicate usernames or emails before creating the user in the database. Passwords are securely hashed using bcryptjs.
User Login (POST /api/auth/login): Registered users can log in by providing a username and password. Upon successful login, a JSON Web Token (JWT) is generated and sent to the client, allowing the user to authenticate subsequent requests.
2. Gallery Management
Get Artwork (GET /api/files): The gallery endpoint allows users to fetch a list of artwork. For authenticated users, the list includes artwork that they have uploaded.
Upload Artwork (POST /api/files/upload): Authenticated users can upload artwork by submitting a file. The backend stores the file in the uploads directory and returns the file's URL, which is used on the front-end to display the image.
Delete Artwork (DELETE /api/files/:fileName): Authenticated users can delete artwork they uploaded. The backend deletes the file from the server and removes the corresponding database record.
3. Authentication Middleware
JWT Token Verification: The auth.middleware.js file ensures that only authenticated users can access protected routes. It verifies the JWT provided in the Authorization header and attaches the decoded user information to the request.
4. Database Integration
User and File Database: The backend uses MySQL for storing user information and artwork metadata (such as file names and URLs).
Queries: SQL queries are executed through the mysql2 package, which interacts with the database to handle user registration, login, and artwork management.
5. Error Handling
Error Responses: The backend provides appropriate error messages for failed operations, including missing fields, invalid credentials, or database errors. These errors are communicated through standardized HTTP status codes and message bodies.


Setup and Running the Application
1. Install Dependencies
Install the required Node.js dependencies:
bash
Copy code
npm install
2. Set Up Database
Create a MySQL database and set up the necessary tables for users and artwork.
Example SQL for creating the user table:
sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);
3. Configure the Backend
Ensure that the backend is running on port 3000 or adjust your API URLs accordingly.
4. Start the Backend
To start the backend, run:
npm start
5. Front-End Setup
Make sure the front-end files (HTML, CSS, JS) are placed in the appropriate directory (/public or /dist).
Ensure the front-end is hosted on port 4000 (or adjust URLs to match your setup).
6. Run the Front-End
Open index.html (or any other HTML page) in your browser to test the front-end features.
