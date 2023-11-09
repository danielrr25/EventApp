const express = require('express');
const router = express.Router();
const Event = require('../models/eventSchema'); // Import your Event model


router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://167.172.230.181:3000');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

router.post('/create-event', async (req, res) => {
  try {
      // Destructuring assignment to extract values from request body
      const { creatorID, eventName, eventCategory,eventDescription, eventDate, eventLocation,eventIcon } = req.body;
      console.log(req.body);
      // Check if the event already exists
      let event = await Event.findOne({ eventName });
      if (event) {
          return res.status(400).json({ msg: 'Event already exists' });
      }

      // Create a new event with an empty listAttendees array
      event = new Event({
          creatorID,
          eventName,
          eventCategory,
          eventDescription,
          eventDate,
          eventLocation,
          listAttendees: [] ,
          eventIcon
      });
      console.log(event);
      // Save the event to the database
      await event.save();

      res.status(200).json({ msg: 'Event created successfully', event });
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
  }
});

// GET route to get event details
router.get('/get-event-info/:eventId', async (req, res) => {
  try {
      const { eventId } = req.params;
  
      console.log(eventId);
      // Find the user by ID
      const event = await Event.findOne({_id:eventId});
      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }
  
      res.status(200).json(event);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

router.get('/search-events', async (req, res) => {
  const { name, category } = req.query;
  
  try {
    // Building the search query
    const query = {};
    if (name) query.eventName = new RegExp(name, 'i'); // 'i' for case-insensitive
    if (category) query.eventCategory = new RegExp(category, 'i'); // 'i' for case-insensitive
    
    // Executing the search query
    const events = await Event.find(query);
    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Delete event route
router.delete('/delete-event/:id', async (req, res) => {
  try {
    // Find the event by ID
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }

    // Check if the current user is the creator of the event
    if (event.creatorID.toString() !== req.user.id) { // Assuming req.user is set by your auth middleware
      return res.status(401).json({ msg: 'User not authorized' });
    }

    // Delete the event
    await event.remove();
    res.json({ msg: 'Event removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Event not found' });
    }
    res.status(500).send('Server Error');
  }
});

//attend event route
router.post('/attendevent', async (req, res) => {
  try {
      const { eventid, userid } = req.body;
      const event = await Event.findById(eventid);
      if (!event) {
        return res.status(400).send({ error: 'Invalid event' });
      }
      
      
      // Initialize listAttendees as an array if it doesn't exist
      if (!Array.isArray(event.listAttendees)) {
        event.listAttendees = [];
      }
      
      if (event.listAttendees.includes(userid)){
          return res.status(409).send({ error: 'User already attending event' });
      }
      event.listAttendees.push(userid);
      await event.save();
      res.status(201).send({ message: 'Event attendance confirmed' });
  } catch (error) {
      console.error('Error attending event:', error);
      res.status(500).send({ error: 'Internal Server Error' });
  }
});


//unattend event route
router.post('/unattendevent', async (req, res) => {
  try {
      const { eventid, userid } = req.body;
      const event = await Event.findById(eventid);
      if (!event) {
        return res.status(400).send({ error: 'Invalid event' });
      }
      
      
      // Initialize listAttendees as an array if it doesn't exist
      if (!Array.isArray(event.listAttendees)) {
        event.listAttendees = [];
      }
      
      if (!event.listAttendees.includes(userid)){
          return res.status(409).send({ error: 'User not attending event' });
      }
      event.listAttendees.pop(userid);
      await event.save();
      res.status(201).send({ message: 'Event attendance remove' });
  } catch (error) {
      console.error('Error attending event:', error);
      res.status(500).send({ error: 'Internal Server Error' });
  }
});

router.post('/searchevent', async (req, res) => {
    
  try {
      const { searchString } = req.body; 
      const eventQuery = {};

      if (searchString) {
          // This will create a case-insensitive regex that matches any username containing the searchString
          const searchRegex = new RegExp('.*' + searchString + '.*', 'i');
          eventQuery.search = searchRegex;
      }

      //find all events that match the query
      const events = await Event.find(eventQuery);
  
      if (events.length === 0) {
          return res.status(404).send({ error: 'No Events' });
      }
      
      res.status(201).json({events});
      
  } catch (error) {
      res.status(500).send(error);
  }
});

module.exports = router;
