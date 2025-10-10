const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Event Planner API',
        description: 'API for managing events, users, venues, and RSVPs - CSE341 Web Services Course'
    },
    host: 'event-planner-api.onrender.com',
    schemes:['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);