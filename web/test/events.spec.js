const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const router = require('../routes/events.js');
const Event = require('../models/eventSchema'); // Import your Event model
const app = require('../server.js');

app.use(bodyParser.json());
app.use('/', router);




jest.mock('../routes_help/jwt', () => {
    return jest.fn((req, res, next) => {
      // Simulate successful token verification
      req.user = { id: 'mockUserId' }; 
      next();
    });
  });

jest.mock('../models/eventSchema', () => {
    return {
        findOne: jest.fn(),
        find: jest.fn(),
        findById: jest.fn(),
        deleteOne: jest.fn(),
        save: jest.fn(),
        mockReset: function () {
            this.findOne.mockReset();
            this.find.mockReset();
            this.findById.mockReset();
            this.deleteOne.mockReset();
            this.save.mockReset();
        }
    };
  });
  
  describe('POST /create-event', () => {
    
  
    it('should return 400 if event already exists', async () => {
      Event.findOne.mockResolvedValue(true); // Mock that the event already exists
  
      const newEvent = {
        creatorID: '12345',
        eventName: 'Test Event',
        eventCategory: 'Category',
        eventDescription: 'Description',
        eventDate: '2023-01-01',
        eventLocation: 'Location',
        eventIcon: 'Icon'
      };
  
      const response = await request(app)
        .post('/create-event')
        .send(newEvent);
      
      expect(response.statusCode).toBe(400);
      expect(response.body.msg).toBe('Event already exists');
    });

  });

  describe('GET /get-event-info/:eventId', () => {
    it('should return event details for a valid event ID', async () => {
      const mockEvent = {
        _id: '123',
        eventName: 'Test Event',
        eventCategory: 'Category',
        eventDescription: 'Description',
        eventDate: '2023-01-01',
        eventLocation: 'Location',
        eventIcon: 'Icon'
      };
      Event.findOne.mockResolvedValue(mockEvent);
  
      const response = await request(app).get('/get-event-info/123');
  
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(mockEvent);
      expect(Event.findOne).toHaveBeenCalledWith({_id: '123'});
    });
  
    it('should return 404 if event is not found', async () => {
      Event.findOne.mockResolvedValue(null);
  
      const response = await request(app).get('/get-event-info/123');
  
      expect(response.statusCode).toBe(404);
      expect(response.body.error).toBe('Event not found');
    });
  
    
  });

  describe('GET /get-created-events/:userId', () => {
    it('should return events created by a user', async () => {
      const mockEvents = [
        { eventName: 'Event 1', creatorID: 'user123' },
        { eventName: 'Event 2', creatorID: 'user123' }
        
      ];
      Event.find.mockResolvedValue(mockEvents);
  
      const response = await request(app).get('/get-created-events/user123');
  
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(mockEvents);
      expect(Event.find).toHaveBeenCalledWith({ creatorID: 'user123' });
    });
  
    it('should handle internal server error', async () => {
      Event.find.mockRejectedValue(new Error('Internal server error'));
  
      const response = await request(app).get('/get-created-events/user123');
  
      expect(response.statusCode).toBe(500);
      expect(response.body.error).toBe('Internal server error');
    });
  

  });

  describe('GET /get-attending-events/:userId', () => {
    it('should return events the user is attending', async () => {
      const mockEvents = [
        { eventName: 'Event 1', listAttendees: ['user123'] },
        { eventName: 'Event 2', listAttendees: ['user123'] }
      
      ];
      Event.find.mockResolvedValue(mockEvents);
  
      const response = await request(app).get('/get-attending-events/user123');
  
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(mockEvents);
      expect(Event.find).toHaveBeenCalledWith({ listAttendees: 'user123' });
    });
  
    it('should handle internal server error', async () => {
      Event.find.mockRejectedValue(new Error('Internal server error'));
  
      const response = await request(app).get('/get-attending-events/user123');
  
      expect(response.statusCode).toBe(500);
      expect(response.body.error).toBe('Internal server error');
    });
  
    
  });

  describe('GET /search-events', () => {
    it('should return matching events based on name and category', async () => {
      const mockEvents = [
        { eventName: 'Music Festival', eventCategory: 'Music' },
        { eventName: 'Art Exhibition', eventCategory: 'Art' }
     
      ];
      Event.find.mockResolvedValue(mockEvents);
  
      const response = await request(app).get('/search-events').query({ name: 'Festival', category: 'Music' });
  
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(mockEvents);
      expect(Event.find).toHaveBeenCalledWith({
        eventName: new RegExp('Festival', 'i'),
        eventCategory: new RegExp('Music', 'i')
      });
    });
    it('should handle internal server error', async () => {
        Event.find.mockRejectedValue(new Error('Internal server error'));
    
        const response = await request(app).get('/search-events').query({ name: 'Festival' });
    
        expect(response.statusCode).toBe(500);
        expect(response.text).toBe('Server Error');
      });
    
    });

    describe('GET /delete-event/:id', () => {
        it('should delete the event if it exists', async () => {
          Event.findById.mockResolvedValue({ _id: '12345' });
          Event.deleteOne.mockResolvedValue({});
      
          const response = await request(app).get('/delete-event/12345');
      
          expect(response.statusCode).toBe(200);
          expect(response.body.msg).toBe('Event removed');
          expect(Event.deleteOne).toHaveBeenCalledWith({ _id: '12345' });
        });
      
        it('should return 404 if event is not found', async () => {
          Event.findById.mockResolvedValue(null);
      
          const response = await request(app).get('/delete-event/12345');
      
          expect(response.statusCode).toBe(404);
          expect(response.body.msg).toBe('Event not found');
        });
      
        it('should handle server error', async () => {
          Event.findById.mockRejectedValue(new Error('Server Error'));
      
          const response = await request(app).get('/delete-event/12345');
      
          expect(response.statusCode).toBe(500);
          expect(response.text).toBe('Server Error');
        });
      
       
      });

      describe('POST /attendevent', () => {
        it('should confirm event attendance', async () => {
          const mockEvent = { listAttendees: [], save: jest.fn() };
          Event.findById.mockResolvedValue(mockEvent);
      
          const response = await request(app)
            .post('/attendevent')
            .send({ eventid: '12345', userid: 'user123' });
      
          expect(response.statusCode).toBe(201);
          expect(response.body.message).toBe('Event attendance confirmed');
          expect(mockEvent.listAttendees).toContain('user123');
          expect(mockEvent.save).toHaveBeenCalled();
        });
      
        it('should return 400 for invalid event', async () => {
          Event.findById.mockResolvedValue(null);
      
          const response = await request(app)
            .post('/attendevent')
            .send({ eventid: 'invalid123', userid: 'user123' });
      
          expect(response.statusCode).toBe(400);
          expect(response.body.error).toBe('Invalid event');
        });
      
        it('should return 409 if user already attending', async () => {
          const mockEvent = { listAttendees: ['user123'], save: jest.fn() };
          Event.findById.mockResolvedValue(mockEvent);
      
          const response = await request(app)
            .post('/attendevent')
            .send({ eventid: '12345', userid: 'user123' });
      
          expect(response.statusCode).toBe(409);
          expect(response.body.error).toBe('User already attending event');
        });
      
        it('should handle server error', async () => {
          Event.findById.mockRejectedValue(new Error('Server Error'));
      
          const response = await request(app)
            .post('/attendevent')
            .send({ eventid: '12345', userid: 'user123' });
      
          expect(response.statusCode).toBe(500);
          expect(response.body.error).toBe('Internal Server Error');
        });
     
      });

      describe('POST /unattendevent', () => {
        it('should remove user from event attendance', async () => {
          const mockEvent = { listAttendees: ['user123'], save: jest.fn() };
          Event.findById.mockResolvedValue(mockEvent);
      
          const response = await request(app)
            .post('/unattendevent')
            .send({ eventid: '12345', userid: 'user123' });
      
          expect(response.statusCode).toBe(201);
          expect(response.body.message).toBe('Event attendance remove');
          expect(mockEvent.listAttendees).not.toContain('user123');
          expect(mockEvent.save).toHaveBeenCalled();
        });
      
        it('should return 400 for invalid event', async () => {
          Event.findById.mockResolvedValue(null);
      
          const response = await request(app)
            .post('/unattendevent')
            .send({ eventid: 'invalid123', userid: 'user123' });
      
          expect(response.statusCode).toBe(400);
          expect(response.body.error).toBe('Invalid event');
        });
      
        it('should return 409 if user is not attending', async () => {
          const mockEvent = { listAttendees: [], save: jest.fn() };
          Event.findById.mockResolvedValue(mockEvent);
      
          const response = await request(app)
            .post('/unattendevent')
            .send({ eventid: '12345', userid: 'user123' });
      
          expect(response.statusCode).toBe(409);
          expect(response.body.error).toBe('User not attending event');
        });
      
        it('should handle server error', async () => {
          Event.findById.mockRejectedValue(new Error('Server Error'));
      
          const response = await request(app)
            .post('/unattendevent')
            .send({ eventid: '12345', userid: 'user123' });
      
          expect(response.statusCode).toBe(500);
          expect(response.body.error).toBe('Internal Server Error');
        });
      
      });

      describe('POST /searchevent', () => {
        it('should find events based on search string', async () => {
          const mockEvents = [
            { eventName: 'Summer Festival' },
            { eventName: 'Winter Carnival' }
          ];
          Event.find.mockResolvedValue(mockEvents);
      
          const response = await request(app)
            .post('/searchevent')
            .send({ searchString: 'Festival' });
      
          expect(response.statusCode).toBe(201);
          expect(response.body.events).toEqual(mockEvents);
        });
      
        it('should return 404 when no events match the search string', async () => {
          Event.find.mockResolvedValue([]);
      
          const response = await request(app)
            .post('/searchevent')
            .send({ searchString: 'Nonexistent' });
      
          expect(response.statusCode).toBe(404);
          expect(response.body.error).toBe('No Events');
        });
      
        it('should handle server error', async () => {
          Event.find.mockRejectedValue(new Error('Server Error'));
      
          const response = await request(app)
            .post('/searchevent')
            .send({ searchString: 'Festival' });
      
          expect(response.statusCode).toBe(500);
        });
      
      });