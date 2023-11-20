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
        ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
          content: Text("Account Successfully Deleted"),
          duration: Duration(milliseconds: 1500),
        ));
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

  Future<void> showLogoutConfirmationPopUp() async {
    return showDialog<void>(
      context: context,
      barrierDismissible: false, // user must tap button!
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('Logout Confirmation'),
          content: const SingleChildScrollView(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.start,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: <Widget>[
                Text(
                    "You will be logged out of your account. You will need to sign back in if you want to access your events.\n"),
                Text("Are you sure?"),
              ],
            ),
          ),
          actions: <Widget>[
            TextButton(
              child: const Text('Cancel'),
              onPressed: () {
                Navigator.of(context).pop();
              },
            ),
            TextButton(
              child: const Text('Log out'),
              onPressed: () {
                print('Confirmed');
                Navigator.of(context).pop();
                ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
                    content: Text("Successfully Logged out"),
                    duration: Duration(milliseconds: 1500)));
                Navigator.pop(context);
              },
            ),
          ],
        );
      },
    );
  }

  Future<void> showDeleteAccountConfirmationPopUp() async {
    return showDialog<void>(
      context: context,
      barrierDismissible: false, // user must tap button!
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('Delete Account Confirmation'),
          content: const SingleChildScrollView(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.start,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: <Widget>[
                Text(
                    "You will permanently delete your account and will lose all access to all your events.\n"),
                Text("Are you sure you want to delete your account?"),
              ],
            ),
          ),
          actions: <Widget>[
            TextButton(
              child: const Text('Cancel'),
              onPressed: () {
                Navigator.of(context).pop();
              },
            ),
            TextButton(
              child: const Text('Yes, Delete My Account'),
              onPressed: () {
                print('Confirmed');
                Navigator.of(context).pop();
                deleteAccount();
              },
            ),
          ],
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(crossAxisAlignment: CrossAxisAlignment.center, children: [
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 0),
          child: FittedBox(
            child: Text(
              'Name: ${currentUser.firstname} ${currentUser.lastname} \nUsername: ${currentUser.username} \nEmail: ${currentUser.email}',
              style: const TextStyle(fontSize: 30, fontWeight: FontWeight.bold),
            ),
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
            showDeleteAccountConfirmationPopUp();
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
            showLogoutConfirmationPopUp();
          },
          child: const Text('Log out', style: TextStyle(fontSize: 20)),
        ),

        
      ]),
    );
  }
}
