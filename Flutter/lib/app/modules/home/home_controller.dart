import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:valecash/app/data/model/request_token.dart';
import 'package:valecash/routes/app_pages.dart';
import 'package:valecash/routes/app_routes.dart';

import '../../data/repositories/authentication_repository.dart';

class HomeController extends GetxController {
  final _repository = Get.find<AuthenticationRepository>();

  String _username = '', _password = '';

  @override
  void onReady() {
    print("🥰");
  }

  void onUsernameChanged(String text) {
    _username = text;
  }

  void onPasswordChanged(String text) {
    _password = text;
  }

  Future<void> submit() async {
    try {
      final requestToken = Get.arguments as String;

      final RequestToken authRequestToken = await _repository.authWithLogin(
          username: _username, password: _password, requestToken: requestToken);
      print("login Ok $requestToken");
      Get.offNamed(AppRoutes.DETAIL);
    } catch (e) {
      print(e);
      String title = "Error";
      String message = "";
      if (e is DioError) {
        if (e.response != null) {
          message = e.response?.statusMessage as String;
        } else {
          message = e.message;
        }
      }
      Get.dialog(AlertDialog(
        title: Text("ERROR"),
        content: Text(message),
        actions: [
          FlatButton(
              onPressed: () {
                Get.back();
              },
              child: Text("OK"))
        ],
      ));
    }
  }
}
