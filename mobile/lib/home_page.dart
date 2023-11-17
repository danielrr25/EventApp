import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:mobile/sections/create_event.dart';
import 'package:mobile/sections/home_section.dart';
import 'package:mobile/sections/user_section.dart';
import 'package:mobile/sections/search_bar.dart';

class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  int _selectedIndex = 0;

<<<<<<< HEAD
  final List<Widget> _pages = [
    HomeSection(), // index 0
    Center(child: Text('Search Page')), // index 1
    createEvent(), // index 2
    Center(child: Text('Events Page')), // index 3
    const UserSettings(), // index 4
  ];

=======
>>>>>>> 9b9d334bc6f0db6530446123903baf4608a2935f
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          _selectedIndex == 1 ? 'Search Page' : 'Popout',
        ),
<<<<<<< HEAD
        actions: const [
          // Add any other action buttons here
        ],
=======
>>>>>>> 9b9d334bc6f0db6530446123903baf4608a2935f
      ),
      body: _buildPageContent(),
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
          // BottomNavigationBarItem(
          //   icon: Icon(Icons.search),
          //   label: 'Search',
          // ),
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

  Widget _buildPageContent() {
    switch (_selectedIndex) {
      case 0:
        return HomeSection();
      case 1:
        return Center(child: Text('Create Page'));
      case 2:
        return Center(child: Text('Events Page'));
      case 3:
        return const UserSettings();
      default:
        return Center(child: Text('Unknown Page'));
    }
  }
}
