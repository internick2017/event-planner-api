const express = require('express');
const app = express();
const cors = require('cors');
const mongodb = require('./data/database.js');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();

const port = process.env.PORT || 8080;

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL || "/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let database;
    try {
      database = mongodb.getDatabase();
    } catch (dbError) {
      const tempUser = {
        _id: 'temp_' + profile.id,
        googleId: profile.id,
        username: profile.displayName.replace(/\s+/g, '').toLowerCase(),
        email: profile.emails[0].value,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        role: 'user',
        createdAt: new Date(),
        updatedAt: null,
        isTemporary: true
      };
      return done(null, tempUser);
    }

    const db = database.db();
    let user = await db.collection('users').findOne({ googleId: profile.id });
    
    if (user) {
      return done(null, user);
    } else {
      const newUser = {
        googleId: profile.id,
        username: profile.displayName.replace(/\s+/g, '').toLowerCase(),
        email: profile.emails[0].value,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        role: 'user',
        createdAt: new Date(),
        updatedAt: null
      };
      
      const result = await db.collection('users').insertOne(newUser);
      newUser._id = result.insertedId;
      return done(null, newUser);
    }
  } catch (error) {
    return done(error, null);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    if (typeof id === 'string' && id.startsWith('temp_')) {
      const tempUser = {
        _id: id,
        googleId: id.replace('temp_', ''),
        isTemporary: true,
        username: 'tempuser',
        email: 'temp@example.com',
        firstName: 'Temp',
        lastName: 'User',
        role: 'user'
      };
      return done(null, tempUser);
    }

    let database;
    try {
      database = mongodb.getDatabase();
    } catch (dbError) {
      return done(null, null);
    }

    const { ObjectId } = require('mongodb');
    const db = database.db();
    const user = await db.collection('users').findOne({ _id: new ObjectId(id) });
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

app
   .use(express.static('public'))
   .use(session({
     secret: process.env.SESSION_SECRET || (() => {
       if (process.env.NODE_ENV !== 'test') console.warn('WARNING: SESSION_SECRET not set, using insecure default');
       return 'dev-fallback-secret-change-in-production';
     })(),
     resave: false,
     saveUninitialized: false,
     cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }
   }))
   .use(passport.initialize())
   .use(passport.session())
   .use(express.json())
   .use(cors())
   .use((req, res, next) => {
    if (req.user) {
      req.session.user = req.user;
    }
    next();
  });

app.get('/', (req, res) => {
  res.send(`
    <h1>Event Planner API</h1>
    <p><a href="/api-docs">API Documentation</a></p>
  `);
});

app.use('/', require('./routes'));

mongodb.initDb((err) => {
  if (err) {
    console.log('MongoDB connection error:', err.message);
    console.log('Starting server without database...');
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } else {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  }
});