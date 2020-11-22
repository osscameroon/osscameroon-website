import 'package:equatable/equatable.dart';

abstract class AuthState extends Equatable {
  const AuthState();

  @override
  List<Object> get props => [];
}

class AuthInitial extends AuthState {}

class AuthSuccess extends AuthState {
  final String displayName;
  final String email;

  const AuthSuccess(this.displayName, this.email);

  @override
  List<Object> get props => [displayName, email];

  @override
  String toString() =>
      'AuthSuccess { displayName: $displayName , email: $email }';
}

class AuthFirstOpen extends AuthState {}

class AuthFailure extends AuthState {}
