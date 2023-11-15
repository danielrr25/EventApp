const request = require('supertest');
const express = require('express');
const eventRoutes = require('../routes/events.js');
const Event = require('../models/eventSchema'); // Import your Event model
const app = require('../server.js');
jest.mock('../models/eventSchema');


test('POST /create-event should create an event and return 200 status', async () => {
  

    const response = await request(app)
        .post('/events/create-event')
        .send({
            "creatorID": "65497a355e5ff8d811603097",
            "eventName": "Test Event",
            "eventCategory": "Test Category",
            "eventDescription": "Test Description",
            "eventDate": "2021-04-30T00:00:00.000Z",
            "eventLocation": "Test Location",
            "eventIcon": "Test Icon"
        });

    
    expect(response.statusCode).toBe(200);
    // Additional assertions as needed
});

test('GET /get should get the info of an event and return 200 status', async () => {
 
    
    const response = await request(app)
        .get('/events/get-event-info/654ad2f76df268019d83c445');

    console.log(response);
    expect(response.statusCode).toBe(200);
    // Additional assertions as needed
});

