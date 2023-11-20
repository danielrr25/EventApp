import 'package:flutter/material.dart';
// import 'package:mobile/components/fetch_user.dart';
// import 'package:mobile/sections/search_event_utils.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:mobile/loginpage.dart';
import 'package:mobile/sections/search_event_utils.dart';

const url = "http://167.172.230.181:5000/events/searchevent";

Future<List<Event>> fetchEventList({String? query}) async {
  final response = await http.post(Uri.parse(url),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': currentUser.jwtToken
      },
      body: jsonEncode(<String, String>{
        "searchString": query ?? "",
      }));

  // print("Response BODY: ");
  print(response.body);
  // print("Status code: ");
  // print(response.statusCode);

  if (response.statusCode == 201) {
    print("Search COMPLETED SUCCESSFULLY");
    // data = json.decode(response.body);
    // print("data:");
    // print(data);
    Map<String, dynamic> responseData = json.decode(response.body);
    List<dynamic> eventsData = responseData['events'];
    return eventsData.map((e) => Event.fromJson(e)).toList();
  } else if (response.statusCode == 404) {
    print("NO EVENTS FOUND WITH THE STRING PROVIDED");
  } else if (response.statusCode == 500) {
    print("EXTRANGE ERROR OCCURRED IN SEARCH");
  }
  throw Exception("Failed to load events");
}

Future attendEvent(eventId, context) async {
  const url = "http://167.172.230.181:5000/events/attendevent";
  try {
    var response = await http.post(Uri.parse(url),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
          'Authorization': currentUser.jwtToken
        },
        body: jsonEncode(<String, String>{
          "eventid": eventId,
          "userid": currentUser.userID,
        }));
    print('Response status: ${response.statusCode}');
    print('Response body: ${response.body}');

    if (response.statusCode == 201) {
      // print("Attending successfully!!!!!");
      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
        content: Text("You are attending this event!"),
        duration: Duration(milliseconds: 3000),
      ));
    } else if (response.statusCode == 400) {
      print("Please provide a valid eventID");
    } else if (response.statusCode == 409) {
      print("This user already attends this event");
      showDialog(
          context: context,
          builder: (context) => AlertDialog(
                title: const Text('Wait!'),
                content: const Text('You are already attending this event'),
                actions: [
                  TextButton(
                      onPressed: () {
                        Navigator.pop(context);
                      },
                      child: const Text('OK'))
                ],
              ));
    } else {
      // statusCode == 500
      print("Something went wrong with the server!");

      showDialog(
          context: context,
          builder: (context) => AlertDialog(
                title: const Text('Oops!'),
                content: const Text(
                    'Something went wrong with the server. Try it again later'),
                actions: [
                  TextButton(
                      onPressed: () {
                        Navigator.pop(context);
                      },
                      child: const Text('OK'))
                ],
              ));
    }
  } on Exception catch (e) {
    print("ERROR:$e");
  }
}

List<Event> filterEvents(List<Event> events, String query) {
  return events
      .where((event) =>
          event.eventName.toLowerCase().contains(query.toLowerCase()) ||
          (event.eventLocation.toLowerCase().contains(query.toLowerCase())) ||
          (event.eventCategory.toLowerCase().contains(query.toLowerCase())))
      .toList();
}

class Search extends StatefulWidget {
  const Search({super.key});

  @override
  State<Search> createState() => _Search();
}

class _Search extends State<Search> {
  late final Future<List<Event>> _eventList = fetchEventList();
  final GlobalKey<ScaffoldState> _scaffoldKey = GlobalKey<ScaffoldState>();

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        key: _scaffoldKey,
        appBar: AppBar(
          automaticallyImplyLeading: false,
          title: const Text('Events in your area'),
          actions: [
            IconButton(
                onPressed: () {
                  showSearch(
                      context: context, delegate: SearchEvent(_scaffoldKey));
                },
                icon: const Icon(Icons.search_rounded))
          ],
        ),
        body: Container(
            padding: const EdgeInsets.all(10),
            child: FutureBuilder<List<Event>>(
                future: _eventList,
                builder: (context, snapshot) {
                  if (snapshot.hasData) {
                    return ListView.builder(
                      itemCount: snapshot.data!.length,
                      itemBuilder: (context, index) {
                        DateTime date =
                            DateTime.parse(snapshot.data![index].eventDate);
                        return Card(
                          child: Padding(
                            padding: const EdgeInsets.all(8.0),
                            child: InkWell(
                              onTap: () {
                                print('clicked instance: ${index}');
                                showDialog(
                                    context: context,
                                    builder: (context) => AlertDialog(
                                          title: Text(
                                              snapshot.data![index].eventName),
                                          content: Column(
                                            crossAxisAlignment:
                                                CrossAxisAlignment.start,
                                            mainAxisSize: MainAxisSize.min,
                                            children: [
                                              Text(
                                                '${snapshot.data![index].eventLocation}\nDate: ${date.day}/${date.month}/${date.year}',
                                                style: const TextStyle(
                                                    fontSize: 18),
                                              ),
                                              const SizedBox(height: 16),
                                              Text(snapshot.data![index]
                                                  .eventDescription),
                                              Text(snapshot
                                                  .data![index].eventCategory),
                                            ],
                                          ),
                                          actions: [
                                            TextButton(
                                                onPressed: () {
                                                  attendEvent(
                                                      snapshot
                                                          .data![index].eventId,
                                                      context);
                                                  Navigator.pop(context);
                                                },
                                                child: const Text('Attend')),
                                            TextButton(
                                                onPressed: () {
                                                  Navigator.pop(context);
                                                },
                                                child: const Text('Close')),
                                          ],
                                        ));
                              },
                              child: ListTile(
                                // date = snapshot.data![index].eventDate as DateTime;
                                title: Text(
                                  snapshot.data![index].eventName,
                                  style: const TextStyle(
                                      fontSize: 25,
                                      fontWeight: FontWeight.bold),
                                ),
                                subtitle: Text(
                                  '${snapshot.data![index].eventLocation}\nDate: ${date.day}/${date.month}/${date.year}',
                                  style: const TextStyle(
                                    fontSize: 18,
                                  ),
                                ),
                                // trailing: Text('When?$date'),
                              ),
                            ),
                          ),
                        );
                      },
                    );
                  } else if (snapshot.hasError) {
                    return Text('Error: ${snapshot.error}');
                  }
                  return const CircularProgressIndicator();
                })),
      ),
    );
  }
}

class Event {
  final String eventName;
  final String eventLocation;
  final String eventDate;
  final String eventId;
  final String eventCategory;
  final String eventDescription;

  const Event(
      {required this.eventName,
      required this.eventLocation,
      required this.eventDate,
      required this.eventId,
      required this.eventCategory,
      required this.eventDescription});

  factory Event.fromJson(Map<String, dynamic> json) {
    return Event(
        eventName: json['eventName'] as String,
        eventLocation: json['eventLocation'] as String,
        eventDate: json['eventDate'] as String,
        eventId: json['_id'] as String,
        eventDescription: json['eventDescription'] as String,
        eventCategory: json['eventCategory'] as String);
  }
}
