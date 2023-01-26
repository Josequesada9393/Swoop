import express from 'express';
const app = express();
const cors = require('cors');
const { resolve } = require("path");
const {expressjwt: jwt} = require('express-jwt');
const jwks = require('jwks-rsa')
const axios = require('axios')

import router from './router';
import authRouter from './authrouter';
import auth from './middleware/auth';
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
// this unless path is not working
app.use(verifyJwt)

app.use(authRouter)

app.get('/protected', async (req, res) => {
  try {
    const accessToken = await req.headers.authorization.split(' ')[1]
    const response = await fetch('https://dev-sydr5gofiqca2n6a.us.auth0.com/userinfo', {
      headers: {
        authorization: `Bearer ${accessToken}`
      }
    });
    const userInfo = await response.json()
    console.log(userInfo)
    res.send(userInfo)
    res.json('hello from protected route');
  } catch (error) {

  }



});



app.get('*', (req, res) => {
  res.status(404).send('Sorry, not found');
});
app.listen(3006, () => console.log(`Server running on port ${3006};`));

