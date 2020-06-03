const express = require('express');
const app = express();
const port = 8000;

app.listen(port, (err) => {
  if (err) {
    throw new Error('Something bad happened...');
  }
  console.log(`Server is listening on ${port}`);
});
 
app.get('/',(req, res) =>{
  res.status(200).send('hello world et tonton');
})

app.post('/',(req, res) =>{
  res.status(200).send('hello world et tonton');
})