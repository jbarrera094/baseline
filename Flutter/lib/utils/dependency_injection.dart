import 'package:dio/dio.dart';
import 'package:get/get.dart';
import 'package:valecash/app/data/provider/authentication_api.dart';
import 'package:valecash/app/data/repositories/authentication_repository.dart';

class DependencyInJaction {
  static void init() {
    Get.lazyPut<Dio>(
        () => Dio(BaseOptions(baseUrl: 'https://api.themoviedb.org/3')));
    Get.lazyPut<AuthenticationApi>(() => AuthenticationApi());
    Get.lazyPut<AuthenticationRepository>(() => AuthenticationRepository());
  }
}
