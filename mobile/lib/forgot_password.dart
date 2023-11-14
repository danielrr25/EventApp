import 'package:flutter/material.dart';
// import 'package:http/http.dart' as http;
// import 'dart:convert';
// import 'package:mobile/components/text_field.dart';

class ResetPassword extends StatefulWidget {
  const ResetPassword({super.key});

  @override
  State<ResetPassword> createState() => _ResetPasswordState();
}

class _ResetPasswordState extends State<ResetPassword> {
  final _formfield = GlobalKey<FormState>();
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passCodeController = TextEditingController();
  bool passToggle = true;

  String errorMessage = "";
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
                const SizedBox(height: 10),
                Text(errorMessage,
                    style:
                        const TextStyle(color: Color.fromARGB(255, 243, 4, 4))),
                const SizedBox(height: 15),
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
                        fillColor: const Color.fromARGB(255, 252, 250, 250),
                        filled: true,
                        hintStyle: TextStyle(color: Colors.grey[500])),
                  ),
                ),
                const SizedBox(height: 15),
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 25.0),
                  child: TextFormField(
                    keyboardType: TextInputType.number,
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
                          borderRadius: BorderRadius.all(Radius.circular(8)))),
                  onPressed: () {},
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
