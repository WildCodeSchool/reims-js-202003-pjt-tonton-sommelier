require('dotenv').config();
const express = require('express');
const app = express();
const connection = require('./db.js');

/*----import routes------*/

const boxes = require('../routes/boxes.js');
const bottles = require('../routes/bottles')


app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.listen(process.env.PORT, (err) => {
  if (err) {
    throw new Error('Something bad happened...');
  }
  console.log(`Server is listening on ${process.env.PORT}`);
});
 
app.get('/',(req, res) =>{
  res.status(200).json('hello tonton sommelier');
});

/* ------------------------accès aux routes------------------------*/

app.use('/boxes', boxes);
app.use('/bottles', bottles);

/* ------------------------partie catégories ------------------------*/
app.get('/categories',(req, res) =>{
  connection.query('SELECT * from category', (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération des caégories');
    } else {
      res.status(200).json(results);
    }
  });
});

app.post('/categories', (req, res) => {
  const formData = req.body;
  if (formData.name == null || formData.name === '') {
    res.status(400).send("Le nom de la bouteille est mal renseigné");
  } else {
    connection.query('INSERT INTO category SET ?', formData, (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Erreur lors de la sauvegarde d'un coffret");
      } else {
        res.status(201).send({...formData});
      }
    });
  }
});

app.put('/categories/:id', (req, res) => {
  const idCategory = req.params.id;
  const formData = req.body;
  if (formData.name == null || formData.name === '') {
    res.status(400).send("Les données sont mal renseigné");
  } else {
    connection.query('UPDATE category SET ? WHERE id=?' , [formData, idCategory], (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Erreur lors de la sauvegarde d'une catégorie");
      } else {
        res.status(200).send({...formData});
      }
    });
  }
});

app.delete('/categories/:id', (req, res) => {
  const idCategory = req.params.id;
  connection.query('DELETE FROM category WHERE id = ?', idCategory, err => {
    if (err) {
      res.status(500).send(`Erreur lors de la suppression d'une catégorie`);
    } else {
      res.status(204);
    }
  });
});

/* ------------------------partie descriptions ------------------------*/
app.get('/descriptions',(req, res) =>{
  connection.query('SELECT * from description', (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération des descriptions');
    } else {
      res.status(200).json(results);
    }
  });
});

app.post('/descriptions', (req, res) => {
  const formData = req.body;
  if (formData.content == null || formData.content === '') {
    res.status(422).json("La description est mal renseignée");
  } else {
    connection.query('INSERT INTO description SET ?', formData, (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Erreur lors de la sauvegarde de la description");
      } else {
        res.status(201).send({...formData, id:results.insertId });
      }
    });
  }
});

app.put('/descriptions/:id', (req, res) => {
  const idDescription = req.params.id;
  const formData = req.body;
  if (formData.content == null || formData.content === '') {
    res.status(400).send("La description est mal renseignée");
  } else {
    connection.query('UPDATE description SET ? WHERE id = ?', [formData, idDescription], err => {
      if (err) {
        console.log(err);
        res.status(500).send("Erreur lors de la modification de la description");
      } else {
        res.status(200).send({...formData})
      } 
    });
  }
});

app.delete('/descriptions/:id', (req, res) => {
  const idDescription = req.params.id;
  connection.query('DELETE FROM description WHERE id = ?', [idDescription], err => {
    if (err) {
      res.status(500).send(`Erreur lors de la suppression de la description`);
    } else {
      res.status(204);
    }
  });
});

module.exports= app
