import 'package:get/route_manager.dart';
import 'package:valecash/app/modules/details/details_binding.dart';
import 'package:valecash/app/modules/details/details_page.dart';
import 'package:valecash/app/modules/home/home_binding.dart';
import 'package:valecash/app/modules/home/home_page.dart';
import 'package:valecash/app/modules/splash/splash_binding.dart';
import 'package:valecash/app/modules/splash/splash_page.dart';
import 'package:valecash/routes/app_routes.dart';

class AppPages {
  static final List<GetPage> pages = [
    GetPage(
        name: AppRoutes.SPLASH,
        page: () => const SplashPage(),
        binding: SplashBinding()),
    GetPage(
        name: AppRoutes.HOME,
        page: () => const HomePage(),
        binding: HomeBinding()),
    GetPage(
        name: AppRoutes.DETAIL,
        page: () => const DetailsPage(),
        binding: DetailsBinding()),
  ];
}
