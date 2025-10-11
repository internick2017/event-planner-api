const requireAuth = (req, res, next) => {
  if (req.session && req.session.user) {
    return next();
  } else {
    return res.status(401).json({ 
      message: 'Authentication required. Please login first.',
      loginUrl: '/auth/google'
    });
  }
};

const requireAdmin = (req, res, next) => {
  if (req.session && req.session.user && req.session.user.role === 'admin') {
    return next();
  } else {
    return res.status(403).json({ 
      message: 'Admin privileges required.' 
    });
  }
};

module.exports = {
  requireAuth,
  requireAdmin
};