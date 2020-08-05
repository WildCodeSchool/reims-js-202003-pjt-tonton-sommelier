const express = require('express');
const router = express.Router();

const  { getAllBoxes } = require('../controllers/boxes-controller');

router.get('/', getAllBoxes);

module.exports = router;