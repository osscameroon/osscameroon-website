import 'dart:io';

import 'package:caparledev/src/api/apiService.dart';
import 'package:caparledev/src/api/user/userApiService.dart';
import 'package:chopper/chopper.dart';

class UserApiServiceFactory implements UserApiService {
  final ApiService apiService;

  UserApiServiceFactory({this.apiService});

  @override
  Future<Response> login(String email, String password) async {
    Response response;

    try {
      response = await apiService.login({"email": email, "password": password});
    } catch (e) {
      print('Caught ${e.body}');
      rethrow;
    }
    return response;
  }

  @override
  Future<Response> register(
      String email, String password, String name, String telephone) async {
    Response response;

    try {
      response = await apiService.register({
        "email": email,
        "password": password,
        "name": name,
        "telephone": telephone,
        "c_password": password
      });
    } catch (e) {
      print('Caught ${e.body}');
      rethrow;
    }
    return response;
  }

  @override
  Future<Response> getUser(String token) async {
    Response response;
    try {
      response = await apiService.user('Bearer ' + token);
    } catch (e) {
      print('Caught ${e.body}');
      rethrow;
    }
    return response;
  }

  @override
  Future<Response> signOut(String token) async {
    Response response;
    try {
      response = await apiService.user('Bearer ' + token);
    } catch (e) {
      print('Caught ${e.body}');
      rethrow;
    }
    return response;
  }

  @override
  Future<Response> updateUser(String token, String name, String telephone,
      String adresse, File avatar) async {
    Response response;
    try {
      response = await apiService.updateuser('Bearer ' + token, {
        "name": name,
        "telephone": telephone,
        "adresse": adresse,
        "avatar": avatar
      });
    } catch (e) {
      print('Caught ${e.body}');
      rethrow;
    }
    return response;
  }
}
