
const Box = require('../models/Box');

const getAllBoxes = (req, res, next) => {
   Box.getAll((err, results) => {
      if(err){
         console.log(err);
         res.sendStatus(500);
      } else { req.data = results }
      next();
   })
}

module.exports = { getAllBoxes };