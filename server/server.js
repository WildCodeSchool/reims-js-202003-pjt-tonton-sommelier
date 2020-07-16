require('dotenv').config();
const express = require('express');
const app = express();
const connection = require('./db.js');
const cors = require('cors');
const bcrypt = require('bcrypt');
const { createToken } = require('../services/jwt');
const { authenticateWithJwt } = require('../services/jwt');


/*----import routes------*/

const boxes = require('../routes/boxes.js');
const bottles = require('../routes/bottles')
const categories = require('../routes/categories')
const contents = require('../routes/contents')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())


app.listen(process.env.PORT, (err) => {
  if (err) {
    throw new Error('Something bad happened...');
  }
  console.log(`Server is listening on ${process.env.PORT}`);
});
 
app.get('/', authenticateWithJwt, (req, res) =>{
  res.status(200).json('hello tonton sommelier');
});


app.use('/boxes',authenticateWithJwt, boxes);
app.use('/bottles',authenticateWithJwt, bottles);
app.use('/categories',authenticateWithJwt, categories);
app.use('/contents' ,authenticateWithJwt, contents);

/* ------------------------ box_category------------------------*/

app.get('/box_category',(req, res) =>{
  const sqlComande = "select box.name as box, category.name as category from box_category join box on box.id =box_category.box_id join category on category.id = box_category.category_id where box.name = ? AND category.name = ?;"
  connection.query(sqlComande, [req.body.box, req.body.category], (err, results) => {
    if (err) {
      res.status(500).json('Erreur lors de la récupération des informations');
    } else {
      res.status(200).json(results);
    }
  });
});


/* ------------------------ category_content------------------------*/

app.get('/categories/:categoryId/contents/difficulties/:difficultiesId',(req, res) =>{
  const sqlComande = "select category_id, category.name as category, choix, content, type, réponse, difficulté from category_content join category on category.id=category_content.category_id join content on content.id=category_content.content_id where type=? and  category_id=? and difficulté=?;"
  const typeOfContent = req.query.type
  const CategoryId = req.params.categoryId
  const difficultiesId = req.params.difficultiesId

  connection.query(sqlComande, [typeOfContent,CategoryId, difficultiesId],(err, results) => {
    if (err) {
      res.status(500).json('Erreur lors de la récupération des informations');
    } else {
      res.status(200).json(results);
    }
  });
});

/* ------------------------ UserRegister / login------------------------*/

app.post('/users/register', (req, res) => {
  const formData = req.body;
  
  if ((formData.username == null || formData.username === '') || (formData.password == null || formData.password === '')) {
    res.status(422).json("Vous vous êtes mal enregistré");
  } else {
    connection.query('SELECT * FROM user where username = ?', formData.username, (err, results)=> {
      if ( results[0] != null) {
        res.status(500).json({message: "Username deja utilisé"});
      } else {
        bcrypt.hash(formData.password, 10, function(err, hash) {
          formData.password = hash
          connection.query('INSERT INTO user SET ?', formData, (err, results) => {
            if (err) {
              console.log(err);
              res.status(500).send("Erreur lors de l'enregistrement");
            } else {
              res.status(201).send({...formData, password: null, id:results.insertId });
            }
          });    
        });
      }
    })
  }
});

app.post('/users/login', (req, res) => {
  const {username, password} = req.body;
  if ((username == null || username === '') || (password == null || password === '')) {
    res.status(422).json("E-Mail ou Mot de passe incorrect");
  } else {
    connection.query('SELECT password FROM user WHERE username = ? ', username ,(err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Erreur lors de l'authentification");
      } else if (results[0] == null) {
        res.status(400).send("Cet utilisateur n'existe pas");
      } else {
        const hash = results[0].password;
        bcrypt.compare(password, hash, function(err, same) {
          if(same) {
            const token = createToken(username)
            res.json({
              username,
              token,
            });
          } else {
            res.status(400).send("connexion refusée");
          } 
        });
      }
    });
  }
});

module.exports= app
