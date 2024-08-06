## Frontend

### Sample env file
```cmd
NEXTAUTH_SECRET=up/Cr5NI4bLQAtX8+wTUBvOkEGHoN51R4OGvQheCXks=
GOOGLE_CLIENT_ID=485643269714-4mcp6qfbcoh.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-e2rqbr
```

### Running the app

```bash
$ cd client

# development
$ npm run dev
```

The frontend application will be running [http://localhost:3000](http://localhost:3000) by default.

## Backend

### Sample env file
```cmd
NESTAUTH_SECRET=fbAcrDKkhkCANwTFS75gSa7MrNmMebu7jykcN5ON3E4=

DB_HOSTNAME=127.0.0.1
DB_USERNAME=postgres
DB_PASSWORD=amin1234
DB_NAME=MOTOR_INSURANCE_WEBSITE
```

### Running the app
```bash
$ cd server

# development
$ npm run start

# docker
$ docker-compose up -d --build
```

The backend application is running on [http://localhost:3002](http://localhost:3002) by default.
Once its started, an admin and user token will be generated in console

This token will be used as RBAC routes

### Testing with code coverage

```bash
npm run test:cov
```

Currently, the test coverage is at 89%