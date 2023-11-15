import 'package:flutter/material.dart';
import 'package:mobile/loginpage.dart';

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

  String? dropdownValue;
  final TextEditingController _eventName = TextEditingController();
  final TextEditingController _eventLocation = TextEditingController();
  final TextEditingController _eventDescription = TextEditingController();

  // a DateTime object has day, month, year and hour
  DateTime _dateTime = DateTime.now();

  void _showDatePicker() {
    showDatePicker(
      context: context,
      initialDate: DateTime.now(),
      firstDate: DateTime(2010),
      lastDate: DateTime(2025),
    ).then((value) {
      setState(() {
        _dateTime = value!;
      });
    });
  }

  DropdownMenuItem<String> buildMenuItem(String item) =>
      DropdownMenuItem(value: item, child: Text(item));

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: Colors.blueGrey,
        body: Column(
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
                    decoration: const InputDecoration(
                      border: InputBorder.none,
                      hintText: 'Enter a name for your event',
                    )
                    // border: OutlineInputBorder(),
                    // labelText: 'Event name'),
                    ),
              ),
            ),

            const SizedBox(height: 15),
            // event date
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

            Padding(
                padding: const EdgeInsets.only(left: 25.0),
                child: ElevatedButton(
                  style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.grey[200]),
                  onPressed: _showDatePicker,
                  child: const Icon(Icons.calendar_month, color: Colors.black),
                )),

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

            // event location

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
                    decoration: const InputDecoration(
                      border: InputBorder.none,
                      hintText: 'Enter the location of your event',
                    )),
              ),
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
            const SizedBox(height: 60),
            Center(
              child:
                  ElevatedButton(onPressed: () {}, child: const Text('Submit')),
            )
            //   event icon
          ],
        ));
  }
}
