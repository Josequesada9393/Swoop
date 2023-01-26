import express from 'express';
const app = express();
const cors = require('cors');
require('dotenv').config()

const {expressjwt: jwt} = require('express-jwt');
const jwks = require('jwks-rsa')


import router from './router';
import authRouter from './authrouter';

const PORT = process.env.PORT || 'dotenv not configured'

app.use(express.json());

const corsSettings = {origin: 'http://localhost:3000', credentials: true}
app.use(cors(corsSettings));

app.use('/uploads', express.static('uploads'))
app.use(router);

const verifyJwt = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://dev-sydr5gofiqca2n6a.us.auth0.com/.well-known/jwks.json'
  }),
  audience: 'this is a unique identifier',
  issuer: 'https://dev-sydr5gofiqca2n6a.us.auth0.com/',
  algorithms: ['RS256']
})

app.use(verifyJwt)

app.use(authRouter)

app.get('*', (req, res) => {
  res.status(404).send('Sorry, not found');
});
app.listen(PORT, () => console.log(`Server running on port ${PORT};`));

