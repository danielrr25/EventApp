import 'package:flutter/material.dart';
// import 'package:mobile/components/fetch_user.dart';
// import 'package:mobile/sections/search_event_utils.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:mobile/loginpage.dart';

const url = "http://167.172.230.181:5000/events/searchevent";

Future<List<Event>> fetchEventList() async {
  final response = await http.post(Uri.parse(url),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': currentUser.jwtToken
      },
      body: jsonEncode(<String, String>{
        "searchString": "",
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

    // results = data.map((e) => Event.fromJson(e)).toList();
    // List<dynamic> eventsData = json.decode(response.body);
    // return eventsData.map((e) => Event.fromJson(e)).toList();
    // return Event.fromJson(jsonDecode(response.body) as Map<String, dynamic>);
  } else if (response.statusCode == 404) {
    print("NO EVENTS FOUND WITH THE STRING PROVIDED");
  } else if (response.statusCode == 500) {
    print("EXTRANGE ERROR OCCURRED IN SEARCH");
  }
  throw Exception("Failed to load events");
}

class Search extends StatefulWidget {
  const Search({super.key});

  @override
  State<Search> createState() => _Search();
}

class _Search extends State<Search> {
  late final Future<List<Event>> _eventList = fetchEventList();

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Fetching Events',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.purple),
      ),
      home: Scaffold(
        appBar: AppBar(
          title: const Text('Fetch events data'),
        ),
        body: Center(
            child: FutureBuilder<List<Event>>(
                future: _eventList,
                builder: (context, snapshot) {
                  if (snapshot.hasData) {
                    return ListView.builder(
                      itemCount: snapshot.data!.length,
                      itemBuilder: (context, index) {
                        return ListTile(
                          title: Text(snapshot.data![index].eventName),
                          subtitle: (Text(snapshot.data![index].eventLocation)),
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

  const Event({
    required this.eventName,
    required this.eventLocation,
    required this.eventDate,
  });

  factory Event.fromJson(Map<String, dynamic> json) {
    return Event(
      eventName: json['eventName'] as String,
      eventLocation: json['eventLocation'] as String,
      eventDate: json['eventDate'] as String,
    );
  }
}
