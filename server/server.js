const express = require('express');
const app = express();
const port = 8000;

const connection = require('./conf');
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
    res.status(400).send("La description est mal renseignée");
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
      res.status(204).send(`Élément supprimé avec succès`);
    }
  });
});