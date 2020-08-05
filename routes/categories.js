const express = require('express');
const connection = require('../server/db.js');

const router = express.Router();

router.get('/',(req, res) =>{
    connection.query('SELECT * from category', (err, results) => {
    if (err) {
        res.status(500).send('Erreur lors de la récupération des caégories');
    } else {
        res.status(200).json(results);
    }
    });
});

router.post('/', (req, res) => {
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

router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
    const idCategory = req.params.id;
    connection.query('DELETE FROM category WHERE id = ?', idCategory, err => {
    if (err) {
        res.status(500).send(`Erreur lors de la suppression d'une catégorie`);
    } else {
        res.status(204);
    }
    });
});

module.exports = router;