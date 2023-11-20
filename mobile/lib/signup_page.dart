// ignore_for_file: avoid_print
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:mobile/email_verification.dart';

class SignUpPage extends StatefulWidget {
  const SignUpPage({super.key});

  @override
  State<SignUpPage> createState() => _SignUpPageState();
}

class _SignUpPageState extends State<SignUpPage> {
  final _formfield = GlobalKey<FormState>();
  final TextEditingController _userController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  final TextEditingController _firstNameController = TextEditingController();
  final TextEditingController _lastNameController = TextEditingController();
  final TextEditingController _emailController = TextEditingController();
  final url = "http://167.172.230.181:5000/users/register";
  bool passwordToggle = true;
  String jwtToken = '';
  String errorMessage = '';
  // Creates new User account
  Future<int> createUser() async {
    var response = await http.post(Uri.parse(url),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode(<String, String>{
          "username": _userController.text,
          "password": _passwordController.text,
          "firstname": _firstNameController.text,
          "lastname": _lastNameController.text,
          "email": _emailController.text
        }));

    if (response.statusCode == 201) {
      if (context.mounted) {
        ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
          content: Text("Verification Code Sent To Email"),
          duration: Duration(milliseconds: 1500),
        ));
      }
    }

    print('Response status: ${response.statusCode}');
    print('Response body: ${response.body}');
    return response.statusCode;
  }

  bool emailValidator(email) {
    return RegExp(
            r'^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$')
        .hasMatch(email);
  }

  bool passwordValidator(password) {
    return RegExp(r"(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)").hasMatch(password);
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
                const SizedBox(height: 10),
                const Text(
                  "Sign Up",
                  style: TextStyle(
                    color: Color.fromARGB(255, 0, 0, 0),
                    fontSize: 50,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const Text(
                  "Create a New Account",
                  style: TextStyle(
                    color: Color.fromARGB(255, 0, 0, 0),
                    fontSize: 20,
                  ),
                ),
                Text(errorMessage,
                    style:
                        const TextStyle(color: Color.fromARGB(255, 243, 4, 4))),
                const SizedBox(height: 25),
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 25.0),
                  child: TextFormField(
                    keyboardType: TextInputType.name,
                    controller: _firstNameController,
                    decoration: InputDecoration(
                      labelText: "First Name",
                      prefixIcon: const Align(
                        widthFactor: 1.0,
                        heightFactor: 1.0,
                        child: Icon(Icons.sentiment_satisfied_alt_rounded),
                      ),
                      border: const OutlineInputBorder(),
                      focusedBorder: const OutlineInputBorder(
                        borderSide: BorderSide(color: Colors.blue),
                      ),
                      fillColor: const Color.fromARGB(255, 252, 250, 250),
                      filled: true,
                      hintStyle: TextStyle(color: Colors.grey[500]),
                    ),
                  ),
                ),
                const SizedBox(height: 10),
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 25.0),
                  child: TextFormField(
                    keyboardType: TextInputType.name,
                    controller: _lastNameController,
                    decoration: InputDecoration(
                      labelText: "Last Name",
                      prefixIcon: const Align(
                        widthFactor: 1.0,
                        heightFactor: 1.0,
                        child: Icon(Icons.sentiment_satisfied_alt_rounded),
                      ),
                      border: const OutlineInputBorder(),
                      focusedBorder: const OutlineInputBorder(
                        borderSide: BorderSide(color: Colors.blue),
                      ),
                      fillColor: const Color.fromARGB(255, 252, 250, 250),
                      filled: true,
                      hintStyle: TextStyle(color: Colors.grey[500]),
                    ),
                  ),
                ),
                const SizedBox(height: 10),
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 25.0),
                  child: TextFormField(
                      keyboardType: TextInputType.name,
                      controller: _emailController,
                      decoration: InputDecoration(
                        labelText: "Email",
                        prefixIcon: const Align(
                          widthFactor: 1.0,
                          heightFactor: 1.0,
                          child: Icon(Icons.email_rounded),
                        ),
                        border: const OutlineInputBorder(),
                        focusedBorder: const OutlineInputBorder(
                          borderSide: BorderSide(color: Colors.blue),
                        ),
                        fillColor: const Color.fromARGB(255, 252, 250, 250),
                        filled: true,
                        hintStyle: TextStyle(color: Colors.grey[500]),
                      ),
                      validator: (value) {
                        if (value!.isEmpty) {
                          return "Enter Email";
                        }

                        if (emailValidator(value) == false) {
                          return "Enter Valid Email Address";
                        }
                        return null;
                      }),
                ),
                const SizedBox(height: 10),
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 25.0),
                  child: TextFormField(
                      keyboardType: TextInputType.name,
                      controller: _userController,
                      decoration: InputDecoration(
                        labelText: "Username",
                        prefixIcon: const Align(
                          widthFactor: 1.0,
                          heightFactor: 1.0,
                          child: Icon(Icons.account_circle_outlined),
                        ),
                        border: const OutlineInputBorder(),
                        focusedBorder: const OutlineInputBorder(
                          borderSide: BorderSide(color: Colors.blue),
                        ),
                        fillColor: const Color.fromARGB(255, 252, 250, 250),
                        filled: true,
                        hintStyle: TextStyle(color: Colors.grey[500]),
                      ),
                      validator: (value) {
                        if (value!.isEmpty) {
                          return "Enter Username";
                        }
                        return null;
                      }),
                ),
                const SizedBox(height: 10),
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 25.0),
                  child: TextFormField(
                      keyboardType: TextInputType.name,
                      controller: _passwordController,
                      obscureText: passwordToggle,
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
                        errorMaxLines: 3,
                        suffixIcon: InkWell(
                          onTap: () {
                            setState(() {
                              passwordToggle = !passwordToggle;
                            });
                          },
                          child: Icon(passwordToggle
                              ? Icons.visibility
                              : Icons.visibility_off),
                        ),
                      ),
                      validator: (value) {
                        if (value!.isEmpty) {
                          return "Enter Password";
                        }
                        if (passwordValidator(value) == false) {
                          return "Password Must Be At Least 8 Characters Long, Have a Capital and Lowercase Letter, a Number, and a Special Symbol (!, #, @, etc.)";
                        }

                        if (value.length < 8) {
                          return "Password Must Be At Least 8 Characters Long";
                        }
                        return null;
                      }),
                ),
                const SizedBox(height: 25),
                ElevatedButton(
                    style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.black,
                        foregroundColor: Colors.white,
                        minimumSize: const Size(365, 50),
                        shape: const RoundedRectangleBorder(
                            borderRadius:
                                BorderRadius.all(Radius.circular(8)))),
                    onPressed: () async {
                      setState(() {
                        errorMessage = '';
                      });

                      if (_formfield.currentState!.validate()) {
                        int statusCode = await createUser();
                        if (statusCode == 201) {
                          if (context.mounted) {
                            Navigator.push(
                                context,
                                MaterialPageRoute(
                                    builder: (context) =>
                                        const EmailVerification()));
                          }
                        } else if (statusCode == 400) {
                          setState(() {
                            errorMessage = 'Username or Email Already In Use';
                          });
                        } else {
                          setState(() {
                            errorMessage =
                                'Internal Server Error. Try Again Later';
                          });
                        }
                      }
                    },
                    child:
                        const Text('Sign Up', style: TextStyle(fontSize: 20))),
                const SizedBox(height: 10),
                TextButton(
                  style: TextButton.styleFrom(),
                  onPressed: () => {Navigator.pop(context)},
                  child: const Text('Back to Login',
                      style: TextStyle(fontSize: 20)),
                )
              ]),
            ),
          ),
        ));
  }
}
