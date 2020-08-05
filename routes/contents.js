const express = require('express');
const connection = require('../server/db.js');

const router = express.Router();


router.get('/', (req, res) => {
    connection.query('SELECT * from content', (err, results) => {
        if (err) {
            res.status(500).json('Erreur lors de la récupération des contents');
        } else {
            res.status(200).json(results);
        }
    });
});

router.get('/:id', (req, res) => {
    const idcontent = req.params.id
    connection.query('SELECT * FROM content WHERE id = ?', idcontent, (err, results) => {
        if (err) {
            res.status(500).json('Erreur lors de la récupération des contents');
        } else {
            res.status(200).json(results);
        }
    });
});

router.post('/', (req, res) => {
    const formData = req.body;
    if (formData.content == null || formData.content === '') {
        res.status(422).json("La content est mal renseignée");
    } else {
        connection.query('INSERT INTO content SET ?', formData, (err, results) => {
            if (err) {
                console.log(err);
                res.status(500).send("Erreur lors de la sauvegarde de la content");
            } else {
                res.status(201).send({ ...formData, id: results.insertId });
            }
        });
    }
});

router.put('/:id', (req, res) => {
    const idcontent = req.params.id;
    const formData = req.body;
    if (formData.content == null || formData.content === '') {
        res.status(422).json("La content est mal renseignée");
    } else {
        connection.query('UPDATE content SET ? WHERE id = ?', [formData, idcontent], err => {
            if (err) {
                console.log(err);
                res.status(500).send("Erreur lors de la modification de la content");
            } else {
                res.status(200).send({ ...formData })
            }
        });
    }
});

router.delete('/:id', (req, res) => {
    const idContent = req.params.id;
    connection.query('DELETE FROM content WHERE id = ?', idContent, err => {
        if (err) {
            res.status(500).send(`Erreur lors de la suppression du contenu`);
        } else {
            res.status(204);
        }
    });
});

module.exports = router;