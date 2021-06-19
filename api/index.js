require('dotenv').config();
const express = require('express');
const router = require('./app/router');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.use(cors());
app.use('/v1', router);

const expressSwagger = require('express-swagger-generator')(app);

console.log(__dirname);

let options = {
    swaggerDefinition: {
        info: {
            description: 'blog REST API - blogging app api',
            title: 'blog',
            version: '1.0.0',
        },
        host: process.env.URL ||"localhost:"+port,
        basePath: '/v1',
        produces: [
            "application/json",
        ],
        consumes: [
            "application/json",
        ],
        schemes: ['https'],
        securityDefinitions: {
            JWT: {
                // type: 'apiKey',
                // in: 'header',
                // name: 'Authorization',
                // description: "",
            }
        }
    },
    basedir: __dirname, //app absolute path
    files: [
        './app/model/*.js',
        './app/router.js'
        ] //Path to the API handle folder
};
expressSwagger(options)

app.listen(port, () => {
    console.log(`listening to ${process.env.URL || "http://localhost:" + port}`);
});