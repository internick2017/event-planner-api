const rsvpController = require('../controllers/rsvpController');
const mongodb = require('../data/database');

jest.mock('../data/database');

describe('RSVP Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAll', () => {
    it('should return all rsvps successfully', async () => {
      const mockRSVP = [{ _id: '1', title: 'Test RSVP' }];
      const mockFind = jest.fn().mockReturnValue({
        toArray: jest.fn().mockResolvedValue(mockRSVP)
      });
      
      mongodb.getDatabase.mockReturnValue({
        db: jest.fn().mockReturnValue({
          collection: jest.fn().mockReturnValue({
            find: mockFind
          })
        })
      });

      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await rsvpController.getAll(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockRSVP);
    });

    it('should handle errors', async () => {
      const errorMessage = 'Database error';
      mongodb.getDatabase.mockImplementation(() => {
        throw new Error(errorMessage);
      });

      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await rsvpController.getAll(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
    });
  });

  describe('getSingle', () => {
    it('should return 400 for invalid ObjectId', async () => {
      const req = { params: { id: 'invalid-id' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await rsvpController.getSingle(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith('Must use a valid rsvp id to find an rsvp.');
    });
  });
});