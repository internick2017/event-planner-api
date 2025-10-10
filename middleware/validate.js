const Validator = require('validatorjs');

// EVENT VALIDATION RULES
const eventRules = {
  title: 'required|string|min:2',
  description: 'string|min:5',
  date: 'required|date',
  endDate: 'date',
  time: 'string',
  venueId: 'required|string',
  category: 'string',
  organizer: 'string|min:2',
  price: 'numeric|min:0',
  status: 'string|in:scheduled,cancelled,completed',
  createdAt: 'date',
  updatedAt: 'date'
};

// VENUE VALIDATION RULES
const venueRules = {
  name: 'required|string|min:2',
  address: 'required|string|min:5',
  city: 'required|string|min:2',
  state: 'string|min:2',
  country: 'string|min:2',
  zipcode: 'string|min:4',
  capacity: 'numeric|min:1',
  'contactInfo.phone': 'string',
  'contactInfo.email': 'email',
  'contactInfo.website': 'string',
  createdAt: 'date',
  updatedAt: 'date'
};

// GENERIC VALIDATION FUNCTION
function validate(rules) {
  return (req, res, next) => {
    const validation = new Validator(req.body, rules);

    if (validation.fails()) {
      return res.status(400).json({
        errors: validation.errors.all()
      });
    }
    next();
  };
}

module.exports = {
  saveEvent: validate(eventRules),
  saveVenue: validate(venueRules)
};