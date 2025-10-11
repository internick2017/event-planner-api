const express = require('express');
const router = express.Router();

const eventsController = require('../controllers/eventsController');
const validation = require('../middleware/validate');
const auth = require('../middleware/auth');

router.get('/',
  /*
  #swagger.tags = ['Events']
  #swagger.summary = 'Get all events'
  #swagger.description = 'Retrieve a list of all events'
  #swagger.responses[200] = {
    description: 'Successful response',
    schema: {
      type: 'array',
      items: {
        $ref: '#/definitions/Event'
      }
    }
  }
  */
  eventsController.getAll
);

router.get('/:id',
  /*
  #swagger.tags = ['Events']
  #swagger.summary = 'Get an event by ID'
  #swagger.description = 'Retrieve a specific event by its ID'
  #swagger.parameters['id'] = {
    in: 'path',
    required: true,
    type: 'string',
    description: 'Event ID'
  }
  #swagger.responses[200] = {
    description: 'Successful response',
    schema: { $ref: '#/definitions/Event' }
  }
  #swagger.responses[404] = {
    description: 'Event not found'
  }
  */
  eventsController.getSingle
);

router.post('/',
  /*
  #swagger.tags = ['Events']
  #swagger.summary = 'Create a new event'
  #swagger.description = 'Create a new event. Requires authentication.'
  #swagger.security = [{ "OAuth2": [] }]
  #swagger.parameters['body'] = {
    in: 'body',
    description: 'Event object',
    required: true,
    schema: { $ref: '#/definitions/Event' }
  }
  #swagger.responses[201] = {
    description: 'Event created successfully',
    schema: { $ref: '#/definitions/Event' }
  }
  #swagger.responses[401] = {
    description: 'Unauthorized - Authentication required'
  }
  */
  auth.requireAuth, validation.saveEvent, eventsController.createEvent
);

router.put('/:id',
  /*
  #swagger.tags = ['Events']
  #swagger.summary = 'Update an event'
  #swagger.description = 'Update an existing event by ID. Requires authentication.'
  #swagger.security = [{ "OAuth2": [] }]
  #swagger.parameters['id'] = {
    in: 'path',
    required: true,
    type: 'string',
    description: 'Event ID'
  }
  #swagger.parameters['body'] = {
    in: 'body',
    description: 'Updated event object',
    required: true,
    schema: { $ref: '#/definitions/Event' }
  }
  #swagger.responses[204] = {
    description: 'Event updated successfully'
  }
  #swagger.responses[401] = {
    description: 'Unauthorized - Authentication required'
  }
  #swagger.responses[404] = {
    description: 'Event not found'
  }
  */
  auth.requireAuth, validation.saveEvent, eventsController.updateEvent
);

router.delete('/:id',
  /*
  #swagger.tags = ['Events']
  #swagger.summary = 'Delete an event'
  #swagger.description = 'Delete an event by ID. Requires authentication.'
  #swagger.security = [{ "OAuth2": [] }]
  #swagger.parameters['id'] = {
    in: 'path',
    required: true,
    type: 'string',
    description: 'Event ID'
  }
  #swagger.responses[204] = {
    description: 'Event deleted successfully'
  }
  #swagger.responses[401] = {
    description: 'Unauthorized - Authentication required'
  }
  #swagger.responses[404] = {
    description: 'Event not found'
  }
  */
  auth.requireAuth, eventsController.deleteEvent
);

module.exports = router;