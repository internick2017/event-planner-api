const express = require('express');
const router = express.Router();

const venuesController = require('../controllers/venuesController');
const validation = require('../middleware/validate')

// Venues Routes
router.get('/', venuesController.getAll);
router.get('/:id', venuesController.getSingle);
router.post('/', validation.saveVenue, venuesController.createVenue);
router.put('/:id', validation.saveVenue, venuesController.updateVenue);
router.delete('/:id', venuesController.deleteVenue);

module.exports = router;