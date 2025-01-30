const router = require('express').Router();
const appointmentsController = require('../controllers/appointments.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/', appointmentsController.getAppointments);
router.post('/', appointmentsController.createAppointment);
router.patch('/:id/status', appointmentsController.updateAppointmentStatus);

module.exports = router;