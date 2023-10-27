require(`dotenv`).config()
const express = require(`express`)
const app = express()

const searchdata = require(`./router/search`);
const MovieDetail = require(`./router/movieId`);
const htmlContent = require(`./router/homePage`);

const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

app.use(express.static(`./public`));
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use(`/`, htmlContent);
app.use(`/api/v1/endpoint`, MovieDetail);
app.use(`/api/v1/endpoint`, searchdata);

app.use(
    rateLimiter({
        windowMs: 15 * 60 * 1000,
        max: 100,
        })
    );
app.use(helmet());
app.use(cors());
app.use(xss());

const port = process.env.PORT || 5000;
const start = async () => {
    try{
        app.listen(port,() => {
            console.log(`Server up and running...`);
            console.log(`http://localhost:5000`);
        })}
    catch(error){
        console.log(error);
    }
};
start();



