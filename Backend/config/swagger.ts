import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'NTV OTT API Documentation',
    version: '1.0.0',
    description: 'API documentation for the NTV OTT platform',
    license: {
      name: 'Licensed Under MIT',
      url: 'https://spdx.org/licenses/MIT.html',
    },
    contact: {
      name: 'NTV OTT Support',
    },
  },
  servers: [
    {
      url: 'http://localhost:4000',
      description: 'Development server',
    },
  ],
  tags: [
    {
      name: 'Storage',
      description: 'Cloudflare R2 Storage operations'
    },
    {
      name: 'Videos',
      description: 'Video management operations'
    },
    {
      name: 'Playlists',
      description: 'Playlist management operations'
    }
  ]
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./routes/*.ts', './controllers/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec; 