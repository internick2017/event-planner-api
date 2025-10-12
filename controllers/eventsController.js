const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// Get all events
const getAll = async (req, res) => {
  try {
    const response = await mongodb
      .getDatabase()
      .db()
      .collection('events')
      .find()
      .toArray();

    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single event
const getSingle = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json('Must use a valid event id to find an event.');
    }

    const eventId = new ObjectId(req.params.id);

    const response = await mongodb
      .getDatabase()
      .db()
      .collection('events')
      .findOne({ _id: eventId });

    if (!response) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a single event
const createEvent = async (req, res) => {
  try {
    const venueId = new ObjectId(req.body.venueId);
    const venueExists = await mongodb
      .getDatabase()
      .db()
      .collection('venues')
      .findOne({ _id: venueId });
    if (!venueExists) {
      return res.status(400).json({ message: 'Invalid venueId: venue not found.' });
    }

    const event = {
      title: req.body.title,
      description: req.body.description,
      date: req.body.date,
      endDate: req.body.endDate,
      time: req.body.time,
      venueId,
      category: req.body.category,
      organizer: req.session.user.username,
      price: req.body.price,
      status: req.body.status,
      createdAt: new Date(),
      updatedAt: null
    };

    const response = await mongodb.getDatabase().db().collection('events').insertOne(event);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the event.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a single event
const updateEvent = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json('Must use a valid event id to update an event.');
    }

    const venueId = new ObjectId(req.body.venueId);
    const venueExists = await mongodb
      .getDatabase()
      .db()
      .collection('venues')
      .findOne({ _id: venueId });
    if (!venueExists) {
      return res.status(400).json({ message: 'Invalid venueId: venue not found.' });
    }

    const eventId = new ObjectId(req.params.id);
    const event = {
      title: req.body.title,
      description: req.body.description,
      date: req.body.date,
      endDate: req.body.endDate,
      time: req.body.time,
      venueId,
      category: req.body.category,
      organizer: req.session.user.username,
      price: req.body.price,
      status: req.body.status,
      updatedAt: new Date()
    };

    const response = await mongodb
      .getDatabase()
      .db()
      .collection('events')
      .replaceOne({ _id: eventId }, event);

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the event.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a single event
const deleteEvent = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json('Must use a valid event id to delete an event.');
    }
    
    const eventId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('events').deleteOne({ _id: eventId });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the event.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createEvent,
  updateEvent,
  deleteEvent
};