// import 'dart:convert';
// import 'package:http/http.dart' as http;
// import 'package:mobile/loginpage.dart';
// import 'package:mobile/sections/search_event.dart';

// class FetchEvent {
//   // var data = [];
//   // List<Event> results = [];

//   final url = "http://167.172.230.181:5000/events/searchevent";

//   Future<Event> fetchEventList() async {
//     final response = await http.post(Uri.parse(url),
//         headers: <String, String>{
//           'Content-Type': 'application/json; charset=UTF-8',
//           'Authorization': currentUser.jwtToken
//         },
//         body: jsonEncode(<String, String>{
//           "searchString": "",
//         }));

//     // print("Response BODY: ");
//     // print(response.body);

//     if (response.statusCode == 201) {
//       // print("Search COMPLETED SUCCESSFULLY");
//       // data = json.decode(response.body);
//       // print("data:");
//       // print(data);
//       // results = data.map((e) => Event.fromJson(e)).toList();
//       return Event.fromJson(jsonDecode(response.body) as Map<String, dynamic>);
//     } else if (response.statusCode == 404) {
//       print("NO EVENTS FOUND WITH THE STRING PROVIDED");
//     } else if (response.statusCode == 500) {
//       print("EXTRANGE ERROR OCCURRED IN SEARCH");
//     }
//     throw Exception("Failed to load events");
//   }
// }
