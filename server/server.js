const express = require('express');
const app = express();
const port = 8000;
const connection = require('../conf');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, (err) => {
  if (err) {
    throw new Error('Something bad happened...');
  }
  console.log(`Server is listening on ${port}`);
});
 
app.get('/',(req, res) =>{
  res.status(200).send('hello tonton sommelier');
});

app.get('/boxes',(req, res) =>{
  connection.query('SELECT * from box', (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération des coffrets');
    } else {
      res.status(200).json(results);
    }
  });
});

app.get('/boxes/:id', (req, res) => {
  const idBoxes = req.params.id;
  connection.query('SELECT * from box WHERE id = ?', [idBoxes], (err, results) => {
    if (err) {
      res.status(500).send(`Erreur lors de la récupération d'un coffret`);
    } 
    if (results.length === 0) {
      return res.status(404).send('Coffret non trouvé');
    } else {
      res.json(results[0]);
    }
  });
});

app.post('/boxes', (req, res) => {
  const formData = req.body;
  if (formData.name == null || formData.name === '') {
    res.status(400).send("Le nom du coffret est mal renseigné");
  } else {
    connection.query('INSERT INTO box SET ?', formData, (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Erreur lors de la sauvegarde d'un coffret");
      } else {
        res.status(201).send({...formData, id:results.insertId });
      }
    });
  }
});

app.put('/coffrets/:id', (req, res) => {

  // récupération des données envoyées
  const idBoxes = req.params.id;
  const formData = req.body;

  // connection à la base de données, et insertion dans le coffret
  connection.query('UPDATE box SET ? WHERE id = ?', [formData, idBoxes], err => {

    if (err) {
      // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      console.log(err);
      res.status(500).send("Erreur lors de la modification d'un coffret");
    } else {

      // Si tout s'est bien passé, on envoie un statut "ok".
      res.sendStatus(200);
  res.status(200).send('hello tonton sommelier')} 
    });
});

app.get('/bottles',(req, res) =>{
  connection.query('SELECT * from bottle', (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération des coffrets');
    } else {
      res.status(200).json(results);
    }
  });
});

app.post('/bottles', (req, res) => {
  const formData = req.body;
  if (formData.name == null || formData.name === '') {
    res.status(400).send("Le nom de la bouteille est mal renseigné");
  } else {
    connection.query('INSERT INTO bottle SET ?', formData, (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Erreur lors de la sauvegarde d'un coffret");
      } else {
        res.status(201).send({...formData, id:results.insertId });
      }
    });
  }
});

app.put('/bottles/:id', (req, res) => {
  const idBoxes = req.params.id;
  const formData = req.body;
  if (formData.name == null || formData.name === '') {
    res.status(400).send("Le données sont mal renseigné");
  } else {
    connection.query('UPDATE bottle SET ? WHERE id=?' , formData, idBoxes, (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Erreur lors de la sauvegarde d'un coffret");
      } else {
        res.status(201).send({...formData, id:results.insertId });
      }
    });
  }
});