const express = require('express');
const router = express.Router();

const venuesController = require('../controllers/venuesController');
const validation = require('../middleware/validate');
const auth = require('../middleware/auth');

router.get('/', venuesController.getAll);
router.get('/:id', venuesController.getSingle);
router.post('/', auth.requireAuth, validation.saveVenue, venuesController.createVenue);
router.put('/:id', auth.requireAuth, validation.saveVenue, venuesController.updateVenue);
router.delete('/:id', auth.requireAuth, venuesController.deleteVenue);

module.exports = router;