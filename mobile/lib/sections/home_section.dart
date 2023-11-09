import 'package:flutter/material.dart';
import 'package:mobile/sections/categories.dart';

class HomeSection extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // Define a list of event data (you can replace this with your actual event data).
    final List<EventData> eventDataList = [
      EventData(
        eventName: 'Event 1',
        eventDescription: 'dahdahd',
        attendeesCount: 50,
      ),
      EventData(
        eventName: 'Event 2',
        eventDescription: 'lol',
        attendeesCount: 30,
      ),
      // Add more event data...
    ];

    return Column(
      children: [
        // Add your CategoryCircle widgets here for different event types.
        SingleChildScrollView(
          scrollDirection: Axis.horizontal,
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              CategoryCircle(
                icon: Icons.music_note,
                isSelected: true,
                onPressed: () {
                  // Add logic for music category.
                },
                label: 'Music',
              ),
              CategoryCircle(
                icon: Icons.sports,
                isSelected: true,
                onPressed: () {
                  // Add logic for sports category.
                },
                label: 'Sports',
              ),
              CategoryCircle(
                icon: Icons.local_bar,
                isSelected: true,
                onPressed: () {
                  // Add logic for clubbing category.
                },
                label: 'Clubbing',
              ),
              CategoryCircle(
                icon: Icons.school,
                isSelected: true,
                onPressed: () {
                  // Add logic for school category.
                },
                label: 'School',
              ),
              CategoryCircle(
                icon: Icons.school,
                isSelected: true,
                onPressed: ()  {
                  // Add logic for music category.
                },
                label: 'Greek',
              ),
              CategoryCircle(
                icon: Icons.food_bank,
                isSelected: true,
                onPressed: ()  {
                  // Add logic for music category.
                },
                label: 'Food',
              ),
              CategoryCircle(
                icon: Icons.music_note,
                isSelected: true,
                onPressed: () {
                  // Add logic for music category.
                },
                label: 'Music',
              ),
              CategoryCircle(
                icon: Icons.more,
                isSelected: true,
                onPressed: () {
                  // Add logic for more category.
                },
                label: 'More',
              ),
            ],
          ),
        ),
        // Display event cards in a scrollable grid (GridView).
        GridView.builder(
          shrinkWrap: true,
          gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount: 2, // Number of columns in the grid
          ),
          itemBuilder: (context, index) {
            return EventCard(
              eventName: eventDataList[index].eventName,
              eventDescription: eventDataList[index].eventDescription,
              attendeesCount: eventDataList[index].attendeesCount,
            );
          },
          itemCount: eventDataList.length,
        ),
      ],
    );
  }
}

class EventData {
  final String eventName;
  final String eventDescription;
  final int attendeesCount;

  EventData({
    required this.eventName,
    required this.eventDescription,
    required this.attendeesCount,
  });
}

class EventCard extends StatelessWidget {
  final String eventName;
  final String eventDescription;
  final int attendeesCount;

  EventCard({
    required this.eventName,
    required this.eventDescription,
    required this.attendeesCount,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      // Customize the appearance of the card here, e.g., border, elevation, etc.
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
