const express = require('express');
const app = express();
const cors = require('cors');
const mongodb = require('./data/database.js');
const bodyParser = require('body-parser');
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
    const db = mongodb.getDatabase().db();
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
    const { ObjectId } = require('mongodb');
    const db = mongodb.getDatabase().db();
    const user = await db.collection('users').findOne({ _id: new ObjectId(id) });
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

app
   .use(session({
     secret: process.env.SESSION_SECRET || 'your-secret-key',
     resave: false,
     saveUninitialized: false,
     cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }
   }))
   .use(passport.initialize())
   .use(passport.session())
   .use(bodyParser.json())
   .use(cors())
   .use(express.json())
   .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
  })
  .use((req, res, next) => {
    if (req.user) {
      req.session.user = req.user;
    }
    next();
  })
  .use('/', require('./routes'));

process.on('uncaughtException', (err, origin) => {
  console.log(`Caught exception: ${err}\nException origin: ${origin}`);
});

// Basic route
app.get('/', (req, res) => {
  res.send('Event Planner API - Team Project');
});

// TODO: Add swagger docs later
app.get('/api-docs', (req, res) => {
  res.send('API Documentation coming soon...');
});

// Connect to MongoDB 
mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Database connected — server running on port ${port}`);
    });
  }
});