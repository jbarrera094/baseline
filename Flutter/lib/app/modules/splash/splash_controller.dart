import 'package:get/get.dart';
import 'package:valecash/app/data/model/request_token.dart';
import 'package:valecash/app/data/repositories/authentication_repository.dart';
import 'package:valecash/routes/app_routes.dart';

class SplashController extends GetxController {
  final AuthenticationRepository _repository =
      Get.find<AuthenticationRepository>();

  @override
  void onReady() {
    super.onReady();
    Future.delayed(Duration(seconds: 2), () {
      _init();
    });
  }

  _init() async {
    try {
      RequestToken requestToken = await _repository.newRequestToken();

      Get.offNamed(AppRoutes.HOME, arguments: requestToken.requestToken);
    } catch (e) {
      print(e);
    }
  }
}
