import 'package:caparledev/src/bloc/auth/auth_bloc.dart';
import 'package:caparledev/src/bloc/auth/auth_state.dart';
import 'package:caparledev/src/splash.dart';
import 'package:caparledev/src/utils/colors.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData(
        primaryColor: primaryColor,
        primarySwatch: Colors.blue,
        visualDensity: VisualDensity.adaptivePlatformDensity,
        cursorColor: primaryColor,
        tabBarTheme: TabBarTheme(
          labelColor: Colors.grey[300],
          unselectedLabelColor: white,
        ),
      ),
      debugShowCheckedModeBanner: false,
      home: BlocBuilder<AuthBloc, AuthState>(
        builder: (context, state) {
          if (state is AuthInitial) {
            return SplashScreen();
          }
          if (state is AuthFirstOpen) {
            // return LadingPage();
          }
          if (state is AuthFailure) {}
          if (state is AuthSuccess) {
            /* return BlocProvider(
              create: (context) => getIt<TabBloc>(),
              child: HomePage(),
            );*/

          }
          return SplashScreen();
        },
      ),
    );
  }
}
