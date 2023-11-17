import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:mobile/sections/create_event.dart';
import 'package:mobile/sections/home_section.dart';
import 'package:mobile/sections/user_section.dart';
import 'package:mobile/sections/search_bar.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  int _selectedIndex = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          _selectedIndex == 1 ? 'Search Page' : 'Popout',
        ),
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
        return createEvent();
      case 2:
        return Center(child: Text('Events Page'));
      case 3:
        return const UserSettings();
      default:
        return Center(child: Text('Unknown Page'));
    }
  }
}
