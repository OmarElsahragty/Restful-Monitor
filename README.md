# Restful Monitor

![Logo](https://i.ibb.co/ykhz8Q7/logo.png)

uptime monitoring RESTful API server which allows authorized users to enter URLs they want monitored, and get detailed uptime reports about their availability, average response time, and total uptime/downtime.

<table border="0">
  <tr>
    <td>
      <img
        src="https://i.ibb.co/PW6XGtm/registration.png"
        height="500px"
        width="500px"
      />
    </td>
    <td>
      <img
        src="https://i.ibb.co/FhBzTD7/status.png"
        height="500px"
        width="500px"
      />
    </td>
  </tr>
</table>

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Environment

Generate `.env` file using `.env.example` in docs.

### Docker

Run ➡ `docker-compose up --build -d`

### Installation

Run ➡ `npm install`

### NPM scripts

1. `npm run docker` ➡ Docker runtime environment
2. `npm run start` ➡ Production runtime environment
3. `npm run dev` ➡ Development runtime environment (Listening on src for changes )
4. `npm run init` ➡ Database Initialization (Create all the tables)
5. `npm run rest` ➡ Database Rest (Dropping all the tables and recreate them)
6. `npm run lint` ➡ Run linter (Checking for mistakes)

### Documentation

1. Postman (collection URL) is provided in ./docs/Postman Collection.txt file
2. Swagger (yaml and json files) are provided in ./docs/Swagger folder

#### User Management

After calling registration end point successfully, you should receive a email with your account password from the email address that you have added to the environment file `.env` to make sure that each email registered is valid.

For more projects check my github account `https://github.com/OmarElsahragty` or my portfolio website `https://sahragty.herokuapp.com/`
