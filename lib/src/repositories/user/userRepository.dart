import 'dart:io';

import 'package:caparledev/src/models/status.dart';
import 'package:caparledev/src/models/user.dart';
import 'package:caparledev/src/utils/result.dart';

abstract class UserRepository {
  Future<Result<User>> login(String email, String password);

  Future<Result<User>> register(
      String email, String password, String name, String telephone);

  Future<Result<Status>> updateUser(
      String token, String name, String telephone, String adresse, File avatar);

  Future<bool> deleteToken();

  Future<bool> saveToken(String token);

  Future<bool> hasToken();

  Future<Result<Data>> getUser(String token);

  Future<Result<Status>> logout(String token);
}
