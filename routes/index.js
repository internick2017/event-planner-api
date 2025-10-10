const router = require('express').Router();

router.use('/',
  //#swagger.tags=['Default']
  require('./swagger.js')
);

router.get('/',
  //#swagger.tags=['Default']
  (req, res) => {
    res.send('Hi there, use the /api-docs route');
  }
);

router.use('/events',
  //#swagger.tags=['Events']
  require('./events.js')
);

router.use('/venues',
  //#swagger.tags=['Venues']
  require('./venues.js')
);

module.exports = router;
