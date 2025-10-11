const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const validation = require('../middleware/validate');
const auth = require('../middleware/auth');

router.get('/', usersController.getAll);
router.get('/:id', usersController.getSingle);
router.post('/', auth.requireAuth, validation.saveUser, usersController.createUser);
router.put('/:id', auth.requireAuth, validation.saveUser, usersController.updateUser);
router.delete('/:id', auth.requireAuth, usersController.deleteUser);

module.exports = router;