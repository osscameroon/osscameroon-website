import 'dart:io';

import 'package:chopper/chopper.dart';

abstract class UserApiService {
  Future<Response> login(String email, String password);

  Future<Response> register(
      String email, String password, String name, String telephone);

  Future<Response> updateUser(
      String token, String name, String telephone, String adresse, File avatar);

  Future<Response> getUser(String token);

  Future<Response> signOut(String token);
}
