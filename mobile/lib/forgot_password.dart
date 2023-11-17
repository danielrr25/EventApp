import 'package:flutter/material.dart';
import 'package:mobile/new_password.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class ResetPassword extends StatefulWidget {
  const ResetPassword({super.key});

  @override
  State<ResetPassword> createState() => _ResetPasswordState();
}

class _ResetPasswordState extends State<ResetPassword> {
  final _formfield = GlobalKey<FormState>();
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passCodeController = TextEditingController();
  final sendCodeUrl = "http://167.172.230.181:5000/users/resetpassword";
  final verifyCodeUrl =
      "http://167.172.230.181:5000/users/resetpasswordentercode";
  String errorMessage = "";

  Future<int> sendEmailResetCode() async {
    var response = await http.post(Uri.parse(sendCodeUrl),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode(<String, String>{
          "email": _emailController.text,
        }));

    print("sendEmailResetCode Status Code: ${response.statusCode}");

    if (response.statusCode == 201) {
      if (context.mounted) {
        ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
          content: Text("Reset Code Sent to Email"),
          duration: Duration(milliseconds: 1500),
        ));
      }
    }

    if (response.statusCode == 404) {
      if (context.mounted) {
        ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
          content: Text("No Account Associated With This Email."),
          duration: Duration(milliseconds: 1500),
        ));
      }
    }

    if (response.statusCode == 500) {
      if (context.mounted) {
        ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
          content: Text("Server Error. Try Again Later"),
          duration: Duration(milliseconds: 1500),
        ));
      }
    }

    return response.statusCode;
  }

  Future<int> verifyResetCode() async {
    var response = await http.post(Uri.parse(verifyCodeUrl),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode(<String, String>{
          "code": _passCodeController.text,
        }));

    if (response.statusCode == 201) {
      if (context.mounted) {
        ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
          content: Text("Password Successfully Reset"),
          duration: Duration(milliseconds: 1500),
        ));
      }
    }

    if (response.statusCode == 404) {
      if (context.mounted) {
        ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
          content:
              Text("Invalid Code. Please Type In The Code Sent to Your Email"),
          duration: Duration(milliseconds: 1500),
        ));
      }
    }

    if (response.statusCode == 500) {
      if (context.mounted) {
        ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
          content: Text("Server Error. Try Again Later"),
          duration: Duration(milliseconds: 1500),
        ));
      }
    }

    return response.statusCode;
  }

  bool emailValidator(email) {
    return RegExp(
            r'^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$')
        .hasMatch(email);
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
              child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Image.asset(
                      'assets/icon/no_background_logo.jpg',
                      height: 160,
                      width: 160,
                    ),
                    const SizedBox(height: 20),
                    const Text(
                      "Reset Password",
                      style: TextStyle(
                        color: Color.fromARGB(255, 0, 0, 0),
                        fontSize: 40,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const Text(
                      "Enter Your Email",
                      style: TextStyle(
                        color: Color.fromARGB(255, 0, 0, 0),
                        fontSize: 20,
                      ),
                    ),
                    const Text(
                      "And We'll Send You a Code\n to Reset Your Password",
                      style: TextStyle(
                        color: Color.fromARGB(255, 0, 0, 0),
                        fontSize: 20,
                      ),
                    ),
                    Text(errorMessage,
                        style: const TextStyle(
                            color: Color.fromARGB(255, 243, 4, 4))),
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 23.0),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.end,
                        children: [
                          TextButton(
                            onPressed: () {
                              Navigator.pop(context);
                            },
                            child: const Text(
                              "Return to Login",
                              style: TextStyle(
                                color: Color.fromARGB(255, 29, 71, 98),
                                fontSize: 16,
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 25.0),
                      child: TextFormField(
                          keyboardType: TextInputType.emailAddress,
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
                              fillColor:
                                  const Color.fromARGB(255, 252, 250, 250),
                              filled: true,
                              hintStyle: TextStyle(color: Colors.grey[500]),
                              suffixIcon: TextButton(
                                onPressed: () async {
                                  setState(() {
                                    errorMessage = '';
                                  });
                                  if (_formfield.currentState!.validate()) {
                                    int statusCode = await sendEmailResetCode();

                                    if (statusCode == 404) {
                                      setState(() {
                                        errorMessage =
                                            'No Account Associated With This Email';
                                      });
                                    }

                                    if (statusCode == 500) {
                                      setState(() {
                                        errorMessage =
                                            'Could Not Send Email. Internal Server Error. Try Again Later';
                                      });
                                    }
                                  }
                                },
                                style: TextButton.styleFrom(
                                    minimumSize: Size.zero,
                                    padding: const EdgeInsets.only(right: 10),
                                    tapTargetSize:
                                        MaterialTapTargetSize.shrinkWrap),
                                child: const Text(
                                  'Send Code',
                                  style: TextStyle(
                                    color: Color.fromARGB(255, 25, 90, 131),
                                    fontSize: 16,
                                  ),
                                ),
                              )),
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
                    const SizedBox(height: 15),
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 25.0),
                      child: TextFormField(
                        keyboardType: TextInputType.emailAddress,
                        controller: _passCodeController,
                        decoration: InputDecoration(
                          labelText: "Passcode",
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
                        ),
                      ),
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
                        int statusCode = await verifyResetCode();

                        print(statusCode);

                        if (statusCode == 201) {
                          if (context.mounted) {
                            Navigator.push(
                                context,
                                MaterialPageRoute(
                                    builder: (context) => const NewPassword()));
                          }
                        }

                        if (statusCode == 404) {
                          setState(() {
                            errorMessage = 'Incorrect Code';
                          });
                        }

                        if (statusCode == 500) {
                          setState(() {
                            errorMessage =
                                'Internal Server Error. Try Again Later';
                          });
                        }
                      },
                      child: const Text('Reset Password',
                          style: TextStyle(fontSize: 20)),
                    ),
                    const SizedBox(height: 20),
                  ]),
            ),
          ),
        ));
  }
}
