import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
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
    HomeSection(),
    Center(child: Text('Search Page')),
    Center(child: Text('Create Page')),
    Center(child: Text('Events Page')),
    const UserSettings(),
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
        actions: [
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
          });
        },
        items: [
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
            label: 'Create',
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
