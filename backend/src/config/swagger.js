const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'AI Learning Platform API',
            version: '1.0.0',
            description: 'API Documentation for the AI Learning Platform backend',
        },
        servers: [
            {
                url: 'http://localhost:5000',
                description: 'Development server',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
    },
    
    apis: ['./src/routes/*.js', './src/routes/api.js'], 
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;