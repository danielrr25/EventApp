const express = require('express');
const router = express.Router();
const Event = require('../models/eventSchema'); // Import your Event model

router.post('/create-event', async (req, res) => {
  try {
      // Destructuring assignment to extract values from request body
      const { creatorID, eventName, eventCategory,eventDescription, eventDate, eventLocation } = req.body;

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
          listAntendees: [] // Initializing as an empty array
      });

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

      // Find the event by ID
      const event = await Event.findById(eventId).populate("creatorID","eventName","eventCategory","eventDescription","eventDate","eventLocation","listAntendees");

      if (!event) {
          return res.status(404).json({ msg: 'Event not found' });
      }

      res.json(event);
  } catch (err) {
      console.error(err.message);

      // If the error is due to an invalid ObjectId, send a 400 Bad Request response.
      if (err.kind === 'ObjectId') {
          return res.status(400).json({ msg: 'Invalid event ID' });
      }

      res.status(500).send('Server Error');
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
      const { eventName, userid } = req.body;
      const event = await Event.findOne({ eventName });
      
      if (!event) {
        return res.status(400).send({ error: 'Invalid event' });
      }

      if (event.listAttendees.includes(userid)){
          return res.status(404).send({ error: 'Already attending event' });
      }

      event.listAttendees.push(userid);
      await event.save();
      res.status(201).send({ message: 'Event attended check' });
  } catch (error) {
      res.status(500).send(error);
  }
});

//unattend event route
router.post('/unattendevent', async (req, res) => {
  try {
      const { eventName, userid } = req.body;
      const event = await Event.findOne({ eventName });

      if (!event) {
        return res.status(400).send({ error: 'Invalid event' });
      }

      if (!event.listAttendees.includes(userid)){
          return res.status(404).send({ error: 'not attending event' });
      }
      const index = event.listAttendees.indexOf(userid);
      if (index !== -1) {
        event.listAttendees.splice(index, 1);
      }
      
      await event.save();
      res.status(201).send({ message: 'Event unattended check' });
  } catch (error) {
      res.status(500).send(error);
  }
});

module.exports = router;
