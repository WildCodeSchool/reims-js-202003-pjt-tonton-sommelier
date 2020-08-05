const connection = require('../server/db.js');

const Box = {};

Box.getAll = (callback) => {
   connection.query(
       'SELECT * FROM box',(err, results, fields)=> {
           callback(err, results, fields);
       }
   )
}

module.exports = Box;