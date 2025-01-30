// src/routes/services.routes.js
const router = require('express').Router();
const servicesController = require('../controllers/services.controller');


router.get('/', servicesController.getAllServices);
router.post('/', servicesController.createService);
router.put('/:id', servicesController.updateService);
router.delete('/:id', servicesController.deleteService);
router.patch('/:id/status', servicesController.updateServiceStatus);
router.get('/by-hairdresser', servicesController.getServicesByHairdresser); // Nova rota
module.exports = router;