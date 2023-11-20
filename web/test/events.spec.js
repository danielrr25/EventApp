const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const router = require('../routes/events.js');
const Event = require('../models/eventSchema'); // Import your Event model
const app = require('../server.js');
const userRoutes = require('../routes/users.js');
const User = require('../models/userSchema'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verifyToken  = require('../routes_help/jwt');

app.use(bodyParser.json());
app.use('/', router);


jest.mock('bcryptjs', () => ({
  compare: jest.fn(),
}));


jest.mock('../routes_help/jwt', () => {
    return jest.fn((req, res, next) => {
      // Simulate successful token verification
      req.user = { id: 'mockUserId' }; 
      next();
    });
  });


  jest.mock('../models/eventSchema', () => {
    const mockEventSchema = jest.fn().mockImplementation(function(data) {
      this.data = data;
      this.save = jest.fn().mockResolvedValue(this);
  });

    mockEventSchema.findOne = jest.fn();
    mockEventSchema.find = jest.fn();
    mockEventSchema.findById = jest.fn();
    mockEventSchema.deleteOne = jest.fn();
    mockEventSchema.save = jest.fn();
    mockEventSchema.mockReset = function () {
        this.findOne.mockReset();
        this.find.mockReset();
        this.findById.mockReset();
        this.deleteOne.mockReset();
        this.save.mockReset();
    };
    return mockEventSchema;
});
  
  describe('POST /create-event', () => {
    
    it('should create a new event', async () => {
      const newEvent = {
          creatorID: '12345',
          eventName: 'Test Event',
          eventCategory: 'Category',
          eventDescription: 'Description',
          eventDate: '2023-01-01',
          eventLocation: 'Location',
          eventIcon: 'Icon'
      };

      const Event = require('../models/eventSchema'); // Import the mocked Event model

      Event.findOne.mockResolvedValue(null); // Mock that the event does not already exist

      const response = await request(app)
          .post('/create-event')
          .send(newEvent);

      expect(response.statusCode).toBe(200);
      expect(response.body.msg).toBe('Event created successfully');
  });

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

      //##############################################################################################################
      //USER TESTS
      //##############################################################################################################
      jest.mock('../models/userSchema', () => {
        const mockUserSchema = jest.fn().mockImplementation(function(data) {
          this.data = data;
          this.save = jest.fn().mockResolvedValue(this);
      });
    
        mockUserSchema.findOne = jest.fn();
        mockUserSchema.find = jest.fn();
        mockUserSchema.findById = jest.fn();
        mockUserSchema.deleteOne = jest.fn();
        mockUserSchema.save = jest.fn();
        mockUserSchema.mockReset = function () {
            this.findOne.mockReset();
            this.find.mockReset();
            this.findById.mockReset();
            this.deleteOne.mockReset();
            this.save.mockReset();
        };
        return mockUserSchema;
    });
    /*
    jest.mock('../models/userSchema', () => {
    
      return{
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
    */
    
    test('POST /login successfully logs user in and return 200 status', async () => {
    
      const mockUser = {
        username: 'stevenc15',
        password: 'Kikocama15*',
        isverified: true,
        save: jest.fn()
      };
    
      User.findOne.mockResolvedValue(mockUser);
      bcrypt.compare.mockReturnValue(true);
        const response = await request(app) 
            .post('/users/login')
            .send(mockUser);
    
            console.log(response.body);
        expect(response.statusCode).toBe(200);   
    });
    
    test('POST /login fails to logs user in and return 400 status', async () => {
    
      User.findOne.mockResolvedValue(null);
      const response = await request(app) 
          .post('/users/login')
          .send({
            "username": "StevenC", 
            "password": "cop4331"
          });
    
      expect(response.statusCode).toBe(400);   
    });
    
    test('POST /login fails find username and return 400 status', async () => {
    
      User.findOne.mockResolvedValue(null);
      const response = await request(app) 
          .post('/users/login')
          .send({
            "username": "starbucksC", 
            "password": "COP4331"
          });
    
      expect(response.statusCode).toBe(400);   
    });
    
    test('POST /login fails as user is not verified and return 400 status', async () => {
    
      User.findOne.mockResolvedValue(null);
      const response = await request(app) 
          .post('/users/login')
          .send({
            "username": "SamH", 
            "password": "COP4331"
          });
    
      expect(response.statusCode).toBe(400);   
    });
    
    test('POST /register success and return 201 status', async () => {
    
      
      const newUser = {
       username:'LuisDiaz101', 
       password:'Blastoff4*',
       firstname:'Jimmy5',
       lastname:'Neutron8',
       email:'blastoffinc@gmail.com'
    };
    
    const User = require('../models/userSchema'); // Import the mocked Event model
    
    User.findOne.mockResolvedValue(null); // Mock that the event does not already exist
    
      
      const response = await request(app) 
          .post('/users/register')   
          .send(newUser);
    
          //console.log(response.body);
      expect(response.statusCode).toBe(201); 
      /*expect(response.body).toEqual({
        message: "Username already taken"
     });*/  
    });
    
    test('POST /register fails because of non-unique username and return 400 status', async () => {
    
      const mockUser = {
        _id: '1241',
        username: 'Jimmyb',
        password: 'blastoff4',
        firstname: 'Jimmy5',
        lastname: 'Neutron8',
        email: 'blastoffinc@gmail.com00002',
        save: jest.fn()
      };
      User.findOne.mockResolvedValue(mockUser)
    
      const response = await request(app)
          .post('/users/register')
          .send({
            "username": "Jimmyb", 
            "password": "blastoff",
            "firstname": "Jimmy",
            "lastname": "Neutron",
            "email": "planetsheen@gmail.com"
          });
    
      expect(response.statusCode).toBe(400); 
      
    });
    
    test('POST /register fails because of non-unique email and return 400 status', async () => {
    
      const mockUser = {
        _id: '1240',
        username: 'Sheen27',
        password: 'blastoff4',
        firstname: 'Jimmy5',
        lastname: 'Neutron8',
        email: 'blastoffinc@gmail.com00002',
        save: jest.fn()
      };
      User.findOne.mockResolvedValue(mockUser)
    
      const response = await request(app) 
          .post('/users/register')
          .send({
            "username": "Jimmyb", 
            "password": "blastoff",
            "firstname": "Jimmy",
            "lastname": "Neutron",
            "email": "blastoffinc@gmail.com00002"
          });
    
      expect(response.statusCode).toBe(400);  
      
    });
    
    //requiere el token jwt
    test('POST /deleteuser successfully deletes user from database and return 200 status', async () => {
      const mockUser = {
        _id: '1238',
        username: 'Sheen25',
        password: 'blastoff4',
        firstname: 'Jimmy5',
        lastname: 'Neutron7',
        email: 'blastoffinc@gmail.com00001',
        save: jest.fn()
      };
      User.findOne.mockResolvedValue(mockUser)
      const response = await request(app) 
          
        
        .post('/users/deleteuser')
        
          .send({
            "id": "1238"       
          });
    
      expect(response.statusCode).toBe(201);   
    });
    
    //requiere el token jwt
    test('POST /deleteuserfails to deletes user from database and return 400 status', async () => {
      User.findOne.mockResolvedValue(null)
      const response = await request(app)         
          .post('/users/deleteuser')
          
          .send({
            "id": "555555555555555555"       
          });
    
      expect(response.statusCode).toBe(400);   
    });
    
    test('POST /resetpassword successfully sends user email with code and return 201 status', async () => {
    
      const mockUser = {
        _id: '1237',
        username: 'Sheen23',
        password: 'blastoff4',
        firstname: 'Jimmy5',
        lastname: 'Neutron7',
        email: 'blastoffinc@gmail.com0000',
        save: jest.fn()
      };
      User.findOne.mockResolvedValue(mockUser);
      const response = await request(app) 
          .post('/users/resetpassword')
          .send({
            "email": "blastoffinc@gmail.com0000"
          });
    
      expect(response.statusCode).toBe(201);   
    });
    
    test('POST /resetpassword fails to sends user email with code and return 404 status', async () => {
    
      User.findOne.mockResolvedValue(null);
    
      const response = await request(app) 
          .post('/users/resetpassword')
          .send({
            "email": "fakeemail@email.com"
          });
    
      expect(response.statusCode).toBe(404);   
    });
    
    test('POST /resetpasswordentercode successfully logs user in and return 200 status', async () => {
    
      const mockUser = {
        
    
        passwordvtoken: 'e484b4f8-573f-48e5-9ca3-f86f3e454630', save: jest.fn()
      };
      User.findOne.mockResolvedValue(mockUser);
      const response = await request(app) 
          .post('/users/resetpasswordentercode')
          .send({
            passwordvtoken: 'e484b4f8-573f-48e5-9ca3-f86f3e454630'
          });
    
      expect(response.statusCode).toBe(201);   
    });
    
    //done
    test('POST /resetpasswordentercode fails as incorrect code entered and return 404 status', async () => {
    
      User.findOne.mockResolvedValue(null);
      const response = await request(app) 
          .post('/users/resetpasswordentercode')
          .send({
            "code": "0"
          });
    
      expect(response.statusCode).toBe(404);   
    });
    
    //done
    test('POST /changepassword successfully changes user password and return 201 status', async () => {
    
      const mockUser = {
        _id: '1237',
        username: 'Sheen10',
        password: 'blastoff4',
        firstname: 'Jimmy5',
        lastname: 'Neutron7',
        email: 'blastoffinc@gmail.com15',
        save: jest.fn()
      };
    
      User.findOne.mockResolvedValue(mockUser);
      bcrypt.compare.mockReturnValue(false);
      const response = await request(app) 
          .post('/users/changepassword')
          .send({
            "username": "Sheen10", 
            "newpassword": "COP4331",
            "confirmpassword": "COP4331"
          });
    
    
      expect(response.statusCode).toBe(201);   
    });
    
    //done
    test('POST /changepassword fails to change user password as username is incorrect and return 404 status', async () => {
    
      User.findOne.mockResolvedValue(null);
      const response = await request(app) 
          .post('/users/changepassword')
          .send({
            "username": "Jimmyfail", 
            "newpassword": "COP4331",
            "confirmpassword": "COP4331"
          });
    
    
      expect(response.statusCode).toBe(404);   
    });
    
    //done
    test('POST /changepassword fails to change user password as passwords do not match and return 400 status', async () => {
    
      const mockUser = {
        _id: '1235',
        username: 'Sheen15',
        password: 'blastoff4',
        firstname: 'Jimmy5',
        lastname: 'Neutron7',
        email: 'blastoffinc@gmail.com17'
      };
    
      User.findOne.mockResolvedValue(mockUser);
    
      const response = await request(app) 
          .post('/users/changepassword')
          .send({
            "username": "Sheen15", 
            "newpassword": "COP4331",
            "confirmpassword": "blank"
          });
    
    
      expect(response.statusCode).toBe(400);   
    });
    
    test('POST /changepassword fails to change user password as user cannot reuse old password and return 408 status', async () => {
    
      const mockUser = {
        _id: '1235',
        username: 'Sheen15',
        password: 'blastoff4',
        firstname: 'Jimmy5',
        lastname: 'Neutron7',
        email: 'blastoffinc@gmail.com17'
      };
    
      User.findOne.mockResolvedValue(mockUser);
      bcrypt.compare.mockReturnValue(true);
    
      const response = await request(app) 
          .post('/users/changepassword')
          .send({
            "username": "Sheen15", 
            "newpassword": "blastoff4",
            "confirmpassword": "blastoff4"
          });
    
    
      expect(response.statusCode).toBe(408);   
    });
    //check success case as tokens change
    //done
    test('POST /verifyemail successfully verifies user for future login and return 201 status', async () => {
    const mockUser = {
        
    
        emailvtoken: 'e484b4f8-573f-48e5-9ca3-f86f3e454630', save: jest.fn()
      };
      User.findOne.mockResolvedValue(mockUser);
      
      const response = await request(app) 
          .post('/users/verifyemail')
          .send({
            emailvtoken: 'e484b4f8-573f-48e5-9ca3-f86f3e454630' 
            
          });
    
      expect(response.statusCode).toBe(201);   
    });
    
    //done
    test('POST /verifyemail fails verifies user for future login and return 400 status', async () => {
    
      User.findOne.mockResolvedValue(null);
      const response = await request(app) 
          .post('/users/verifyemail')
          .send({
            "emailvtoken": "1"         
          });
    
      expect(response.statusCode).toBe(400); 
    });
    
    //done
    test('GET /get successfully gets the info of a user and return 200 status', async () => {
     
      const mockUser = {
        _id: '1234',
        username: 'Sheen15',
        password: 'blastoff4',
        firstname: 'Jimmy5',
        lastname: 'Neutron7',
        email: 'blastoffinc@gmail.com17'
      };
    
      User.findOne.mockResolvedValue(mockUser);
      const response = await request(app)
          .get('/users/user-info/:1234');
    
      expect(response.statusCode).toBe(200);
      // Additional assertions as needed
    });
    
    //done
    test('GET /get fails to get the info of a user and return 404 status', async () => {
      User.findOne.mockResolvedValue(null);
        
      const response = await request(app)
          .get('/users/user-info/:1234');
    
      expect(response.statusCode).toBe(404);
      // Additional assertions as needed
    });
//##############################################################################################################
//CHAT TESTS
//##############################################################################################################
const ChatMessage = require('../models/chatMessageSchema');    
// jest.mock('../models/chatMessageSchema', () => {
//   return {
//     // Mock for adding a new chat message
//     save: jest.fn().mockImplementation(function () {
//       return Promise.resolve({
//         user: this.user,
//         event: this.event,
//         timestamp: this.timestamp,
//         message: this.message
//       });
//     }),

//     // Mock for finding chat messages based on event ID
//     find: jest.fn().mockImplementation((query) => {
//       if (query.event) {
//         return {
//           sort: jest.fn().mockResolvedValue([
//             { user: '00001', event: query.event, message: 'Hello', timestamp: '2023-01-01T00:00:00.000Z' },
//             { user: '00002', event: query.event, message: 'Hi', timestamp: '2023-01-01T00:01:00.000Z' }
//           ])
//         };
//       }
//       return {
//         sort: jest.fn().mockResolvedValue([])
//       };
//     }),

//     mockReset: function () {
//       this.save.mockReset();
//       this.find.mockReset();
//     }
//   };
// });
  test('POST /addchatmessage successfully add a message to an event chat and return 201 status', async () => {
  
      const response = await request(app) 
          .post('/chatmessages/addchatmessage')
          .send({
              "EventId": "5f845ea6e54edf9c016d89d2",
              "SenderId": "5f845ea6e54edf9c016d89d2",
              "Timestamp": "2023-11-14 12:00:00.0002",
              "body": "chat test"
          });
  
      expect(response.statusCode).toBe(201);   
  });
  
  test('GET /get successfully gets the chat of an event and return 200 status', async () => {
      
      
      const response = await request(app)
          .get('/chatmessages/getchatmessages/5f845ea6e54edf9c016d89d2');
      //honestly we just need to make sure our endpoint doesnt error out
      expect(response.statusCode).toBe(200);
    });