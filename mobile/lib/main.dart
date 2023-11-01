import 'package:flutter/material.dart';
import 'package:mobile/loginpage.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: LoginPage(),

      // routes for navigating between different pages of app
      // routes: {
      //   '/registerpage': (context) => const RegisterPage(),
      //   '/loginpage': (context) => LoginPage(),
      //   '/forgotpage': (context) => ForgotPage(),
      // }
    );
  }
}
