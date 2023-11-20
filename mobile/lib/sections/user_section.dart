import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:mobile/loginpage.dart';

class UserSettings extends StatefulWidget {
  const UserSettings({super.key});

  @override
  State<UserSettings> createState() => _UserSettingsState();
} 

class _UserSettingsState extends State<UserSettings> {
  final String url = "http://167.172.230.181:5000/users/deleteuser";

  deleteAccount() async {
    var response = await http.post(Uri.parse(url),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
          'Authorization': currentUser.jwtToken,
        },
        body: jsonEncode(<String, String>{
          "id": currentUser.userID,
        }));
    print("RESPONSE CODE: ${response.statusCode}");
    print("RESPONSE BODY: ${response.body}");
    if (response.statusCode == 201) {
      if (context.mounted) {
        Navigator.pop(context);
      }
    }

    if (response.statusCode == 222) {
      print("Session Token Expired. Please Login Again");
      if (context.mounted) {
        ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
            content: Text("Session Token Expired. Please Login Again"),
            duration: Duration(milliseconds: 1500)));
        Navigator.pop(context);
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(children: [
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 0),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(
                  'Name: ${currentUser.firstname} ${currentUser.lastname} \nUsername: ${currentUser.username} \nEmail: ${currentUser.email}',
                  style: const TextStyle(
                      fontSize: 30, fontWeight: FontWeight.bold)),
            ],
          ),
        ),
        const SizedBox(height: 20),
        ElevatedButton(
          style: ElevatedButton.styleFrom(
              backgroundColor: Colors.black,
              foregroundColor: Colors.white,
              minimumSize: const Size(365, 50),
              shape: const RoundedRectangleBorder(
                  borderRadius: BorderRadius.all(Radius.circular(8)))),
          onPressed: () {
            deleteAccount();
          },
          child: const Text('Delete Account', style: TextStyle(fontSize: 20)),
        ),
        const SizedBox(height: 20),
        ElevatedButton(
          style: ElevatedButton.styleFrom(
              backgroundColor: Colors.black,
              foregroundColor: Colors.white,
              minimumSize: const Size(365, 50),
              shape: const RoundedRectangleBorder(
                  borderRadius: BorderRadius.all(Radius.circular(8)))),
          onPressed: () {
            Navigator.pop(context);
          },
          child: const Text('Log out', style: TextStyle(fontSize: 20)),
        ),

        
      ]),
    );
  }
}
