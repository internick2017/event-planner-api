const swaggerAutogen = require('swagger-autogen')();

// Use environment variables or defaults
const host = process.env.RENDER_EXTERNAL_URL 
  ? process.env.RENDER_EXTERNAL_URL.replace('https://', '').replace('http://', '')
  : 'localhost:8080';
const scheme = process.env.RENDER_EXTERNAL_URL ? 'https' : 'http';

console.log('Swagger Config:', { host, scheme, renderUrl: process.env.RENDER_EXTERNAL_URL });

const doc = {
    info: {
        title: 'Event Planner API',
        description: 'API for managing events, users, venues, and RSVPs - CSE341 Web Services Course'
    },
    host: host,
    schemes: [scheme],
    securityDefinitions: {
        OAuth2: {
            type: 'oauth2',
            authorizationUrl: `${scheme}://${host}/auth/google`,
            flow: 'implicit',
            scopes: {
                read: 'Read access',
                write: 'Write access'
            }
        }
    },
    definitions: {
        User: {
            type: 'object',
            example: {
                "_id": "672a1b2c3d4e5f6789012347",
                "firstName": "John",
                "lastName": "Doe",
                "email": "john.doe@example.com",
                "dateOfBirth": "1990-05-15",
                "phoneNumber": "+1-801-555-0123",
                "address": {
                    "street": "456 Oak Avenue",
                    "city": "Provo",
                    "state": "Utah",
                    "zipCode": "84604",
                    "country": "United States"
                },
                "preferences": {
                    "eventCategories": ["Music", "Sports", "Technology"],
                    "notifications": true
                }
            },
            properties: {
                _id: {
                    type: 'string',
                    example: '672a1b2c3d4e5f6789012347'
                },
                firstName: {
                    type: 'string',
                    example: 'John'
                },
                lastName: {
                    type: 'string',
                    example: 'Doe'
                },
                email: {
                    type: 'string',
                    format: 'email',
                    example: 'john.doe@example.com'
                },
                dateOfBirth: {
                    type: 'string',
                    format: 'date',
                    example: '1990-05-15'
                },
                phoneNumber: {
                    type: 'string',
                    example: '+1-801-555-0123'
                },
                address: {
                    type: 'object',
                    properties: {
                        street: { type: 'string', example: '456 Oak Avenue' },
                        city: { type: 'string', example: 'Provo' },
                        state: { type: 'string', example: 'Utah' },
                        zipCode: { type: 'string', example: '84604' },
                        country: { type: 'string', example: 'United States' }
                    }
                },
                preferences: {
                    type: 'object',
                    properties: {
                        eventCategories: {
                            type: 'array',
                            items: { type: 'string' },
                            example: ['Music', 'Sports', 'Technology']
                        },
                        notifications: {
                            type: 'boolean',
                            example: true
                        }
                    }
                }
            }
        },
        Event: {
            type: 'object',
            example: {
                "_id": "672a1b2c3d4e5f6789012345",
                "title": "Summer Music Festival 2025",
                "description": "A three-day outdoor music festival featuring local and international artists",
                "date": "2025-07-15",
                "endDate": "2025-07-17",
                "time": "18:00",
                "venueId": "672a1b2c3d4e5f6789012346",
                "category": "Music",
                "organizer": "EventCorp Productions",
                "price": 89.99,
                "status": "scheduled"
            },
            properties: {
                _id: { type: 'string', example: '672a1b2c3d4e5f6789012345' },
                title: { type: 'string', example: 'Summer Music Festival 2025' },
                description: { type: 'string', example: 'A three-day outdoor music festival featuring local and international artists' },
                date: { type: 'string', format: 'date', example: '2025-07-15' },
                endDate: { type: 'string', format: 'date', example: '2025-07-17' },
                time: { type: 'string', example: '18:00' },
                venueId: { type: 'string', example: '672a1b2c3d4e5f6789012346' },
                category: { type: 'string', example: 'Music' },
                organizer: { type: 'string', example: 'EventCorp Productions' },
                price: { type: 'number', example: 89.99 },
                status: { type: 'string', enum: ['scheduled', 'cancelled', 'completed'], example: 'scheduled' }
            }
        },
        Venue: {
            type: 'object',
            example: {
                "_id": "672a1b2c3d4e5f6789012346",
                "name": "Grand Convention Center",
                "address": "123 Main Street",
                "city": "Provo",
                "state": "Utah",
                "country": "United States",
                "zipcode": "84604",
                "capacity": 2500,
                "contactInfo": "info@grandconvention.com | (801) 555-0123"
            },
            properties: {
                _id: { type: 'string', example: '672a1b2c3d4e5f6789012346' },
                name: { type: 'string', example: 'Grand Convention Center' },
                address: { type: 'string', example: '123 Main Street' },
                city: { type: 'string', example: 'Provo' },
                state: { type: 'string', example: 'Utah' },
                country: { type: 'string', example: 'United States' },
                zipcode: { type: 'string', example: '84604' },
                capacity: { type: 'number', example: 2500 },
                contactInfo: { type: 'string', example: 'info@grandconvention.com | (801) 555-0123' }
            }
        },
        Error: {
            type: 'object',
            properties: {
                message: {
                    type: 'string',
                    example: 'Resource not found'
                }
            }
        }
    }
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);