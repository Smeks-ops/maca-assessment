
# Maca Assessment

A mono repo web app that allows an employee to submit required information for a purchase

## Getting the App Locally

1. Clone this repository with this command
```bash
git clone https://github.com/Smeks-ops/maca-assessment.git
```

## Installing the App

2. Install dependencies with this command in the home folder, the api-server folder and the client folder

```bash
npm install or yarn 
```

3. Ensure you have the local .env file for configuration parameters. A **sample.env** file is shown in the api-server folder directory for guide.

4. Run the client and api-server concurrently  from the parent folder using
```bash
npm run start or yarn start
```

## Running tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
