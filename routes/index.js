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

router.use('/rsvp',
  //#swagger.tags=['RSVP']
  require('./rsvp.js')
);

router.use('/users',
  //#swagger.tags=['Users']
  require('./users.js')
);

router.use('/auth',
  //#swagger.tags=['Authentication']
  require('./auth.js')
);

module.exports = router;
