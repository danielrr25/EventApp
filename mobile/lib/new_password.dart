import 'package:flutter/material.dart';
import 'package:mobile/loginpage.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class NewPassword extends StatefulWidget {
  const NewPassword({super.key});

  @override
  State<NewPassword> createState() => _NewPasswordState();
}

class _NewPasswordState extends State<NewPassword> {
  final _formfield = GlobalKey<FormState>();
  final TextEditingController _usernameController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  final TextEditingController _confirmPasswordController =
      TextEditingController();
  final url = "http://167.172.230.181:5000/users/changepassword";
  String errorMessage = "";
  bool passToggleNewPass = true;
  bool passToggleConfirmPass = true;

  Future<int> verifyChangePassword() async {
    var response = await http.post(Uri.parse(url),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode(<String, String>{
          "username": _usernameController.text,
          "newpassword": _passwordController.text,
          "confirmpassword": _confirmPasswordController.text,
        }));

    if (response.statusCode == 201) {
      if (context.mounted) {
        ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
          content: Text("Password Changed Successfully"),
          duration: Duration(milliseconds: 1500),
        ));
      }
    }

    return response.statusCode;
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
                      "New Password",
                      style: TextStyle(
                        color: Color.fromARGB(255, 0, 0, 0),
                        fontSize: 40,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const Text(
                      "Enter Your New Password",
                      style: TextStyle(
                        color: Color.fromARGB(255, 0, 0, 0),
                        fontSize: 20,
                      ),
                    ),
                    const SizedBox(height: 10),
                    Text(errorMessage,
                        style: const TextStyle(
                            color: Color.fromARGB(255, 243, 4, 4))),
                    const SizedBox(height: 10),
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 25.0),
                      child: TextFormField(
                          keyboardType: TextInputType.emailAddress,
                          controller: _usernameController,
                          decoration: InputDecoration(
                            labelText: "Enter Account Username",
                            prefixIcon: const Align(
                              widthFactor: 1.0,
                              heightFactor: 1.0,
                              child: Icon(Icons.lock_outline_rounded),
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
                              return "Enter Account Username";
                            }

                            return null;
                          }),
                    ),
                    const SizedBox(height: 15),
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 25.0),
                      child: TextFormField(
                          keyboardType: TextInputType.emailAddress,
                          controller: _passwordController,
                          obscureText: passToggleNewPass,
                          decoration: InputDecoration(
                            labelText: "New Password",
                            prefixIcon: const Align(
                              widthFactor: 1.0,
                              heightFactor: 1.0,
                              child: Icon(Icons.lock_outline_rounded),
                            ),
                            border: const OutlineInputBorder(),
                            focusedBorder: const OutlineInputBorder(
                              borderSide: BorderSide(color: Colors.blue),
                            ),
                            fillColor: const Color.fromARGB(255, 252, 250, 250),
                            filled: true,
                            hintStyle: TextStyle(color: Colors.grey[500]),
                            errorMaxLines: 2,
                            suffixIcon: InkWell(
                              onTap: () {
                                setState(() {
                                  passToggleNewPass = !passToggleNewPass;
                                });
                              },
                              child: Icon(passToggleNewPass
                                  ? Icons.visibility
                                  : Icons.visibility_off),
                            ),
                          ),
                          validator: (value) {
                            if (value!.isEmpty) {
                              return "Enter New Password";
                            }
                            if (passwordValidator(value) == false) {
                              return "Password Must Have a Capital and Lowercase letter, a Number, and a Special Symbol (Like !, #, @, etc.)";
                            }

                            return null;
                          }),
                    ),
                    const SizedBox(height: 15),
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 25.0),
                      child: TextFormField(
                          keyboardType: TextInputType.emailAddress,
                          controller: _confirmPasswordController,
                          obscureText: passToggleConfirmPass,
                          decoration: InputDecoration(
                            labelText: "Confirm New Password",
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
                                  passToggleConfirmPass =
                                      !passToggleConfirmPass;
                                });
                              },
                              child: Icon(passToggleConfirmPass
                                  ? Icons.visibility
                                  : Icons.visibility_off),
                            ),
                          ),
                          validator: (value) {
                            if (value!.isEmpty) {
                              return "Confirm New Password";
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
                          int statusCode = await verifyChangePassword();

                          print("STATUS CODE IN CHANGE PASS: ${statusCode}");

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
                              errorMessage = 'Passwords Do Not Match';
                            });
                          }

                          if (statusCode == 404) {
                            setState(() {
                              errorMessage = "User Does Not Exist";
                            });
                          }

                          if (statusCode == 500) {
                            setState(() {
                              errorMessage =
                                  'Change Password Failed. Internal Server Error. Try Again Later';
                            });
                          }
                        }
                      },
                      child: const Text('Change Password',
                          style: TextStyle(fontSize: 20)),
                    ),
                    const SizedBox(height: 20),
                  ]),
            ),
          ),
        ));
  }
}
