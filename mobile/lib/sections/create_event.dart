import 'package:flutter/material.dart';
import 'package:mobile/loginpage.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class createEvent extends StatefulWidget {
  const createEvent({super.key});

  @override
  State<createEvent> createState() => _createEventState();
}

class _createEventState extends State<createEvent> {
  // List of categories
  final categories = [
    'Sports',
    'Music',
    'Education',
    'Party',
    'Arts',
    'Social',
    'Other',
  ];
  String eventCreator = currentUser.userID;
  String? dropdownValue;
  final TextEditingController _eventName = TextEditingController();
  final TextEditingController _eventLocation = TextEditingController();
  final TextEditingController _eventDescription = TextEditingController();

  final url = "http://167.172.230.181:5000/events/create-event";

  void createUser() async {
    print("Event creator ID: " + eventCreator);
    try {
      var response = await http.post(Uri.parse(url), // POST REQUEST
          headers: <String, String>{
            'Content-Type': 'application/json; charset=UTF-8',
          },
          body: jsonEncode(<String, String>{
            "creatorID": eventCreator,
            "eventName": _eventName.text,
            "eventCategory": dropdownValue.toString(), // hardcoded for now
            "eventDescription": _eventDescription.text,
            "eventDate": _dateTime.toString(),
            "eventLocation": _eventLocation.text,
            // "listAtendees": "100",
            "eventIcon": "partyIcon",
          }));

      if (context.mounted) {
        ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
          content: Text("New event created!"),
          duration: Duration(milliseconds: 1500),
        ));
      }
      print('Response status for create_event: ${response.statusCode}');
      print('Response body for create_event: ${response.body}');
      // print(response.body);
    } catch (err) {
      print(err);
    }
  }

  // a DateTime object has day, month, year and hour
  DateTime _dateTime = DateTime.now();
  DateTime? _datePicker = DateTime.timestamp(); // TIMESTAMP for now
  Future<Null> _showDatePicker(BuildContext context) async {
    _datePicker = await showDatePicker(
      context: context,
      initialDate: DateTime.now(),
      firstDate: DateTime(2010),
      lastDate: DateTime(2025),
    );

    if (_datePicker != null && _datePicker != _dateTime) {
      setState(() {
        // _dateTime = _datePicker(DateTime);
        _dateTime = _datePicker ?? DateTime.now();
      });
    }
  }

  DropdownMenuItem<String> buildMenuItem(String item) =>
      DropdownMenuItem(value: item, child: Text(item));

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: const Color.fromARGB(255, 224, 224, 224),
        body: Container(
          decoration: const BoxDecoration(
              image: DecorationImage(
                  // image: AssetImage('assets/icon/no_background_logo.jpg'))),
                  // image: AssetImage('assets/icon/opac.jpg'),
                  // fit: BoxFit.cover)),
                  image: AssetImage('assets/icon/opac2.jpg'),
                  fit: BoxFit.cover)),
          child: SingleChildScrollView(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // event name
                const SizedBox(height: 20),
                const Padding(
                  padding: EdgeInsets.only(left: 25.0),
                  child: Text(
                    'Event Name',
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 25,
                    ),
                  ),
                ),

                const SizedBox(height: 15),
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 25.0),
                  child: Container(
                    decoration: BoxDecoration(
                        color: Colors.grey[200],
                        border: Border.all(color: Colors.white),
                        borderRadius: BorderRadius.circular(10)),
                    padding: const EdgeInsets.only(left: 20),
                    child: TextField(
                        controller: _eventName,
                        decoration: InputDecoration(
                            border: InputBorder.none,
                            hintText: 'Enter a name for your event',
                            suffixIcon: IconButton(
                              onPressed: () {
                                _eventName.clear();
                              },
                              icon: const Icon(Icons.clear),
                            ))
                        // border: OutlineInputBorder(),
                        // labelText: 'Event name'),
                        ),
                  ),
                ),

                // event location
                const SizedBox(height: 15),
                const Padding(
                  padding: EdgeInsets.only(left: 25.0),
                  child: Text(
                    'Event Location',
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 25,
                    ),
                  ),
                ),

                const SizedBox(height: 15),
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 25.0),
                  child: Container(
                    decoration: BoxDecoration(
                        color: Colors.grey[200],
                        border: Border.all(color: Colors.white),
                        borderRadius: BorderRadius.circular(10)),
                    padding: const EdgeInsets.only(left: 20),
                    child: TextField(
                        controller: _eventLocation,
                        decoration: InputDecoration(
                            border: InputBorder.none,
                            hintText: 'Enter the location of your event',
                            suffixIcon: IconButton(
                                onPressed: () {
                                  _eventLocation.clear();
                                },
                                icon: const Icon(Icons.clear)))),
                  ),
                ),
                // event date
                const SizedBox(height: 15),
                const Padding(
                  padding: EdgeInsets.only(left: 25.0),
                  child: Text(
                    'Event Date',
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 25,
                    ),
                  ),
                ),
                const SizedBox(height: 15),
                const SizedBox(
                  width: 80,
                ),
                Padding(
                  padding: const EdgeInsets.only(left: 25),
                  child: Padding(
                      padding: const EdgeInsets.only(right: 25.0),
                      child: ElevatedButton(
                        style: ElevatedButton.styleFrom(
                            backgroundColor: Colors.grey[200]),
                        onPressed: () {
                          setState(() {
                            _showDatePicker(context);
                          });
                        },
                        child: Container(
                          decoration: BoxDecoration(
                              color: Colors.grey[200],
                              // border: Border.all(color: Colors.white)),
                              borderRadius: BorderRadius.circular(10)),
                          padding: EdgeInsets.all(10),
                          child: Row(
                            children: [
                              Text(
                                '${_dateTime.year}-${_dateTime.month}-${_dateTime.day}',
                                style: TextStyle(color: Colors.black),
                              ),
                              const SizedBox(
                                width: 10,
                              ),
                              const Icon(Icons.calendar_month,
                                  color: Colors.black),
                            ],
                          ),
                        ),
                      )),
                ),
                // event category
                const SizedBox(height: 15),
                const Padding(
                  padding: EdgeInsets.only(left: 25.0),
                  child: Text(
                    'Event Category',
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 25,
                    ),
                  ),
                ),

                const SizedBox(height: 15),
                Padding(
                  padding: const EdgeInsets.only(left: 25.0),
                  child: Container(
                    decoration: BoxDecoration(
                        color: Colors.grey[200],
                        border: Border.all(color: Colors.white),
                        borderRadius: BorderRadius.circular(10)),
                    child: Padding(
                      padding: const EdgeInsets.only(left: 5),
                      child: DropdownButtonHideUnderline(
                        child: DropdownButton<String>(
                            items: categories.map(buildMenuItem).toList(),
                            iconSize: 30,
                            value: dropdownValue,
                            onChanged: (value) => setState(() {
                                  dropdownValue = value!;
                                })),
                      ),
                    ),
                  ),
                ),

                // event description
                const SizedBox(height: 15),
                const Padding(
                  padding: EdgeInsets.only(left: 25.0),
                  child: Text(
                    'Event Description',
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 25,
                    ),
                  ),
                ),
                const SizedBox(height: 15),
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 25.0),
                  child: Container(
                    decoration: BoxDecoration(
                        color: Colors.grey[200],
                        border: Border.all(color: Colors.white),
                        borderRadius: BorderRadius.circular(10)),
                    padding: const EdgeInsets.only(left: 20),
                    child: TextField(
                        controller: _eventDescription,
                        decoration: InputDecoration(
                            border: InputBorder.none,
                            hintText: 'Enter a brief description of your event',
                            suffixIcon: IconButton(
                              onPressed: () {
                                _eventDescription.clear();
                              },
                              icon: const Icon(Icons.clear),
                            ))),
                  ),
                ),
                // Submit button
                const SizedBox(height: 40),
                Center(
                  child: ElevatedButton(
                      onPressed: createUser, child: const Text('Submit')),
                )
                //   event icon?
              ],
            ),
          ),
        ));
  }
}
