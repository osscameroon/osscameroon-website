import 'package:caparledev/sharedPreference.dart';
import 'package:caparledev/src/bloc/auth/auth_event.dart';
import 'package:caparledev/src/bloc/auth/auth_state.dart';
import 'package:caparledev/src/repositories/user/userRepository.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class AuthBloc extends Bloc<AuthEvent, AuthState> {
  final UserRepository userRepository;
  final SharedPreferencesHelper sharedPreferencesHelper;

  AuthBloc({this.userRepository, this.sharedPreferencesHelper})
      : super(AuthInitial());

  @override
  Stream<AuthState> mapEventToState(
    AuthEvent event,
  ) async* {
    if (event is AuthStarted) {
      yield* _mapAuthStartedToState();
    } else if (event is AuthLoggedIn) {
      yield* _mapAuthLoggedInToState();
    } else if (event is AuthFirst) {
      yield* _mapAuthFirstOpenState();
    } else if (event is AuthLoggedOut) {
      yield* _mapAuthLoggedOutToState();
    }
  }

  Stream<AuthState> _mapAuthStartedToState() async* {
    /*  final isSignedIn = await userRepository.hasToken();
    final firstOpen = await sharedPreferencesHelper.getIsFirstOpen();
    if (firstOpen == "oui") {
      yield AuthFirstOpen();
    } else {
      if (isSignedIn) {
        final token = await sharedPreferencesHelper.getToken();
        final userResult = await userRepository.getUser(token);
        yield AuthSuccess(userResult.success.name, userResult.success.adresse);
      } else {
        yield AuthFailure();
      }
    }*/

    final firstOpen = await sharedPreferencesHelper.getIsFirstOpen();
    if (firstOpen == "oui") {
      yield AuthFirstOpen();
    } else {
      yield AuthSuccess("", "");
    }
  }

  Stream<AuthState> _mapAuthLoggedInToState() async* {
    final firstOpen = await sharedPreferencesHelper.getIsFirstOpen();
    if (firstOpen == "oui") {
      yield AuthFirstOpen();
    } else {
      /*  final token = await sharedPreferencesHelper.getToken();
      final userResult = await userRepository.getUser(token);*/
      yield AuthSuccess("", "");
    }
  }

  Stream<AuthState> _mapAuthFirstOpenState() async* {
    await sharedPreferencesHelper.setIsFirstOpen("non");
    yield AuthFailure();
  }

  Stream<AuthState> _mapAuthLoggedOutToState() async* {
    yield AuthFailure();
    final token = await sharedPreferencesHelper.getToken();
    userRepository.logout(token);
  }
}
