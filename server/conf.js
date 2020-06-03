const  mysql = require('mysql');
const  connection = mysql.createConnection({
host :  'localhost', // adresse du serveur
user :  'root', // le nom d'utilisateur
password :  'FEVZNfevzn1.', // le mot de passe
database :  'tonton_sommelier', // le nom de la base de données
});
module.exports = connection;
