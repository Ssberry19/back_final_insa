
# Final Backend Project
This is a backend project built with Node.js, Express.js, and MongoDB.

## Getting Started
To get started with this project, follow these steps:

### Prerequisites
Node.js installed on your machine
MongoDB installed and running locally or accessible via a cloud service
npm or yarn package manager

## Installation

**Clone this repository to your local machine using:**

```bash
git clone https://github.com/Ssberry19/back_final_insa/

```
Install the project dependencies

### Configuration
Create a .env file in the root directory of the project based on the .env.example file.
**Update the environment variables in the .env file**, such as database connection details, session keys, and email credentials:
```bash
JWT_SECRET=verysaveextralongsecret
JWT_EXPIRES_IN=3600

PORT=3000
SESSION_KEY=verysafeexpresssessionsecretkey
DATABASE=mongodb+srv://gybraty:<PASSWORD>@portfolio.wurtkio.mongodb.net/
DATABASE_PASSWORD=portfoliopassword

DEV_EMAIL=insaniyatka@gmail.com
DEV_EMAIL_PASSWORD=ihih fijx nskv egkz

NEWS_API_KEY=1272bac39c63404ab8dd1c8ddeb62cf4
```

### Running the Application
**Start the server:**

```bash
npm start
```
This will start the server on the default port (or the port specified in the .env file).

### Access the application in your web browser at http://localhost:3000

### Usage
- Register a new user by accessing /register route and filling out the registration form.
- Login with your registered credentials at /login route.
- Once logged in, you can access the home page at /home where you can view portfolio items.
- Users with admin role can access the admin dashboard at /dashboard to add, edit, or delete portfolio items.
- Logout by accessing /logout route.


### Contributing
Contributions are welcome! Please feel free to submit a pull request or open an issue if you encounter any bugs or have suggestions for improvements.

### License
This project is licensed under the MIT License.
