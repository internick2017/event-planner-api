const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Event Planner API',
        description: 'API for managing events, users, venues, and RSVPs - CSE341 Web Services Course'
    },
    host: 'localhost:8080',
    schemes: ['http', 'https'],
    securityDefinitions: {
        OAuth2: {
            type: 'oauth2',
            authorizationUrl: 'http://localhost:8080/auth/google',
            flow: 'implicit',
            scopes: {
                read: 'Read access',
                write: 'Write access'
            }
        }
    }
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);