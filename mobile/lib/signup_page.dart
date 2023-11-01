import 'package:flutter/material.dart';
import 'package:http/http.dart';

class SignUpPage extends StatefulWidget {
  const SignUpPage({super.key});

  @override
  State<SignUpPage> createState() => _SignUpPageState();
}

class _SignUpPageState extends State<SignUpPage> {
  final TextEditingController _userController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  final TextEditingController _firstNameController = TextEditingController();
  final TextEditingController _lastNameController = TextEditingController();
  final TextEditingController _emailController = TextEditingController();
  final url = "http://167.172.230.181:5000/users/register";
  // Place holders for sending data for now
  void createUser() async {
    try {
      print("FOOO");
      final response = await post(Uri.parse(url),
          body: {"username": "aheadkitchennn", "password": "foo1"});
      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
        content: Text("You are all set!"),
        duration: Duration(milliseconds: 1500),
      ));
      print('Response status: ${response.statusCode}');
      print('Response body: ${response.body}');
      // print(response.body);
    } catch (err) {
      print("An error has occurred");
    }
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
                height: 150,
                width: 150,
              ),
              const SizedBox(height: 30),
              const Text(
                "Sign Up",
                style: TextStyle(
                  color: Color.fromARGB(255, 0, 0, 0),
                  fontSize: 50,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 25),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 25.0),
                child: TextField(
                  decoration: InputDecoration(
                      prefixIcon: const Align(
                        widthFactor: 1.0,
                        heightFactor: 1.0,
                        child: Icon(Icons.account_circle_outlined),
                      ),
                      hintText: 'Username',
                      enabledBorder: const OutlineInputBorder(
                        borderSide: BorderSide(color: Colors.white),
                      ),
                      focusedBorder: const OutlineInputBorder(
                        borderSide: BorderSide(color: Colors.blue),
                      ),
                      fillColor: const Color.fromARGB(255, 252, 250, 250),
                      filled: true,
                      hintStyle: TextStyle(color: Colors.grey[500])),
                ),
              ),
              const SizedBox(height: 10),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 25.0),
                child: TextField(
                  obscureText: true,
                  decoration: InputDecoration(
                      prefixIcon: const Align(
                        widthFactor: 1.0,
                        heightFactor: 1.0,
                        child: Icon(Icons.lock_sharp),
                      ),
                      hintText: 'Password',
                      enabledBorder: const OutlineInputBorder(
                        borderSide: BorderSide(color: Colors.white),
                      ),
                      focusedBorder: const OutlineInputBorder(
                        borderSide: BorderSide(color: Colors.blue),
                      ),
                      fillColor: const Color.fromARGB(255, 252, 250, 250),
                      filled: true,
                      hintStyle: TextStyle(color: Colors.grey[500])),
                ),
              ),
              const SizedBox(height: 10),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 25.0),
                child: TextField(
                  decoration: InputDecoration(
                      prefixIcon: const Align(
                        widthFactor: 1.0,
                        heightFactor: 1.0,
                        child: Icon(Icons.sentiment_satisfied_alt_rounded),
                      ),
                      hintText: 'First Name',
                      enabledBorder: const OutlineInputBorder(
                        borderSide: BorderSide(color: Colors.white),
                      ),
                      focusedBorder: const OutlineInputBorder(
                        borderSide: BorderSide(color: Colors.blue),
                      ),
                      fillColor: const Color.fromARGB(255, 252, 250, 250),
                      filled: true,
                      hintStyle: TextStyle(color: Colors.grey[500])),
                ),
              ),
              const SizedBox(height: 10),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 25.0),
                child: TextField(
                  decoration: InputDecoration(
                      prefixIcon: const Align(
                        widthFactor: 1.0,
                        heightFactor: 1.0,
                        child: Icon(Icons.sentiment_satisfied_alt_rounded),
                      ),
                      hintText: 'Last name',
                      enabledBorder: const OutlineInputBorder(
                        borderSide: BorderSide(color: Colors.white),
                      ),
                      focusedBorder: const OutlineInputBorder(
                        borderSide: BorderSide(color: Colors.blue),
                      ),
                      fillColor: const Color.fromARGB(255, 252, 250, 250),
                      filled: true,
                      hintStyle: TextStyle(color: Colors.grey[500])),
                ),
              ),
              const SizedBox(height: 10),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 25.0),
                child: TextField(
                  decoration: InputDecoration(
                      prefixIcon: const Align(
                        widthFactor: 1.0,
                        heightFactor: 1.0,
                        child: Icon(Icons.email_rounded),
                      ),
                      hintText: 'Email',
                      enabledBorder: const OutlineInputBorder(
                        borderSide: BorderSide(color: Colors.white),
                      ),
                      focusedBorder: const OutlineInputBorder(
                        borderSide: BorderSide(color: Colors.blue),
                      ),
                      fillColor: const Color.fromARGB(255, 252, 250, 250),
                      filled: true,
                      hintStyle: TextStyle(color: Colors.grey[500])),
                ),
              ),
              const SizedBox(height: 10),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 23.0),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const SizedBox(width: 60),
                    ElevatedButton(
                        style: ElevatedButton.styleFrom(
                            backgroundColor: Colors.black),
                        onPressed: createUser,
                        // onPressed: () {

                        //   ScaffoldMessenger.of(context)
                        //       .showSnackBar(const SnackBar(
                        //     content: Text("You are all set!"),
                        //     duration: Duration(milliseconds: 1500),
                        //   ));
                        // },
                        child: const Text("Register")),
                    TextButton(
                        style: TextButton.styleFrom(),
                        onPressed: () => {Navigator.pop(context)},
                        child: const Text('Get me back'))
                  ],
                ),
              ),
            ]),
          ),
        ));
  }
}
