# simple-Blog-PERN

simple blog created with postgres-express-react-node.
You can try this project out at the following [url](https://simple-blog-pern.vercel.app/)

## Front

### Stack

- NodeJS 15
- yarn
- react 17

### Installation

Clone the repo locally

```bash
git clone <repo url>
```

go into the clone directory then go into the front subirectory

```bash
cd <repo url>/front/
```

install the dependencies

```bash
yarn
```

to start the project locally type

```bash
yarn start
```

the project will be available at the following url ```http://localhost:8080```.


## API

REST API deployed [here](https://blog-api-vde-guil.herokuapp.com/v1) or
access to swagger doc at this [url](https://blog-api-vde-guil.herokuapp.com/api-docs) to discover the different endpoints available.

### Stack

- NodeJS 15
- NPM
- PostgreSQL 13
- [Sqitch 0.9999](http://sqitch.org/download/)
- redis-server v6.2.1

Those tools are necessary for the good execution of the API.

### Installation

The repo should be already cloned, go into the back subfolder

```bash
cd api/
```

Then, once in the cloned directory, install the dependencies

```bash
npm i
```

Finally create a postgresql database and deploy the Sqitch project on it

```bash
createdb blog
sqitch deploy db:pg:blog
```

Please configure PostgreSQL (or provide the necessary environment variables) so that the `createdb` and `sqitch` command can execute properly.

### Environment variables

Don't forget to create .env file in your api folder following the example of the .env.example file

### Seeding

To insert some example data into your database, execute the script present in the api/data folder:
Once you have navigated to the correct folder, type:

```bash
node import.js
```

### Launch

```bash
npm start
```

### Test

To test the api, you can either open your browser and type in the url ```http://localhost:{portnumber}/v1/{router}``` or use a http tool like ```vscode REST client```, ```insomnia``` or ```postman```
