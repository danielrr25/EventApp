import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:mobile/sections/categories.dart';
import 'package:mobile/sections/categories_handler.dart';
import 'package:mobile/sections/search_bar.dart';
import 'package:http/http.dart' as http;
import 'package:mobile/loginpage.dart';

// Declare the HomeSection widget as a StatefulWidget
class HomeSection extends StatefulWidget {
  const HomeSection({Key? key}) : super(key: key);

  @override
  _HomeSectionState createState() => _HomeSectionState();
}

// State class for HomeSection
class _HomeSectionState extends State<HomeSection> {
  // Declare eventDataList here
  late List<Event> eventDataList = [];
  // Fetch event data asynchronously
  late final Future<List<Event>> _eventList = _fetchEventList();
  List<Event> filteredEventData = [];

  // Variable to keep track of the selected category
  String selectedCategory = '';

  @override
  void initState() {
    super.initState();
    _fetchEventList(); // Call this to fetch events when the widget is initialized
  }

  // Function to fetch event data from the API
  Future<List<Event>> _fetchEventList() async {
    try {
      final response = await http.post(
        Uri.parse('http://167.172.230.181:5000/events/searchevent'),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': currentUser.jwtToken,
        },
      );
      // Parse and return the list of events from the API response
      if (response.statusCode == 201) {
        final jsonData = json.decode(response.body);
        final eventsData = jsonData['events'];

        // Assign the fetched events to eventDataList
        eventDataList =
            eventsData.map<Event>((e) => Event.fromJson(e)).toList();

        print('Fetched Events: $eventDataList'); // Add this line

        return eventDataList;
      } else {
        print('Failed to load data. Status code: ${response.statusCode}');
        throw Exception("Failed to load events");
      }
    } catch (e) {
      // Handle errors during the API request
      print('Error: $e');
      throw Exception("Failed to load events");
    }
  }

  // Method to filter events locally based on category
  void filterEventsByCategory(String category) async {
    print('All Events: $eventDataList');
    setState(() {
      if (selectedCategory == category) {
        // If the same category is selected again, reset to show all events
        selectedCategory = '';
        filteredEventData = [];
      } else {
        selectedCategory = category;
        filteredEventData = eventDataList
            .where((event) =>
                event.eventCategory.toLowerCase() == category.toLowerCase())
            .toList();
      }
      print('Filtered Events: $filteredEventData');
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                CategoryCircle(
                  icon: Icons.sports_soccer,
                  isSelected: selectedCategory == 'Sports',
                  onPressed: () {
                    print('You just clicked me');
                    filterEventsByCategory('Sports');
                  },
                  label: 'Sports',
                ),
                CategoryCircle(
                  icon: Icons.music_note,
                  isSelected: selectedCategory == 'Music',
                  onPressed: () {
                    filterEventsByCategory('Music');
                  },
                  label: 'Music',
                ),
                CategoryCircle(
                  icon: Icons.school,
                  isSelected: selectedCategory == 'Education',
                  onPressed: () {
                    filterEventsByCategory('Education');
                  },
                  label: 'Education',
                ),
                CategoryCircle(
                  icon: Icons.local_bar,
                  isSelected: selectedCategory == 'Parties',
                  onPressed: () {
                    filterEventsByCategory('Parties');
                  },
                  label: 'Parties',
                ),
                CategoryCircle(
                  icon: Icons.color_lens_sharp,
                  isSelected: selectedCategory == 'Art',
                  onPressed: () {
                    filterEventsByCategory('Art');
                  },
                  label: 'Art',
                ),
                CategoryCircle(
                  icon: Icons.people,
                  isSelected: selectedCategory == 'Social',
                  onPressed: () {
                    filterEventsByCategory('Social');
                  },
                  label: 'Social',
                ),
                CategoryCircle(
                  icon: Icons.more,
                  isSelected: selectedCategory == 'More',
                  onPressed: () {
                    filterEventsByCategory('More');
                  },
                  label: 'More',
                ),
              ],
            ),
            Expanded(
              child: FutureBuilder<List<Event>>(
                future: _eventList,
                builder: (context, snapshot) {
                  if (snapshot.connectionState == ConnectionState.waiting) {
                    return CircularProgressIndicator();
                  } else if (snapshot.hasError) {
                    return Text('Error: ${snapshot.error}');
                  } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
                    return Text('No events found.');
                  } else {
                    final eventsToDisplay = selectedCategory.isNotEmpty
                        ? filteredEventData
                        : snapshot.data!;
                    return GridView.builder(
                      gridDelegate:
                          const SliverGridDelegateWithFixedCrossAxisCount(
                        crossAxisCount: 2,
                      ),
                      itemCount: eventsToDisplay.length,
                      itemBuilder: (context, index) {
                        return EventCard(
                          eventData: eventsToDisplay[index],
                        );
                      },
                    );
                  }
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}

// Widget for displaying an event card
class EventCard extends StatelessWidget {
  final Event eventData;

  const EventCard({Key? key, required this.eventData}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.all(8.0),
      child: InkWell(
        onTap: () {
          print('you just pressed me');
        },
        child: Stack(
          children: [
            ListTile(
              title: Text(eventData.eventName,
                  style: const TextStyle(
                    fontSize: 18.0,
                    fontWeight: FontWeight.bold,
                  )),
              subtitle: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('Location: ${eventData.eventLocation}'),
                  Text('Category: ${eventData.eventCategory}'),
                  // You can add more details if needed
                ],
              ),
            ),
            Positioned(
              bottom: 8.0,
              right: 8.0,
              child: CircleAvatar(
                backgroundColor: Colors.blue, // Customize the color as needed
                radius: 12.0,
                child: Text(
                  eventData.listAttendees.length.toString(),
                  style: TextStyle(color: Colors.white),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class Event {
  final String creatorID;
  final String eventName;
  final String eventLocation;
  final String eventDate;
  final String eventCategory; // Added eventCategory
  final String eventDescription;
  final List<String> listAttendees;

  Event({
    required this.creatorID,
    required this.eventName,
    required this.eventLocation,
    required this.eventDate,
    required this.eventCategory,
    required this.eventDescription,
    required this.listAttendees,
  });

  // Factory method to create an Event object from JSON data
  factory Event.fromJson(Map<String, dynamic> json) {
    return Event(
      creatorID: json['creatorID'] as String,
      eventName: json['eventName'] as String,
      eventLocation: json['eventLocation'] as String,
      eventDate: json['eventDate'] as String,
      eventCategory:
          json['eventCategory'] as String, // Adjusted for the actual field name
      eventDescription: json['eventDescription'] as String,
      listAttendees: List<String>.from(json['listAttendees']),
    );
  }
}
