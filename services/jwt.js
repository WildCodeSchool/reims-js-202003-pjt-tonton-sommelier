const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
require('dotenv').config();


const JWT_KEY = process.env.JWT_KEY

const createToken = user => (
   jwt.sign(
       { id: user.id },
       JWT_KEY,
       {
           expiresIn: 60 * 60 * 24,// or '24h' or '1 day'
       },
   )
);

const authenticateWithJwt = expressJwt({ 
    secret: JWT_KEY, 
    algorithms: ['HS256'] 
});
 
module.exports = { createToken, authenticateWithJwt };