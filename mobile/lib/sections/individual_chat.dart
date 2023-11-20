import 'package:flutter/material.dart';
import 'package:mobile/sections/search_event.dart';
import 'package:mobile/loginpage.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class Message {
  final String? userID;
  final String chatMessage;
  final String messageTime;

  Message(
      {required this.userID,
      required this.chatMessage,
      required this.messageTime});

  factory Message.fromJson(Map<String, dynamic> json) {
    return Message(
        userID: json['user'] as String?,
        chatMessage: json['message'] as String,
        messageTime: json['timestamp'] as String);
  }
}

class IndividualChat extends StatefulWidget {
  final Event event;
  const IndividualChat(this.event, {super.key});

  @override
  State<IndividualChat> createState() => _IndividualChatState();
}

class _IndividualChatState extends State<IndividualChat> {
  TextEditingController chatMessageController = TextEditingController();

  int storedIndex = 0;

  Future<List<Message>> getChatMessages(Event event) async {
    final url =
        "http://167.172.230.181:5000/chatmessages/getchatmessages/${event.eventId}";
    var response = await http.get(
      Uri.parse(url),
      headers: <String, String>{"Authorization": currentUser.jwtToken},
    );

    // print(response.body);
    // print(response.statusCode);

    if (response.statusCode == 200) {
      List<dynamic> responseData = jsonDecode(response.body);

      return responseData.map((e) => Message.fromJson(e)).toList();
    } else {
      throw Exception("getAttendingEvents Failed");
    }
  }

  Future<int> sendChatMessage(Event event) async {
    DateTime dateTime = DateTime.now();
    const sendChaturl =
        "http://167.172.230.181:5000/chatmessages/addchatmessage";

    // print("EVENT ID VALUE BEFORE USE: ${event.eventId}");
    // print("USER ID VALUE BEFORE USE: ${currentUser.userID}");
    // print("TIMESTAMP BEFORE USE: ${dateTime.toString()}");
    // print("CHAT MESSAGE BEFORE USE: ${chatMessageController.text}");

    var response = await http.post(Uri.parse(sendChaturl),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
          'Authorization': currentUser.jwtToken
        },
        body: jsonEncode(<String, String>{
          "EventId": event.eventId,
          "SenderId": currentUser.userID,
          "Timestamp": dateTime.toString(),
          "body": chatMessageController.text,
        }));

    if (response.statusCode == 201) {
      return response.statusCode;
    } else {
      print(
          "HERE IS THE RESPONSE CODE FOR SENDMESSAGE: ${response.statusCode}");
      print("HERE IS THE RESPONSE BODY FOR SENDMESSAGE: ${response.body}");
    }
    return response.statusCode;
  }

  @override
  Widget build(BuildContext context) {
    Event event = widget.event;
    getChatMessages(event);
    return Scaffold(
        resizeToAvoidBottomInset: true,
        appBar: AppBar(
          title: Text(event.eventName),
        ),
        backgroundColor: const Color.fromARGB(255, 224, 224, 224),
        body: Column(
          children: [
            Flexible(
              flex: 1,
              child: FutureBuilder<List<Message>>(
                future: getChatMessages(event),
                builder: (context, snapshot) {
                  if (snapshot.hasData &&
                      snapshot.connectionState == ConnectionState.done) {
                    return Stack(children: <Widget>[
                      ListView.builder(
                        itemCount: snapshot.data!.length,
                        shrinkWrap: false,
                        padding: const EdgeInsets.only(top: 10, bottom: 10),
                        physics: const BouncingScrollPhysics(),
                        itemBuilder: (context, index) {
                          Message messages = snapshot.data![index];

                          return Container(
                              padding: const EdgeInsets.only(
                                  left: 14, right: 14, top: 10, bottom: 10),
                              child: Align(
                                  alignment:
                                      (currentUser.userID == messages.userID
                                          ? Alignment.topRight
                                          : Alignment.topLeft),
                                  child: Container(
                                      decoration: BoxDecoration(
                                          borderRadius:
                                              BorderRadius.circular(20),
                                          color: (currentUser.userID ==
                                                  messages.userID
                                              ? Colors.blue[200]
                                              : const Color.fromARGB(
                                                  255, 194, 193, 193))),
                                      padding: const EdgeInsets.all(16),
                                      child: Column(
                                        mainAxisAlignment:
                                            MainAxisAlignment.start,
                                        crossAxisAlignment:
                                            CrossAxisAlignment.start,
                                        children: [
                                          Text(
                                            (currentUser.userID ==
                                                    messages.userID
                                                ? currentUser.username
                                                : "Another Attendee"),
                                            style: const TextStyle(
                                                fontSize: 18,
                                                fontWeight: FontWeight.bold),
                                          ),
                                          Text(
                                            messages.chatMessage,
                                            style:
                                                const TextStyle(fontSize: 19),
                                          ),
                                          Text(messages.messageTime,
                                              style: const TextStyle(
                                                  fontSize: 12)),
                                        ],
                                      ))));
                        },
                      ),
                    ]);
                  } else {
                    return const Center(child: CircularProgressIndicator());
                  }
                },
              ),
            ),
            Align(
              alignment: Alignment.bottomCenter,
              child: Container(
                padding: const EdgeInsets.only(left: 10, bottom: 10, top: 10),
                height: 60,
                width: double.infinity,
                color: const Color.fromARGB(255, 237, 235, 235),
                child: Row(
                  children: <Widget>[
                    const Icon(
                      Icons.add,
                      color: Color.fromARGB(255, 165, 165, 165),
                      size: 20,
                    ),
                    const SizedBox(
                      width: 15,
                    ),
                    Expanded(
                      child: TextField(
                        controller: chatMessageController,
                        decoration: const InputDecoration(
                            hintText: "Send message...",
                            hintStyle: TextStyle(color: Colors.black54),
                            border: InputBorder.none),
                      ),
                    ),
                    const SizedBox(
                      width: 15,
                    ),
                    FloatingActionButton(
                      onPressed: () async {
                        int statusCode = await sendChatMessage(event);
                        chatMessageController.clear();
                        print("statusCode After pressing button ${statusCode}");

                        if (statusCode == 201) {
                          print("this works");
                          setState(() {});
                        }
                      },
                      backgroundColor: Colors.blue,
                      elevation: 0,
                      child: const Icon(
                        Icons.send,
                        color: Colors.white,
                        size: 18,
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ));
  }
}
