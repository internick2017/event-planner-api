const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/failure' }),
  (req, res) => {
    res.redirect('/auth/success');
  }
);

router.get('/success', (req, res) => {
  if (req.session.user) {
    res.json({
      success: true,
      message: 'Successfully logged in',
      user: req.session.user
    });
  } else {
    res.redirect('/auth/failure');
  }
});

router.get('/failure', (req, res) => {
  res.status(401).json({
    success: false,
    message: 'Authentication failed'
  });
});

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Could not log out' });
    }
    res.json({ success: true, message: 'Logged out successfully' });
  });
});

router.get('/status', (req, res) => {
  if (req.session.user) {
    res.json({
      authenticated: true,
      user: req.session.user
    });
  } else {
    res.json({
      authenticated: false
    });
  }
});

module.exports = router;