const express = require('express');
const router = express.Router();

const rsvpController = require('../controllers/rsvpController');
const validation = require('../middleware/validate');
const auth = require('../middleware/auth');

router.get('/',
  /*
  #swagger.tags = ['RSVP']
  #swagger.summary = 'Get all RSVPs'
  #swagger.description = 'Retrieve a list of all rsvps'
  #swagger.responses[200] = {
    description: 'Successful response',
    schema: {
      type: 'array',
      items: {
        $ref: '#/definitions/RSVP'
      }
    }
  }
  */
  rsvpController.getAll
);

router.get('/:id',
  /*
  #swagger.tags = ['RSVP']
  #swagger.summary = 'Get an rsvp by ID'
  #swagger.description = 'Retrieve a specific rsvp by its ID'
  #swagger.parameters['id'] = {
    in: 'path',
    required: true,
    type: 'string',
    description: 'RSVP ID'
  }
  #swagger.responses[200] = {
    description: 'Successful response',
    schema: { $ref: '#/definitions/RSVP' }
  }
  #swagger.responses[404] = {
    description: 'RSVP not found'
  }
  */
  rsvpController.getSingle
);

router.post('/',
  /*
  #swagger.tags = ['RSVP']
  #swagger.summary = 'Create a new rsvp'
  #swagger.description = 'Create a new rsvp. Requires authentication.'
  #swagger.security = [{ "OAuth2": [] }]
  #swagger.parameters['body'] = {
    in: 'body',
    description: 'RSVP object',
    required: true,
    schema: { $ref: '#/definitions/RSVP' }
  }
  #swagger.responses[201] = {
    description: 'RSVP created successfully',
    schema: { $ref: '#/definitions/RSVP' }
  }
  #swagger.responses[401] = {
    description: 'Unauthorized - Authentication required'
  }
  */
  auth.requireAuth, validation.saveRSVP, rsvpController.createRSVP
);

router.put('/:id',
  /*
  #swagger.tags = ['RSVP']
  #swagger.summary = 'Update an rsvp'
  #swagger.description = 'Update an existing rsvp by ID. Requires authentication.'
  #swagger.security = [{ "OAuth2": [] }]
  #swagger.parameters['id'] = {
    in: 'path',
    required: true,
    type: 'string',
    description: 'RSVP ID'
  }
  #swagger.parameters['body'] = {
    in: 'body',
    description: 'Updated rsvp object',
    required: true,
    schema: { $ref: '#/definitions/RSVP' }
  }
  #swagger.responses[204] = {
    description: 'RSVP updated successfully'
  }
  #swagger.responses[401] = {
    description: 'Unauthorized - Authentication required'
  }
  #swagger.responses[404] = {
    description: 'RSVP not found'
  }
  */
  auth.requireAuth, validation.saveRSVP, rsvpController.updateRSVP
);

router.delete('/:id',
  /*
  #swagger.tags = ['RSVP']
  #swagger.summary = 'Delete an rsvp'
  #swagger.description = 'Delete an rsvp by ID. Requires authentication.'
  #swagger.security = [{ "OAuth2": [] }]
  #swagger.parameters['id'] = {
    in: 'path',
    required: true,
    type: 'string',
    description: 'RSVP ID'
  }
  #swagger.responses[204] = {
    description: 'RSVP deleted successfully'
  }
  #swagger.responses[401] = {
    description: 'Unauthorized - Authentication required'
  }
  #swagger.responses[404] = {
    description: 'RSVP not found'
  }
  */
  auth.requireAuth, rsvpController.deleteRSVP
);

module.exports = router;