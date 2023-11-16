import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:mobile/sections/categories.dart';
import 'package:mobile/sections/categories_handler.dart';
import 'package:mobile/sections/search_bar.dart';
import 'package:http/http.dart' as http;

class HomeSection extends StatefulWidget {
  @override
  _HomeSectionState createState() => _HomeSectionState();
}

class _HomeSectionState extends State<HomeSection> {
  List<EventData> eventDataList = [];
  List<EventData> filteredEventData = [];


  @override
  void initState() {
    super.initState();
    // Fetch event data when the widget is initialized
    _fetchEventData('userId');
  }

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Column(
        children: [
          Padding(
            padding: const EdgeInsets.symmetric(vertical: 8.0),
            child: SearchName(onSearch: _handleSearch),
          ),

          Padding(
            padding: const EdgeInsets.symmetric(vertical: 8.0),
            child: SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  CategoryCircle(
                    icon: Icons.sports_soccer,
                    isSelected: true,
                    onPressed: () {
                      setState(() {
                        filteredEventData = CategoryHandler.filterEventsByCategory(
                            eventDataList, 'Sports');
                      });
                    },
                    label: 'Sports',
                  ),
                  CategoryCircle(
                    icon: Icons.music_note,
                    isSelected: true,
                    onPressed: () {
                      setState(() {
                        filteredEventData = CategoryHandler.filterEventsByCategory(
                            eventDataList, 'Music');
                      });
                    },
                    label: 'Music',
                  ),
                  CategoryCircle(
                    icon: Icons.school,
                    isSelected: true,
                    onPressed: () {
                      setState(() {
                        filteredEventData = CategoryHandler.filterEventsByCategory(
                            eventDataList, 'Education');
                      });
                    },
                    label: 'Education',
                  ),
                  CategoryCircle(
                    icon: Icons.local_bar,
                    isSelected: true,
                    onPressed: () {
                      setState(() {
                        filteredEventData = CategoryHandler.filterEventsByCategory(
                            eventDataList, 'Parties');
                      });
                    },
                    label: 'Parties',
                  ),
                  CategoryCircle(
                    icon: Icons.color_lens_sharp,
                    isSelected: true,
                    onPressed: () {
                      setState(() {
                        filteredEventData = CategoryHandler.filterEventsByCategory(
                            eventDataList, 'Art');
                      });
                    },
                    label: 'Art',
                  ),
                  CategoryCircle(
                    icon: Icons.people,
                    isSelected: true,
                    onPressed: () {
                      setState(() {
                        filteredEventData = CategoryHandler.filterEventsByCategory(
                            eventDataList, 'Social');
                      });
                    },
                    label: 'Social',
                  ),
                  CategoryCircle(
                    icon: Icons.more,
                    isSelected: true,
                    onPressed: () {
                      setState(() {
                        filteredEventData = CategoryHandler.filterEventsByCategory(
                            eventDataList, 'More');
                      });
                    },
                    label: 'More',
                  ),
                  ElevatedButton(
            onPressed: _resetFilters,
            child: Text('Reset Filters'),
          ),
                ],
                
              ),
              
            ),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(vertical: 8.0),
            child: GridView.builder(
              shrinkWrap: true,
              gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 2,
              ),
              itemBuilder: (context, index) {
                return EventCard(
                  eventName: filteredEventData[index].eventName,
                  eventDescription: filteredEventData[index].eventDescription,
                  attendeesCount: filteredEventData[index].attendeesCount,
                  eventCategory: filteredEventData[index].eventCategory,
                );
              },
              itemCount: filteredEventData.length,
            ),
          ),
        ],
      ),
    );
  }


  void _fetchEventData(String userId) async {
  try {
    final response = await http.post(
      Uri.parse('http://167.172.230.181:5000/events/searchevent'),
      headers: {
        'Content-Type': 'application/json',
      },
      body: jsonEncode({'searchString': ' '}),
    );

    if (response.statusCode == 200) {
      // Parse the JSON response
      List<dynamic> jsonData = json.decode(response.body);

      // Create a list of EventData objects from the JSON data
      List<EventData> events = jsonData.map((data) {
        return EventData(
          eventName: data['eventName'],
          eventDescription: data['eventDescription'],
          attendeesCount: data['attendeesCount'],
          eventCategory: data['eventCategory'],
          listAttendees: List<String>.from(data['listAttendees']),
          eventLocation: data['eventLocation'],
          creatorID: data['creatorID'],
          id: data['_id'],
          eventDate: DateTime.parse(data['eventDate']),
        );
      }).toList();

      setState(() {
        eventDataList = events;
        filteredEventData = List.from(eventDataList);
      });
    } else {
      // Print the response body for debugging purposes
      //print('Response Body: ${response.body}');
      // Handle error
      print('Yessir. Status code: ${response.statusCode}');
    }
  } catch (e) {
    // Handle exceptions
    print('Error: $e');
  }
}


  // Reset filters function
  void _resetFilters() {
    setState(() {
      filteredEventData = List.from(eventDataList);
    });
  }

  void _handleSearch(String query) {
    setState(() {
      filteredEventData = eventDataList
          .where((event) =>
              event.eventName.toLowerCase().contains(query.toLowerCase()))
          .toList();
    });
  }
}

class EventData {
  final String eventName;
  final String eventDescription;
  final int attendeesCount;
  final String eventCategory;
  final List<String> listAttendees;
  final String eventLocation;
  final String creatorID;
  final String id;
  final DateTime eventDate;

  EventData({
    required this.eventName,
    required this.eventDescription,
    required this.attendeesCount,
    required this.eventCategory,
    required this.listAttendees,
    required this.eventLocation,
    required this.creatorID,
    required this.id,
    required this.eventDate,
  });
}


class EventCard extends StatelessWidget {
  final String eventName;
  final String eventDescription;
  final int attendeesCount;
  final String eventCategory;

  EventCard({
    required this.eventName,
    required this.eventDescription,
    required this.attendeesCount,
    required this.eventCategory,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Column(
        children: [
          ListTile(
            title: Text(eventName),
            subtitle: Text(eventDescription),
          ),
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Text('Attendees: $attendeesCount'),
          ),
        ],
      ),
    );
  }
}
