import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:mobile/loginpage.dart';
import 'package:mobile/sections/search_event.dart';
import 'package:http/http.dart' as http;

class SearchEvent extends SearchDelegate {
  late Future<List<Event>> _eventList;

  Future attendEvent(eventId) async {
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
        print("Attending successfully!!!!!");
        // if (context.mounted) {
        //   ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
        //     content: Text("Verification Code Sent To Email"),
        //     duration: Duration(milliseconds: 1500),
        //   ));
        // }
      } else if (response.statusCode == 400) {
        print("Please provide a valid eventID");
      } else if (response.statusCode == 409) {
        print("This user already attends this event");
      } else {
        // statusCode == 500
        print("Something went wrong with the server!");
      }
    } on Exception catch (e) {
      print("ERROR:$e");
    }

    // return response.statusCode;
  }

  @override
  List<Widget>? buildActions(BuildContext context) {
    return [
      IconButton(
          onPressed: () {
            query = '';
          },
          icon: const Icon(Icons.close))
    ];
  }

  @override
  Widget? buildLeading(BuildContext context) {
    return IconButton(
        onPressed: () {
          Navigator.pop(context);
        },
        icon: const Icon(Icons.arrow_back_ios));
  }

  @override
  Widget buildResults(BuildContext context) {
    _eventList = fetchEventList(query: query);
    return FutureBuilder<List<Event>>(
        future: _eventList,
        builder: (context, snapshot) {
          if (snapshot.hasData) {
            List<Event> filteredEvents = filterEvents(snapshot.data!, query);
            return ListView.builder(
              itemCount: filteredEvents.length,
              itemBuilder: (context, index) {
                DateTime date = DateTime.parse(filteredEvents[index].eventDate);
                return Card(
                  child: Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: InkWell(
                      onTap: () {
                        // print("Clicked instance $index");
                        showDialog(
                            context: context,
                            builder: (context) => AlertDialog(
                                  title: Text(filteredEvents[index].eventName),
                                  content: Column(
                                    crossAxisAlignment:
                                        CrossAxisAlignment.start,
                                    mainAxisSize: MainAxisSize.min,
                                    children: [
                                      Text(
                                        '${filteredEvents[index].eventLocation}\nDate: ${date.day}/${date.month}/${date.year}',
                                        style: const TextStyle(fontSize: 18),
                                      ),
                                      const SizedBox(height: 16),
                                      Text(filteredEvents[index]
                                          .eventDescription),
                                      Text(filteredEvents[index].eventCategory),
                                    ],
                                  ),
                                  actions: [
                                    TextButton(
                                        onPressed: () {
                                          attendEvent(
                                              filteredEvents[index].eventId);
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
                          filteredEvents[index].eventName,
                          style: const TextStyle(
                              fontSize: 25, fontWeight: FontWeight.bold),
                        ),
                        subtitle: Text(
                          '${filteredEvents[index].eventLocation}\nDate: ${date.day}/${date.month}/${date.year}',
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
          } else if (!snapshot.hasData) {
            return Center(
                child: RichText(
                    text: TextSpan(
                        style: Theme.of(context).textTheme.bodyLarge,
                        children: [
                  TextSpan(text: 'There is not a $query event created yet!'),
                  const WidgetSpan(
                      child: Padding(
                    padding: EdgeInsets.only(left: 5),
                    child: Icon(Icons.assist_walker),
                  ))
                ])));
          } else if (snapshot.hasError) {
            return Center(child: Text('Error: ${snapshot.error}'));
          }
          return const CircularProgressIndicator();
        });
  }

  @override
  Widget buildSuggestions(BuildContext context) {
    return const Center(child: Text('Search Events'));
  }
}
