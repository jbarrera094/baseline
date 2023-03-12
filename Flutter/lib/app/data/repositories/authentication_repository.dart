import 'package:get/get.dart';
import 'package:valecash/app/data/model/request_token.dart';
import 'package:valecash/app/data/provider/authentication_api.dart';

class AuthenticationRepository {
  final AuthenticationApi _api = Get.find<AuthenticationApi>();

  Future<RequestToken> newRequestToken() => _api.newRequestToken();
  Future<RequestToken> authWithLogin(
          {required String username,
          required String password,
          required String requestToken}) =>
      _api.validateWithLogin(
          username: username, password: password, requestToken: requestToken);
}
