import 'package:caparledev/src/utils/strings.dart';
import 'package:chopper/chopper.dart';

part 'apiService.chopper.dart';

@ChopperApi(baseUrl: baseUrl)
abstract class ApiService extends ChopperService {
  static ApiService create([ChopperClient client]) => _$ApiService(client);

  @Post(path: '/api/login', headers: {'Accept': 'application/json'})
  Future<Response> login(@Body() Map<String, dynamic> body);

  @Post(path: '/api/register', headers: {'Accept': 'application/json'})
  Future<Response> register(@Body() Map<String, dynamic> body);

  @Get(path: '/api/user', headers: {'Accept': 'application/json'})
  Future<Response> user(@Header('Authorization') String token);

  @Post(path: '/api/updateuser', headers: {'Accept': 'application/json'})
  Future<Response> updateuser(
      @Header('Authorization') String token, @Body() Map<String, dynamic> body);
}
