const express = require('express');
const router = express.Router();

const venuesController = require('../controllers/venuesController');
const validation = require('../middleware/validate');
const auth = require('../middleware/auth');

router.get('/',
  /*
  #swagger.tags = ['Venues']
  #swagger.summary = 'Get all venues'
  #swagger.description = 'Retrieve a list of all venues'
  #swagger.responses[200] = {
    description: 'Successful response',
    schema: {
      type: 'array',
      items: {
        $ref: '#/definitions/Venue'
      }
    }
  }
  */
  venuesController.getAll
);

router.get('/:id',
  /*
  #swagger.tags = ['Venues']
  #swagger.summary = 'Get a venue by ID'
  #swagger.description = 'Retrieve a specific venue by its ID'
  #swagger.parameters['id'] = {
    in: 'path',
    required: true,
    type: 'string',
    description: 'Venue ID'
  }
  #swagger.responses[200] = {
    description: 'Successful response',
    schema: { $ref: '#/definitions/Venue' }
  }
  #swagger.responses[404] = {
    description: 'Venue not found'
  }
  */
  venuesController.getSingle
);

router.post('/',
  /*
  #swagger.tags = ['Venues']
  #swagger.summary = 'Create a new venue'
  #swagger.description = 'Create a new venue. Requires authentication.'
  #swagger.security = [{ "OAuth2": [] }]
  #swagger.parameters['body'] = {
    in: 'body',
    description: 'Venue object',
    required: true,
    schema: { $ref: '#/definitions/Venue' }
  }
  #swagger.responses[201] = {
    description: 'Venue created successfully',
    schema: { $ref: '#/definitions/Venue' }
  }
  #swagger.responses[401] = {
    description: 'Unauthorized - Authentication required'
  }
  */
  auth.requireAuth, validation.saveVenue, venuesController.createVenue
);

router.put('/:id',
  /*
  #swagger.tags = ['Venues']
  #swagger.summary = 'Update a venue'
  #swagger.description = 'Update an existing venue by ID. Requires authentication.'
  #swagger.security = [{ "OAuth2": [] }]
  #swagger.parameters['id'] = {
    in: 'path',
    required: true,
    type: 'string',
    description: 'Venue ID'
  }
  #swagger.parameters['body'] = {
    in: 'body',
    description: 'Updated venue object',
    required: true,
    schema: { $ref: '#/definitions/Venue' }
  }
  #swagger.responses[204] = {
    description: 'Venue updated successfully'
  }
  #swagger.responses[401] = {
    description: 'Unauthorized - Authentication required'
  }
  #swagger.responses[404] = {
    description: 'Venue not found'
  }
  */
  auth.requireAuth, validation.saveVenue, venuesController.updateVenue
);

router.delete('/:id',
  /*
  #swagger.tags = ['Venues']
  #swagger.summary = 'Delete a venue'
  #swagger.description = 'Delete a venue by ID. Requires authentication.'
  #swagger.security = [{ "OAuth2": [] }]
  #swagger.parameters['id'] = {
    in: 'path',
    required: true,
    type: 'string',
    description: 'Venue ID'
  }
  #swagger.responses[204] = {
    description: 'Venue deleted successfully'
  }
  #swagger.responses[401] = {
    description: 'Unauthorized - Authentication required'
  }
  #swagger.responses[404] = {
    description: 'Venue not found'
  }
  */
  auth.requireAuth, venuesController.deleteVenue
);

module.exports = router;