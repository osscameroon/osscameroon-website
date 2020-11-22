import 'dart:io';

import 'package:caparledev/sharedPreference.dart';
import 'package:caparledev/src/api/user/userApiService.dart';
import 'package:caparledev/src/models/status.dart';
import 'package:caparledev/src/models/user.dart';
import 'package:caparledev/src/repositories/user/userRepository.dart';
import 'package:caparledev/src/utils/networkInfo.dart';
import 'package:caparledev/src/utils/result.dart';

class UserRepositoryImpl implements UserRepository {
  final NetworkInfo networkInfo;
  final UserApiService userApiService;
  final SharedPreferencesHelper sharedPreferencesHelper;

  UserRepositoryImpl(
      {this.networkInfo, this.userApiService, this.sharedPreferencesHelper});

  @override
  Future<Result<User>> login(String email, String password) async {
    /*  bool isConnected = await networkInfo.isConnected();
    if (isConnected) {
      try {
        final Response response = await userApiService.login(email, password);

        var model = User.fromJson(response.body);

        return Result(success: model);
      } catch (e) {
        return Result(error: ServerError());
      }
    } else {
      return Result(error: NoInternetError());
    }*/
  }

  @override
  Future<Result<User>> register(
      String email, String password, String name, String telephone) async {
    /*  bool isConnected = await networkInfo.isConnected();
    if (isConnected) {
      try {
        final Response response =
            await userApiService.register(email, password, name, telephone);

        var model = User.fromJson(response.body);

        return Result(success: model);
      } catch (e) {
        return Result(error: ServerError());
      }
    } else {
      return Result(error: NoInternetError());
    }*/
  }

  @override
  Future<bool> deleteToken() async {
    bool delete = await sharedPreferencesHelper.deleteToken();
    return delete;
  }

  @override
  Future<bool> hasToken() async {
    bool hasToken;
    String token = await sharedPreferencesHelper.getToken();
    if (token != null) {
      hasToken = true;
    } else {
      hasToken = false;
    }

    return hasToken;
  }

  @override
  Future<bool> saveToken(String token) async {
    bool saveT = await sharedPreferencesHelper.setToken(token);
    return saveT;
  }

  @override
  Future<Result<Data>> getUser(String token) async {
    /*  bool isConnected = await networkInfo.isConnected();
    if (isConnected) {
      try {
        final Response response = await userApiService.getUser(token);

        var model = Data.fromJson(response.body);

        return Result(success: model);
      } catch (e) {
        return Result(error: ServerError());
      }
    } else {
      return Result(error: NoInternetError());
    }*/
  }

  @override
  Future<Result<Status>> logout(String token) async {
    /*  bool isConnected = await networkInfo.isConnected();
    if (isConnected) {
      try {
        final Response response = await userApiService.signOut(token);

        var model = Status.fromJson(response.body);

        return Result(success: model);
      } catch (e) {
        return Result(error: ServerError());
      }
    } else {
      return Result(error: NoInternetError());
    }*/
  }

  @override
  Future<Result<Status>> updateUser(String token, String name, String telephone,
      String adresse, File avatar) async {
    /*  bool isConnected = await networkInfo.isConnected();
    if (isConnected) {
      try {
        final Response response = await userApiService.updateUser(
            token, name, telephone, adresse, avatar);

        var model = Status.fromJson(response.body);

        return Result(success: model);
      } catch (e) {
        return Result(error: ServerError());
      }
    } else {
      return Result(error: NoInternetError());
    }
  }*/
  }
}
