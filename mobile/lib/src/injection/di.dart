import 'package:caparledev/sharedPreference.dart';
import 'package:caparledev/src/api/apiService.dart';
import 'package:caparledev/src/api/user/userApiService.dart';
import 'package:caparledev/src/api/user/userApiServiceFactory.dart';
import 'package:caparledev/src/bloc/auth/auth_bloc.dart';
import 'package:caparledev/src/repositories/user/userRepository.dart';
import 'package:caparledev/src/repositories/user/userRepositoryImpl.dart';
import 'package:caparledev/src/utils/networkInfo.dart';
import 'package:caparledev/src/utils/strings.dart';
import 'package:chopper/chopper.dart';
import 'package:get_it/get_it.dart';

final GetIt getIt = GetIt.instance;

Future<void> init() async {
  final chopper = ChopperClient(
    baseUrl: baseUrl,
    services: [
      // the generated service
      ApiService.create()
    ],
    converter: JsonConverter(),
  );

  final apiService = ApiService.create(chopper);

  //ApiService
  getIt.registerLazySingleton<UserApiService>(
      () => UserApiServiceFactory(apiService: apiService));

  //Utils
  getIt.registerLazySingleton<NetworkInfo>(() => NetworkInfo());
  getIt.registerLazySingleton<SharedPreferencesHelper>(
      () => SharedPreferencesHelper());

  //Repository
  getIt.registerFactory<UserRepository>(
    () => UserRepositoryImpl(
      userApiService: getIt(),
      networkInfo: getIt(),
      sharedPreferencesHelper: getIt(),
    ),
  );

  //Bloc
  getIt.registerFactory<AuthBloc>(() =>
      AuthBloc(userRepository: getIt(), sharedPreferencesHelper: getIt()));
}
