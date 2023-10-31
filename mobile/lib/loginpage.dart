import 'package:flutter/material.dart';
import 'package:mobile/components/textField.dart';

class LoginPage extends StatelessWidget {
  LoginPage({super.key});

  final usernameController = TextEditingController();
  final passwordController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: const Color.fromARGB(255, 224, 224, 224),
        body: SafeArea(
          child: SingleChildScrollView(
            physics: BouncingScrollPhysics(),
            child: Column(children: [
              Image.asset(
                'assets/icon/no_background_logo.jpg',
                height: 150,
                width: 150,
              ),
              const SizedBox(height: 30),
              Text(
                "Welcome",
                style: TextStyle(
                  color: const Color.fromARGB(255, 0, 0, 0),
                  fontSize: 50,
                  fontWeight: FontWeight.bold,
                ),
              ),
              Text(
                "Log into your account",
                style: TextStyle(
                  color: const Color.fromARGB(255, 0, 0, 0),
                  fontSize: 20,
                ),
              ),
              const SizedBox(height: 25),
              MyTextField(
                controller: usernameController,
                hintText: 'Enter Username',
                obscureText: false,
                textIcon: Icon(Icons.account_circle),
              ),
              const SizedBox(height: 10),
              MyTextField(
                controller: passwordController,
                hintText: 'Enter Password',
                obscureText: true,
                textIcon: Icon(Icons.lock_sharp),
              ),
              const SizedBox(height: 15),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 23.0),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.end,
                  children: [
                    Text(
                      "Forgot Password?",
                      style: TextStyle(
                        color: const Color.fromARGB(255, 120, 120, 120),
                        fontSize: 16,
                      ),
                    ),
                  ],
                ),
              ),
            ]),
          ),
        ));
  }
}
