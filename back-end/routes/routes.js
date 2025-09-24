const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');


router.get('/dados', controller.addData);


router.get('/historico', controller.getAllData);

module.exports = router;