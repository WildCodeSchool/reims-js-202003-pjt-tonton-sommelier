const express = require('express');
const connection = require('../server/db.js');

const router = express.Router();

/* ----- get all boxes ------*/

router.get('/',(req, res) =>{
    connection.query('SELECT * from box', (err, results) => {
      if (err) {
        res.status(500).send('Erreur lors de la récupération des coffrets');
      } else {
        res.status(200).json(results);
      }
    });
  });

/* ----- get a box by id ------*/

router.get('/:id', (req, res) => {
    const idBoxes = req.params.id;
    connection.query('SELECT * from box WHERE id = ?', idBoxes, (err, results) => {
      if (err) {
        res.status(500).send(`Erreur lors de la récupération d'un coffret`);
      } 
      if (results.length === 0) {
        return res.status(404).json('Coffret non trouvé');
      } else {
        res.json(results[0]);
      }
    });
});

/* ----- post a box ------*/

router.post('/', (req, res) => {
    const formData = req.body;
    if (formData.name == null || formData.name === '') {
      res.status(422).json("Le nom du coffret est mal renseigné");
    } else {
      connection.query('INSERT INTO box SET ?', formData, (err, results) => {
        if (err) {
          console.log(err);
          res.status(500).json("Erreur lors de la sauvegarde d'un coffret");
        } else {
          res.status(201).json({...formData, id:results.insertId });
        }
      });
    }
});

/* ----- put a box by id ------*/

router.put('/:id', (req, res) => {
    const idBoxes = req.params.id;
    const formData = req.body;
    if (formData.name == null || formData.name === '') {
      res.status(400).send("Les données sont mal renseigné");
    } else {
      connection.query('UPDATE box SET ? WHERE id=?' , [formData, idBoxes], (err, results) => {
        if (err) {
          console.log(err);
          res.status(500).send("Erreur lors de la sauvegarde d'un coffret");
        } else {
          res.status(200).send({...formData});
        }
      });
    }
});

/* ----- delet a box by id ------*/

router.delete('/:id', (req, res) => {
    const idBoxes = req.params.id;
    connection.query('DELETE FROM box WHERE id = ?', idBoxes, err => {
      if (err) {
        res.status(500).send(`Erreur lors de la suppression d'un coffret`);
      } else {
        res.status(204);
      }
    });
});
  

  module.exports = router;