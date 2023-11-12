import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:mobile/components/text_field.dart';
import 'package:mobile/forgot_password.dart';
import 'package:mobile/signup_page.dart';
import 'package:mobile/home_page.dart';

User currentUser =
    User(userID: "", firstname: "", lastname: "", username: "", email: "");

class User {
  final String userID;
  final String firstname;
  final String lastname;
  final String username;
  final String email;

  User({
    required this.userID,
    required this.firstname,
    required this.lastname,
    required this.username,
    required this.email,
  });
}

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final usernameController = TextEditingController();
  final passwordController = TextEditingController();
  final url = "http://167.172.230.181:5000/users/login";

  String errorMessage = "";

  void signUserIn() async {
    var response = await http.post(Uri.parse(url),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode(<String, String>{
          "username": usernameController.text,
          "password": passwordController.text,
        }));

    if (response.statusCode == 200) {
      // takes login API response and decodes it to access the data sent.
      String userID = '';
      dynamic parsedJson = jsonDecode(response.body);
      userID = parsedJson['userID'];
      getUserData(userID);

      if (context.mounted) {
        errorMessage = "";
        Navigator.push(
            context, MaterialPageRoute(builder: (context) => const HomePage()));
      }
    } else if (response.statusCode == 400) {
      setState(() {
        errorMessage = "INVALID LOGIN AND USERNAME";
      });
    } else {
      setState(() {
        errorMessage = "INTERNAL SERVER ERROR";
      });
    }
  }

  void getUserData(userID) async {
    // ignore: unnecessary_brace_in_string_interps
    String url = "http://167.172.230.181:5000/users/user-info/${userID}";
    final response = await http.get(Uri.parse(url));
    var responseData = jsonDecode(response.body);
    print(userID);

    currentUser = User(
      userID: responseData['_id'],
      firstname: responseData['firstname'],
      lastname: responseData['lastname'],
      username: responseData['username'],
      email: responseData['email'],
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: const Color.fromARGB(255, 224, 224, 224),
        body: SafeArea(
          child: SingleChildScrollView(
            physics: const BouncingScrollPhysics(),
            child: Column(children: [
              Image.asset(
                'assets/icon/no_background_logo.jpg',
                height: 160,
                width: 160,
              ),
              const SizedBox(height: 20),
              const Text(
                "Welcome",
                style: TextStyle(
                  color: Color.fromARGB(255, 0, 0, 0),
                  fontSize: 50,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const Text(
                "Log into your account",
                style: TextStyle(
                  color: Color.fromARGB(255, 0, 0, 0),
                  fontSize: 20,
                ),
              ),
              const SizedBox(height: 10),
              Text(errorMessage,
                  style:
                      const TextStyle(color: Color.fromARGB(255, 243, 4, 4))),
              const SizedBox(height: 15),
              MyTextField(
                controller: usernameController,
                hintText: 'Enter Username',
                obscureText: false,
                textIcon: const Icon(Icons.account_circle),
              ),
              const SizedBox(height: 10),
              MyTextField(
                controller: passwordController,
                hintText: 'Enter Password',
                obscureText: true,
                textIcon: const Icon(Icons.lock_sharp),
              ),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 23.0),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.end,
                  children: [
                    TextButton(
                      onPressed: () {
                        Navigator.push(
                            context,
                            MaterialPageRoute(
                                builder: (context) => const ResetPassword()));
                      },
                      child: const Text(
                        "Forgot Password?",
                        style: TextStyle(
                          color: Color.fromARGB(255, 29, 71, 98),
                          fontSize: 16,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              ElevatedButton(
                style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.black,
                    foregroundColor: Colors.white,
                    minimumSize: const Size(365, 50),
                    shape: const RoundedRectangleBorder(
                        borderRadius: BorderRadius.all(Radius.circular(8)))),
                onPressed: signUserIn,
                child: const Text('Log in', style: TextStyle(fontSize: 20)),
              ),
              const SizedBox(height: 20),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Text(
                    "Don't have an account?",
                    style: TextStyle(
                      color: Color.fromARGB(255, 63, 61, 61),
                      fontSize: 16,
                    ),
                  ),
                  TextButton(
                    onPressed: () {
                      setState(() {
                        errorMessage = "";
                      });
                      Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (context) => const SignUpPage()));
                    },
                    child: const Text(
                      'Register Here',
                      style: TextStyle(
                        color: Color.fromARGB(255, 76, 170, 229),
                        fontSize: 16,
                      ),
                    ),
                  )
                ],
              ),
            ]),
          ),
        ));
  }
}
