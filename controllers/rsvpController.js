const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// Get all rsvp
const getAll = async (req, res) => {
  try {
    const response = await mongodb
      .getDatabase()
      .db()
      .collection('rsvp')
      .find()
      .toArray();

    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single rsvp
const getSingle = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json('Must use a valid rsvp id to find an rsvp.');
    }

    const rsvpId = new ObjectId(req.params.id);

    const response = await mongodb
      .getDatabase()
      .db()
      .collection('rsvp')
      .findOne({ _id: rsvpId });

    if (!response) {
      return res.status(404).json({ message: 'RSVP not found' });
    }

    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a single rsvp
const createRSVP = async (req, res) => {
  try {
    const eventId = new ObjectId(req.body.eventId);
    const eventExists = await mongodb
      .getDatabase()
      .db()
      .collection('events')
      .findOne({ _id: eventId });
    if (!eventExists) {
      return res.status(400).json({ message: 'Invalid eventId: event not found.' });
    }

    const rsvp = {
      eventId,
      userId: new ObjectId(req.session.user.id),
      status: req.body.status,
      guestCount: req.body.guestCount,
      note: req.body.note,
      createdAt: new Date(),
      updatedAt: null
    };

    const response = await mongodb.getDatabase().db().collection('rsvp').insertOne(rsvp);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the rsvp.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a single rsvp
const updateRSVP = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json('Must use a valid rsvp id to update an rsvp.');
    }

    const eventId = new ObjectId(req.body.eventId);
    const eventExists = await mongodb
      .getDatabase()
      .db()
      .collection('events')
      .findOne({ _id: eventId });
    if (!eventExists) {
      return res.status(400).json({ message: 'Invalid eventId: event not found.' });
    }


    const rsvpId = new ObjectId(req.params.id);
    const rsvp = {
      eventId,
      status: req.body.status,
      guestCount: req.body.guestCount,
      note: req.body.note,
      updatedAt: new Date()
    };

    const response = await mongodb
      .getDatabase()
      .db()
      .collection('rsvp')
      .replaceOne({ _id: rsvpId }, rsvp);

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the rsvp.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a single rsvp
const deleteRSVP = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json('Must use a valid rsvp id to delete an rsvp.');
    }
    
    const rsvpId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('rsvp').deleteOne({ _id: rsvpId });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the rsvp.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createRSVP,
  updateRSVP,
  deleteRSVP
};