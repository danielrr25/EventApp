import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:mobile/sections/create_event.dart';
import 'package:mobile/sections/home_section.dart';
import 'package:mobile/sections/user_section.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  int _selectedIndex = 0;

  final List<Widget> _pages = [
    HomeSection(), // index 0
    Center(child: Text('Search Page')), // index 1
    createEvent(), // index 2
    Center(child: Text('Events Page')), // index 3
    const UserSettings(), // index 4
  ];

  @override
  Widget build(BuildContext context) {
    // Get the current date
    String currentDate = DateFormat('MM/dd/yy').format(DateTime.now());

    return Scaffold(
      appBar: AppBar(
        title: Row(
          children: [
            Container(
              margin: EdgeInsets.only(right: 10),
              padding: EdgeInsets.all(10),
              decoration: BoxDecoration(
                color: Colors.blue,
                borderRadius: BorderRadius.circular(30),
              ),
              child: Row(
                children: [
                  Text(
                    currentDate,
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 20,
                    ),
                  ),
                  SizedBox(width: 10),
                  Icon(
                    Icons.search,
                    color: Colors.white,
                  ),
                ],
              ),
            ),
          ],
        ),
        actions: const [
          // Add any other action buttons here
        ],
      ),
      // Display the selected page content.
      body: _pages[_selectedIndex],
      // Create a bottom navigation bar with icons and labels.
      bottomNavigationBar: BottomNavigationBar(
        type: BottomNavigationBarType.fixed,
        currentIndex: _selectedIndex,
        onTap: (index) {
          setState(() {
            _selectedIndex = index;
            print(index); // prints the index of bottom row on tap
          });
        },
        items: const [
          BottomNavigationBarItem(
            icon: Icon(Icons.home),
            label: 'Home',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.search),
            label: 'Search',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.add),
            label: 'Create Event',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.event),
            label: 'Events attending',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.person),
            label: 'User',
          ),
        ],
      ),
    );
  }
}
