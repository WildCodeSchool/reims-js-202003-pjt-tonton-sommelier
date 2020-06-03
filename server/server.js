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
  res.status(200).send('hello world et tonton');
})

app.post('/boxes', (req, res) => {

  const formData = req.body;
  if (formData.name == null || formData.name === '') {
    res.status(400).send("Le nom du coffret est mal renseigné");
  } else {
    connection.query('INSERT INTO box SET ?', formData, (err, results) => {
      if (err) {
        console.log(err);
        res.status(400).send("Erreur lors de la sauvegarde d'une box");
      } else {
        res.sendStatus(201).send(res);
      }
    });
  }
});
