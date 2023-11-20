import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:mobile/sections/create_event.dart';
import 'package:mobile/sections/home_attend_created.dart';
import 'package:mobile/sections/home_section.dart';
import 'package:mobile/sections/search_event.dart';
import 'package:mobile/sections/user_section.dart';
// import 'package:mobile/sections/search_bar.dart';
import 'package:mobile/sections/events_attending';
import 'package:mobile/loginpage.dart';

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
        automaticallyImplyLeading: false,
        title: Container(
          // padding: EdgeInsets.all(10),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text(
                // _selectedIndex == 1 ? 'Search Page' : 'Popout',
                'Popout',
                style: TextStyle(fontSize: 30, fontWeight: FontWeight.bold),
              ),
              // const Icon(Icons.bubble_chart_outlined),
              Container(
                  padding: const EdgeInsets.symmetric(
                      vertical: 3.0, horizontal: 3.0),
                  width: 50,
                  height: 50,
                  child: Image.asset(
                    'assets/icon/no_background_logo.jpg',
                    fit: BoxFit.contain,
                  )),
            ],
          ),
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
          BottomNavigationBarItem(
            icon: Icon(Icons.search),
            label: 'Search',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.add),
            label: 'Create Event',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.chat),
            label: 'Chat',
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
        //return HomeSection();
        return TheHomepage();

      // return EventsAttending(userId: currentUser.userID);
      case 1:
        return Search();
      case 2:
        return createEvent();
      case 3:
        return HomeSection();
      case 4:
        return const UserSettings();
      default:
        return Center(child: Text('Unknown Page'));
    }
  }
}
