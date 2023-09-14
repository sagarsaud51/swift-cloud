import { Application } from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

export const initSwagger = (app: Application) => {
    const options = {
        definition: {
            openapi: '3.0.0',
            info: {
                title: 'SWFIT CLOUD',
                version: '1.0.0',
                description: 'Swift cloud api definations',
            },
            schemes: ['http', 'https'],
            servers: [{ url: 'http://localhost:3000/' }],
        },
        apis: ['./**/*.ts'],
    };
    const swaggerSpec = swaggerJSDoc(options);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.get('/docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });
};
