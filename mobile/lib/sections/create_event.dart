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

  Future<Null> _showDatePicker(BuildContext context) async {
    DateTime? _datePicker = await showDatePicker(
      context: context,
      initialDate: DateTime.now(),
      firstDate: DateTime(2010),
      lastDate: DateTime(2025),
    );

    if (_datePicker != null && _datePicker != _dateTime) {
      setState(() {
        _dateTime = _datePicker;
      });
    }
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
                          // border: Border.all(color: Colors.white),
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
                          const Icon(Icons.calendar_month, color: Colors.black),
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
