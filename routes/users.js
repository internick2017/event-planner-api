const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const validation = require('../middleware/validate');
const auth = require('../middleware/auth');

router.get('/',
  /*
  #swagger.tags = ['Users']
  #swagger.summary = 'Get all users'
  #swagger.description = 'Retrieve a list of all users'
  #swagger.responses[200] = {
    description: 'Successful response',
    schema: {
      type: 'array',
      items: {
        $ref: '#/definitions/User'
      }
    }
  }
  */
  usersController.getAll
);

router.get('/:id',
  /*
  #swagger.tags = ['Users']
  #swagger.summary = 'Get a user by ID'
  #swagger.description = 'Retrieve a specific user by their ID'
  #swagger.parameters['id'] = {
    in: 'path',
    required: true,
    type: 'string',
    description: 'User ID'
  }
  #swagger.responses[200] = {
    description: 'Successful response',
    schema: { $ref: '#/definitions/User' }
  }
  #swagger.responses[404] = {
    description: 'User not found'
  }
  */
  usersController.getSingle
);

router.post('/',
  /*
  #swagger.tags = ['Users']
  #swagger.summary = 'Create a new user'
  #swagger.description = 'Create a new user. Requires authentication.'
  #swagger.security = [{ "OAuth2": [] }]
  #swagger.parameters['body'] = {
    in: 'body',
    description: 'User object',
    required: true,
    schema: { $ref: '#/definitions/User' }
  }
  #swagger.responses[201] = {
    description: 'User created successfully',
    schema: { $ref: '#/definitions/User' }
  }
  #swagger.responses[401] = {
    description: 'Unauthorized - Authentication required'
  }
  */
  auth.requireAuth, validation.saveUser, usersController.createUser
);

router.put('/:id',
  /*
  #swagger.tags = ['Users']
  #swagger.summary = 'Update a user'
  #swagger.description = 'Update an existing user by ID. Requires authentication.'
  #swagger.security = [{ "OAuth2": [] }]
  #swagger.parameters['id'] = {
    in: 'path',
    required: true,
    type: 'string',
    description: 'User ID'
  }
  #swagger.parameters['body'] = {
    in: 'body',
    description: 'Updated user object',
    required: true,
    schema: { $ref: '#/definitions/User' }
  }
  #swagger.responses[204] = {
    description: 'User updated successfully'
  }
  #swagger.responses[401] = {
    description: 'Unauthorized - Authentication required'
  }
  #swagger.responses[404] = {
    description: 'User not found'
  }
  */
  auth.requireAuth, validation.saveUser, usersController.updateUser
);

router.delete('/:id',
  /*
  #swagger.tags = ['Users']
  #swagger.summary = 'Delete a user'
  #swagger.description = 'Delete a user by ID. Requires authentication.'
  #swagger.security = [{ "OAuth2": [] }]
  #swagger.parameters['id'] = {
    in: 'path',
    required: true,
    type: 'string',
    description: 'User ID'
  }
  #swagger.responses[204] = {
    description: 'User deleted successfully'
  }
  #swagger.responses[401] = {
    description: 'Unauthorized - Authentication required'
  }
  #swagger.responses[404] = {
    description: 'User not found'
  }
  */
  auth.requireAuth, usersController.deleteUser
);

module.exports = router;