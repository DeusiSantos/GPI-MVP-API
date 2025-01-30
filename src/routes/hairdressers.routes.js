// src/routes/hairdressers.routes.js
const router = require('express').Router();
const hairdresserController = require('../controllers/hairdresser.controller');

// Certifique-se que as funções do controller existem antes de usar nas rotas
router.get('/', hairdresserController.getAllHairdressers);
router.get('/:id', hairdresserController.getHairdresserById);

module.exports = router;