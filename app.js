import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

//auth
import sessions from 'express-session'
import msIdExpress from 'microsoft-identity-express'

const appSettings = {
    appCredentials: {
        clientId:  "d1bbaab0-8693-4e42-bba2-a0b107b66aca",
        tenantId:  "f6b6dd5b-f02f-441a-99a0-162ac5060bd2",
        clientSecret:  "PVl8Q~pM0v3FXDkUpsGcKjNN0EG0LFJVGJlbVbMb"
    },	
    authRoutes: {
        redirect: "https://www.jinwookima4.me/redirect", //note: you can explicitly make this "localhost:3000/redirect" or "examplesite.me/redirect"
        //redirect: "http://localhost:3000/redirect",
        error: "/error", // the wrapper will redirect to this route in case of any error.
        unauthorized: "/unauthorized" // the wrapper will redirect to this route in case of unauthorized access attempt.
    }
};


//import usersRouter from './routes/users.js';
import apiRouter from './routes/api/v1/apiv1.js'
import apiRouter2 from './routes/api/v2/apiv2.js'
import apiRouter3 from './routes/api/v3/apiv3.js'
import models from './models.js'

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    req.models = models
    next();
})

//app.use('/users', usersRouter);

const oneDay = 1000 * 60 * 60 * 24
app.use(sessions({
    secret: "this is some secret key I am making up avweoirjskdl1234",
    saveUninitialized: true,
    cookie: {maxAge: oneDay},
    resave: false
}))

app.use((req, res, next) => {
    console.log("session info:", req.session)
    next()
})

app.use('/api/v1', apiRouter)
app.use('/api/v2', apiRouter2)
app.use('/api/v3', apiRouter3)

const msid = new msIdExpress.WebAppAuthClientBuilder(appSettings).build()
app.use(msid.initialize())

app.get('/signin', 
    msid.signIn({postLoginRedirect: '/'})
)

app.get('/signout',
    msid.signOut({postLogoutRedirect: '/'})
)

app.get('/error', (req, res) => {
    res.status(500).send("Error: Server error")
})

app.get('/unauthorized', (req, res) => {
    res.status(401).send("Error: Unauthorized")
})

export default app;
