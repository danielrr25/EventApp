import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:mobile/loginpage.dart';
import 'package:mobile/sections/individual_chat.dart';
import 'package:mobile/sections/search_event.dart';
import 'package:http/http.dart' as http;

class ChatSection extends StatefulWidget {
  const ChatSection({super.key});

  @override
  State<ChatSection> createState() => _ChatSectionState();
}

class _ChatSectionState extends State<ChatSection> {
  final url =
      "http://167.172.230.181:5000/events/get-attending-events/${currentUser.userID}";

  Future<List<Event>> getAttendingEvents() async {
    var response = await http.get(
      Uri.parse(url),
      headers: <String, String>{"Authorization": currentUser.jwtToken},
    );

    if (response.statusCode == 200) {
      List<dynamic> responseData = jsonDecode(response.body);

      return responseData.map((e) => Event.fromJson(e)).toList();
    } else {
      throw Exception("getAttendingEvents Failed");
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: const Color.fromARGB(255, 224, 224, 224),
        body: FutureBuilder<List<Event>>(
          future: getAttendingEvents(),
          builder: (context, snapshot) {
            if (snapshot.hasData &&
                snapshot.connectionState == ConnectionState.done) {
              return ListView.builder(
                  itemCount: snapshot.data!.length,
                  itemBuilder: (context, index) {
                    Event event = snapshot.data![index];
                    return Card(
                      child: ListTile(
                        leading: const CircleAvatar(
                          radius: 28,
                          foregroundColor: Colors.blue,
                        ),
                        title: Text(event.eventName),
                        subtitle: const Text("Tap to see Event Chat Messages"),
                        trailing: const Icon(Icons.arrow_forward),
                        onTap: () {
                          Navigator.of(context).push(MaterialPageRoute(
                              builder: (context) => IndividualChat(event)));
                        },
                      ),
                    );
                  });
            } else {
              return const Center(child: CircularProgressIndicator());
            }
          },
        ));
  }
}

// 