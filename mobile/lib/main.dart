import 'package:caparledev/simpleAppObserver.dart';
import 'package:caparledev/src/app.dart';
import 'package:caparledev/src/bloc/auth/auth_bloc.dart';
import 'package:caparledev/src/bloc/auth/auth_event.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:hydrated_bloc/hydrated_bloc.dart';
import 'package:caparledev/src/injection/di.dart' as di;

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  HydratedBloc.storage = await HydratedStorage.build();
  Bloc.observer = SimpleBlocObserver();
  await di.init();

  runApp(BlocProvider(
      create: (_) => di.getIt<AuthBloc>()..add(AuthStarted()), child: MyApp()));
}
