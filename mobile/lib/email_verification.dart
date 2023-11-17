import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:mobile/loginpage.dart';

class EmailVerification extends StatefulWidget {
  const EmailVerification({super.key});

  @override
  State<EmailVerification> createState() => _EmailVerificationState();
}

class _EmailVerificationState extends State<EmailVerification> {
  final _formfield = GlobalKey<FormState>();
  final _passCodeController = TextEditingController();
  String errorMessage = "";
  final url = "http://167.172.230.181:5000/users/verifyemail";

  Future<int> sendEmailVerification(emailToken) async {
    var response = await http.post(Uri.parse(url),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode(<String, String>{
          "emailvtoken": _passCodeController.text,
        }));

    if (response.statusCode == 201) {
      if (context.mounted) {
        ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
          content: Text("Email Successfully Verified! You May Now Login"),
          duration: Duration(milliseconds: 1500),
        ));
      }
    }

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
                      "Email Verification",
                      style: TextStyle(
                        color: Color.fromARGB(255, 0, 0, 0),
                        fontSize: 40,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const Text(
                      "Enter the Passcode We Sent to Your Email",
                      style: TextStyle(
                        color: Color.fromARGB(255, 0, 0, 0),
                        fontSize: 20,
                      ),
                    ),
                    Text(errorMessage,
                        style: const TextStyle(
                            color: Color.fromARGB(255, 243, 4, 4))),
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
                        int statusCode =
                            await sendEmailVerification(_passCodeController);

                        if (statusCode == 201) {
                          if (context.mounted) {
                            Navigator.pushAndRemoveUntil(context,
                                MaterialPageRoute(
                                    builder: (BuildContext context) {
                              return const LoginPage();
                            }), (r) {
                              return false;
                            });
                          }
                        }

                        if (statusCode == 400) {
                          setState(() {
                            errorMessage = 'Incorrect Passcode';
                          });
                        }

                        if (statusCode == 500) {
                          setState(() {
                            errorMessage = 'Server Error: Try Again Later';
                          });
                        }
                      },
                      child: const Text('Verify Email',
                          style: TextStyle(fontSize: 20)),
                    ),
                    const SizedBox(height: 20),
                  ]),
            ),
          ),
        ));
  }
}
