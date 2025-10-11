const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json');

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', (req, res) => {
  // Dynamically set the host based on the request
  const dynamicSwaggerDoc = { ...swaggerDocument };
  
  // Determine host from request
  const host = req.get('host');
  const protocol = req.protocol;
  
  dynamicSwaggerDoc.host = host;
  dynamicSwaggerDoc.schemes = [protocol];
  
  // Update OAuth authorization URL
  if (dynamicSwaggerDoc.securityDefinitions && dynamicSwaggerDoc.securityDefinitions.OAuth2) {
    dynamicSwaggerDoc.securityDefinitions.OAuth2.authorizationUrl = `${protocol}://${host}/auth/google`;
  }
  
  return swaggerUi.setup(dynamicSwaggerDoc)(req, res);
});

module.exports = router;