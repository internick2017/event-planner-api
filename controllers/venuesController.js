const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// Get all venues
const getAll = async (req, res) => {
  try {
    const response = await mongodb
      .getDatabase()
      .db()
      .collection('venues')
      .find()
      .toArray();

    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single venue
const getSingle = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json('Must use a valid venue id to find a venue.');
    }

    const venueId = new ObjectId(req.params.id);

    const result = await mongodb
      .getDatabase()
      .db()
      .collection('venues')
      .findOne({ _id: venueId });

    if (!result) {
      return res.status(404).json({ message: 'Venue not found' });
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create venue
const createVenue = async (req, res) => {
  try {
    const venue = {
      name: req.body.name,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      country: req.body.country,
      zipcode: req.body.zipcode,
      capacity: req.body.capacity,
      contactInfo: req.body.contactInfo,
      createdAt: new Date(),
      updatedAt: null
    };
    const response = await mongodb
      .getDatabase()
      .db()
      .collection('venues')
      .insertOne(venue);

    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the venue.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update venue
const updateVenue = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json('Must use a valid venue id to update a venue.');
    }

    const venueId = new ObjectId(req.params.id);
    const venue = {
      name: req.body.name,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      country: req.body.country,
      zipcode: req.body.zipcode,
      capacity: req.body.capacity,
      contactInfo: req.body.contactInfo,
      updatedAt: new Date()
    };
    const response = await mongodb
      .getDatabase()
      .db()
      .collection('venues')
      .replaceOne({ _id: venueId }, venue);

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Venue not found or no changes applied' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete venue
const deleteVenue = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json('Must use a valid venue id to delete a venue.');
    }

    const venueId = new ObjectId(req.params.id);

    const response = await mongodb
      .getDatabase()
      .db()
      .collection('venues')
      .deleteOne({ _id: venueId });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Venue not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createVenue,
  updateVenue,
  deleteVenue
};
