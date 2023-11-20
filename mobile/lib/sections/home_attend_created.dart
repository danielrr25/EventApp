// import 'dart:html';

import 'package:flutter/material.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:mobile/loginpage.dart';
import 'search_event.dart';

var urlAttend =
    'http://167.172.230.181:5000/events/get-attending-events/${currentUser.userID}';
var urlCreated =
    'http://167.172.230.181:5000/events/get-created-events/${currentUser.userID}';

Future<List<Event>> getAttendingEventsList() async {
  try {
    final response = await http.get(
      Uri.parse(urlAttend),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': currentUser.jwtToken
      },
    );

    if (response.statusCode == 200) {
      List<dynamic> eventsData = json.decode(response.body);
      return eventsData.map((e) => Event.fromJson(e)).toList();
    } else if (response.statusCode == 500) {
      print("EXTRANGE ERROR OCCURRED GETTING ATTENDING EVENTS");
    }
  } on Exception catch (e) {
    print('Exception: $e');
  }
  throw Exception('Unsupported operation!');
}

Future<List<Event>> getCreatedEventsList() async {
  try {
    final response = await http.get(
      Uri.parse(urlCreated),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': currentUser.jwtToken
      },
    );

    if (response.statusCode == 200) {
      print("Retrieved created events SUCCESSFULLY");
      List<dynamic> eventsData = json.decode(response.body);
      return eventsData.map((e) => Event.fromJson(e)).toList();
    } else if (response.statusCode == 500) {
      print("EXTRANGE ERROR GETTING CREATED EVENTS");
    }
  } on Exception catch (e) {
    print('Exception: $e');
  }
  throw Exception('Unsupported operation!');
}

var urlUnattend = 'http://167.172.230.181:5000/events/unattendevent';
void unattendEvent(currentEventID) async {
  try {
    final response = await http.post(Uri.parse(urlUnattend),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
          'Authorization': currentUser.jwtToken
        },
        body: jsonEncode(<String, String>{
          "eventid": currentEventID,
          "userid": currentUser.userID,
        }));

    if (response.statusCode == 201) {
      print("No longer attending this event");
    } else if (response.statusCode == 400) {
      print("EVENT ID NOT VALID");
    } else if (response.statusCode == 409) {
      print("This user is not attending this event");
    } else if (response.statusCode == 500) {
      print("SOMETHING WENT WRONG WITH THE SERVER. TRY LATER");
    }
  } on Exception catch (e) {
    print('Exception: $e');
  }
}

void deleteEvent(eventId) async {
  var urlDelEvent = 'http://167.172.230.181:5000/events/delete-event/$eventId';
  try {
    final response = await http.get(
      Uri.parse(urlDelEvent),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': currentUser.jwtToken
      },
    );

    print("Status code in delete event function: ");
    print(response.statusCode);
    if (response.statusCode == 200) {
      print('Success');
    } else if (response.statusCode == 404) {
      print('Event not found');
    } else if (response.statusCode == 500) {
      print("EXTRANGE ERROR OCCURRED IN SEARCH");
    }
  } on Exception catch (e) {
    print('Exception: $e');
  }
}

class TheHomepage extends StatefulWidget {
  const TheHomepage({super.key});

  @override
  State<TheHomepage> createState() => _TheHomepageState();
}

class _TheHomepageState extends State<TheHomepage> {
  late Future<List<Event>> attendingEventsList;
  late Future<List<Event>> createdEventsList;

  @override
  void initState() {
    super.initState();
    attendingEventsList = getAttendingEventsList();
    createdEventsList = getCreatedEventsList();
  }

  Future<void> _showUnattendDialog(String eventName, String eventId) async {
    return showDialog(
        context: context,
        barrierDismissible: false,
        builder: (BuildContext context) {
          return AlertDialog(
            title: const Text('Unattend event'),
            content: SingleChildScrollView(
              child: ListBody(
                children: <Widget>[
                  Text('Are you sure you want to unattend $eventName?')
                ],
              ),
            ),
            actions: <Widget>[
              TextButton(
                  onPressed: () {
                    Navigator.of(context).pop();
                  },
                  child: const Text('Cancel')),
              TextButton(
                  onPressed: () {
                    unattendEvent(eventId);
                    ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
                      content: Text("You are NO LONGER attending this event!"),
                      duration: Duration(milliseconds: 3000),
                    ));
                    Navigator.of(context).pop();
                  },
                  child: const Text('Unattend'))
            ],
          );
        });
  }

  Future<void> _showDeleteEventDialog(String eventName, String eventId) async {
    return showDialog(
        context: context,
        barrierDismissible: false,
        builder: (BuildContext context) {
          return AlertDialog(
            title: const Text('Delete event'),
            content: SingleChildScrollView(
              child: ListBody(
                children: <Widget>[
                  Text('Are you sure you want to delete $eventName?')
                ],
              ),
            ),
            actions: <Widget>[
              TextButton(
                  onPressed: () {
                    Navigator.of(context).pop();
                  },
                  child: const Text('Cancel')),
              TextButton(
                  onPressed: () {
                    deleteEvent(eventId);
                    Navigator.of(context).pop();
                  },
                  child: const Text('Delete'))
            ],
          );
        });
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        body: Column(
          // mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Text(
              'Attending Events',
              style: TextStyle(fontSize: 30, fontWeight: FontWeight.bold),
            ),
            Expanded(
              child: FutureBuilder<List<Event>>(
                  future: attendingEventsList,
                  builder: (context, snapshot) {
                    if (snapshot.hasData) {
                      return ListView.builder(
                        itemCount: snapshot.data!.length,
                        itemBuilder: (context, index) {
                          return InkWell(
                            onTap: () {
                              // NOTIFY THE USER THAT HE IS NOT ATTENDING
                              // unattendEvent(snapshot.data![index].eventId);
                              _showUnattendDialog(
                                  snapshot.data![index].eventName,
                                  snapshot.data![index].eventId);
                              // IMPLEMENT UNATTEND HERE
                            },
                            child: Card(
                              child: ListTile(
                                title: Text(snapshot.data![index].eventName),
                                subtitle:
                                    Text(snapshot.data![index].eventCategory),
                              ),
                            ),
                          );
                        },
                      );
                    } else if (snapshot.hasError) {
                      return Text('${snapshot.error}');
                    }
                    return const CircularProgressIndicator();
                  }),
            ),
            const Text(
              'My Events',
              style: TextStyle(fontSize: 30, fontWeight: FontWeight.bold),
            ),
            Expanded(
              child: FutureBuilder<List<Event>>(
                  future: createdEventsList,
                  builder: (context, snapshotCreated) {
                    if (snapshotCreated.hasData) {
                      return ListView.builder(
                        itemCount: snapshotCreated.data!.length,
                        itemBuilder: (context, index) {
                          return InkWell(
                            onTap: () {
                              // deleteEvent(snapshotCreated.data![index].eventId);
                              _showDeleteEventDialog(
                                  snapshotCreated.data![index].eventName,
                                  snapshotCreated.data![index].eventId);
                            },
                            child: Card(
                              child: ListTile(
                                title: Text(
                                    snapshotCreated.data![index].eventName),
                                subtitle: Text(
                                    snapshotCreated.data![index].eventCategory),
                              ),
                            ),
                          );
                        },
                      );
                    } else if (snapshotCreated.hasError) {
                      return Text('${snapshotCreated.error}');
                    }
                    return const CircularProgressIndicator();
                  }),
            ),
          ],
        ),
      ),
    );
  }
}
