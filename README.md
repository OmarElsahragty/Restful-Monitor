# Restful Monitor

![Logo](https://i.ibb.co/ykhz8Q7/logo.png)

uptime monitoring RESTful API server which allows authorized users to enter URLs they want monitored, and get detailed uptime reports about their availability, average response time, and total uptime/downtime.

##### Demo Base URL ➡ `34.74.88.81/Restful-Monitor`

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

A step by step guide that will tell you how to get the development environment up and running.

1. Install node dependencies ➡ `npm install`
2. Database Initialization ➡ `npm run init`
3. Development run ➡ `npm run dev` || Production run ➡ `npm start`

### NPM scripts

1. `npm run docker` ➡ Docker runtime environment
2. `npm runt start` ➡ Production runtime environment
3. `npm run dev` ➡ Development runtime environment (Listening on src for changes )
4. `npm runt init` ➡ Database Initialization (Create all the tables)
5. `npm runt rest` ➡ Database Rest (Dropping all the tables and recreate them)
6. `npm runt lint` ➡ Run linter (Check for mistakes)

### Postman Collection

URL ➡ `https://www.getpostman.com/collections/9e70943f6f2f3ca038e4`

### Swagger Documentation

Check ➡ `./docs/swagger`

### User Management

After calling registration end point successfully, you should receive a email with your account password from the email address that you have added to the environment file `.env` to make sure that each email registered is valid.
