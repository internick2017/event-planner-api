const venuesController = require('../controllers/venuesController');
const mongodb = require('../data/database');

jest.mock('../data/database');

describe('Venues Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAll', () => {
    it('should return all venues successfully', async () => {
      const mockVenues = [{ _id: '1', title: 'Test Venue' }];
      const mockFind = jest.fn().mockReturnValue({
        toArray: jest.fn().mockResolvedValue(mockVenues)
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

      await venuesController.getAll(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockVenues);
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

      await venuesController.getAll(req, res);

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

      await venuesController.getSingle(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith('Must use a valid venue id to find a venue.');
    });
  });
});