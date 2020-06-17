const express = require('express');
const connection = require('../server/db.js');

const router = express.Router();

/* ----- GET all bottles ----- */

router.get('/',(req, res) =>{
    connection.query('SELECT * from bottle', (err, results) => {
      if (err) {
        res.status(500).send('Erreur lors de la récupération des coffrets');
      } else {
        res.status(200).json(results);
      }
    });
});

/* ----- GET bottle by ID ----- */

router.get('/:id', (req, res) => {
    const idBottles = req.params.id;
    connection.query('SELECT * from bottle WHERE id = ?', [idBottles], (err, results) => {
      if (err) {
        res.status(500).send(`Erreur lors de la récupération d'une bouteille`);
      } 
      if (results.length === 0) {
        return res.status(404).send('Bouteille non trouvée');
      } else {
        res.json(results[0]);
      }
    });
});

/* ----- POST a bottle ----- */

router.post('/', (req, res) => {
    const formData = req.body;
    if (formData.name == null || formData.name === '') {
      res.status(400).send("Le nom de la bouteille est mal renseigné");
    } else {
      connection.query('INSERT INTO bottle SET ?', formData, (err, results) => {
        if (err) {
          console.log(err);
          res.status(500).send("Erreur lors de la sauvegarde d'un coffret");
        } else {
          res.status(201).send({...formData});
        }
      });
    }
});

/* ----- PUT a bottle by ID ----- */

router.put('/:id', (req, res) => {
    const idCategory = req.params.id;
    const formData = req.body;
    if (formData.name == null || formData.name === '') {
      res.status(400).send("Les données sont mal renseigné");
    } else {
      connection.query('UPDATE bottle SET ? WHERE id=?' , [formData, idCategory], (err, results) => {
        if (err) {
          console.log(err);
          res.status(500).send("Erreur lors de la sauvegarde d'une catégorie");
        } else {
          res.status(200).send({...formData});
        }
      });
    }
});

/* ----- DELETE a bottle ----- */

router.delete('/:id', (req, res) => {
    const idBottles = req.params.id;
    connection.query('DELETE FROM bottle WHERE id = ?', idBottles, err => {
      if (err) {
        res.status(500).send(`Erreur lors de la suppression d'une bouteille`);
      } else {
        res.status(204);
      }
    });
});

module.exports = router;