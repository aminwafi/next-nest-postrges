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
```

The backend application is running on [http://localhost:3002](http://localhost:3002) by default.
Once its started, an admin and user token will be generated in console

This token will be used as RBAC routes

### Running using Docker
```bash
$ cd server

# docker compose
$ docker-compose up -d --build

# docker build and run (without postgres container)
$ docker build -t backend-service .
$ docker run -d -e NESTAUTH_SECRET=your_secret -e DB_HOSTNAME=db_hostname -e DB_USERNAME=db_username -e DB_PASSWORD=db_password -e DB_NAME=db_name backend-service
```

The docker compose file will run two containers (backend service and postgres db).

If you already have postgres setup in your local, you can proceed with the `docker run` command and modify the environment variables with your specification. (NOTE: this setup requires you to modify the postgres config to accept the backend service container address)

### Testing with code coverage

```bash
npm run test:cov
```

Currently, the test coverage is at 89%