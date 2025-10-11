const express = require('express');
const router = express.Router();

const eventsController = require('../controllers/eventsController');
const validation = require('../middleware/validate');
const auth = require('../middleware/auth');

router.get('/', eventsController.getAll);
router.get('/:id', eventsController.getSingle);
router.post('/', auth.requireAuth, validation.saveEvent, eventsController.createEvent);
router.put('/:id', auth.requireAuth, validation.saveEvent, eventsController.updateEvent);
router.delete('/:id', auth.requireAuth, eventsController.deleteEvent);

module.exports = router;