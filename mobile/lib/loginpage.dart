import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:mobile/forgot_password.dart';
import 'package:mobile/signup_page.dart';
import 'package:mobile/home_page.dart';

User currentUser = User(
    userID: "",
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    jwtToken: "");

class User {
  final String userID;
  final String firstname;
  final String lastname;
  final String username;
  final String email;
  final String jwtToken;

  User(
      {required this.userID,
      required this.firstname,
      required this.lastname,
      required this.username,
      required this.email,
      required this.jwtToken});
}

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final _formfield = GlobalKey<FormState>();
  final _usernameController = TextEditingController();
  final _passwordController = TextEditingController();
  final url = "http://167.172.230.181:5000/users/login";
  bool passToggle = true;
  int responseCode = 0;
  String jwtToken = '';

  String errorMessage = "";

  Future<String> signUserIn() async {
    var response = await http.post(Uri.parse(url),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode(<String, String>{
          "username": _usernameController.text,
          "password": _passwordController.text,
        }));

    responseCode = response.statusCode;

    if (response.statusCode == 200) {
      // takes login API response and decodes it to access the data sent.
      String userID = '';
      dynamic parsedJson = jsonDecode(response.body);
      userID = parsedJson['userID'];
      jwtToken = parsedJson['token'];
      await getUserData(userID);
      print(userID);

      if (context.mounted) {
        errorMessage = "";
        Navigator.push(
            context, MaterialPageRoute(builder: (context) => const HomePage()));
      }
    }

    return response.body;
  }

  Future<int> getUserData(userID) async {
    // ignore: unnecessary_brace_in_string_interps
    String url = "http://167.172.230.181:5000/users/user-info/${userID}";
    final response = await http.get(Uri.parse(url));
    var responseData = jsonDecode(response.body);

    currentUser = User(
      userID: responseData['_id'],
      firstname: responseData['firstname'],
      lastname: responseData['lastname'],
      username: responseData['username'],
      email: responseData['email'],
      jwtToken: jwtToken,
    );

    return response.statusCode;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: const Color.fromARGB(255, 224, 224, 224),
        body: SafeArea(
          child: SingleChildScrollView(
            physics: const BouncingScrollPhysics(),
            child: Form(
              key: _formfield,
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
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 25.0),
                  child: TextFormField(
                    keyboardType: TextInputType.emailAddress,
                    controller: _usernameController,
                    decoration: InputDecoration(
                        labelText: "Username",
                        prefixIcon: const Align(
                          widthFactor: 1.0,
                          heightFactor: 1.0,
                          child: Icon(Icons.account_circle),
                        ),
                        border: const OutlineInputBorder(),
                        focusedBorder: const OutlineInputBorder(
                          borderSide: BorderSide(color: Colors.blue),
                        ),
                        fillColor: const Color.fromARGB(255, 252, 250, 250),
                        filled: true,
                        hintStyle: TextStyle(color: Colors.grey[500])),
                    validator: (value) {
                      if (value!.isEmpty) {
                        setState(() {
                          errorMessage = "INVALID USERNAME AND PASSWORD";
                        });

                        return "Enter Username";
                      }

                      if (responseCode == 400) {
                        setState(() {
                          errorMessage = "INVALID USERNAME AND PASSWORD";
                        });

                        return "";
                      }
                      return null;
                    },
                  ),
                ),
                const SizedBox(height: 10),
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 25.0),
                  child: TextFormField(
                      keyboardType: TextInputType.emailAddress,
                      controller: _passwordController,
                      obscureText: passToggle,
                      decoration: InputDecoration(
                        labelText: "Password",
                        prefixIcon: const Align(
                          widthFactor: 1.0,
                          heightFactor: 1.0,
                          child: Icon(Icons.lock),
                        ),
                        border: const OutlineInputBorder(),
                        focusedBorder: const OutlineInputBorder(
                          borderSide: BorderSide(color: Colors.blue),
                        ),
                        fillColor: const Color.fromARGB(255, 252, 250, 250),
                        filled: true,
                        hintStyle: TextStyle(color: Colors.grey[500]),
                        suffixIcon: InkWell(
                          onTap: () {
                            setState(() {
                              passToggle = !passToggle;
                            });
                          },
                          child: Icon(passToggle
                              ? Icons.visibility
                              : Icons.visibility_off),
                        ),
                      ),
                      validator: (value) {
                        if (value!.isEmpty) {
                          setState(() {
                            errorMessage = "INVALID USERNAME AND PASSWORD";
                          });

                          return "Enter Password";
                        }

                        if (responseCode == 400) {
                          setState(() {
                            errorMessage = "INVALID USERNAME AND PASSWORD";
                          });

                          return "";
                        }
                        return null;
                      }),
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
                  onPressed: () async {
                    // -- formfield validates for emptiness.
                    // -- signUserIn() then validates for correct username/password combo from API responseCode.
                    //        - "Await" is used to prevent rest of code from running before the responseCode has been updated.

                    // -- If either username or password field is empty, validator will prompt user to enter in
                    //    whichever field is blank. No change in responseCode.

                    // -- responseCode is initally 0 and will first enter the first if-statement.
                    // -- If form is not empty, but username/password are wrong, responseCode is set to 400,
                    //    and form is re-validated to return validator response for responseCode == 400.
                    //    Afterwards, code is evaluated by second if-statement.

                    if (responseCode != 400 &&
                        _formfield.currentState!.validate()) {
                      await signUserIn();

                      if (responseCode == 200) {
                        setState(() {
                          errorMessage = "";
                        });
                        print("Success");
                        _usernameController.clear();
                        _passwordController.clear();
                      }

                      if (responseCode == 400) {
                        _formfield.currentState!.validate();
                      }

                      if (responseCode == 500) {
                        setState(() {
                          errorMessage = "INTERNAL SERVER ERROR";
                        });
                      }
                    }

                    if (responseCode == 400) {
                      await signUserIn();
                      _formfield.currentState!.validate();

                      if (responseCode == 200) {
                        _usernameController.clear();
                        _passwordController.clear();
                        setState(() {
                          errorMessage = "";
                        });
                      }
                    }
                  },
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
          ),
        ));
  }
}
