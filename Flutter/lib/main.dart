import 'package:flutter/material.dart';
import 'package:get/route_manager.dart';
import 'package:valecash/app/modules/splash/splash_binding.dart';
import 'package:valecash/app/modules/splash/splash_page.dart';
import 'package:valecash/routes/app_pages.dart';
import 'package:valecash/utils/dependency_injection.dart';

void main() {
  DependencyInJaction.init();
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return GetMaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: SplashPage(),
      initialBinding: SplashBinding(),
      getPages: AppPages.pages,
    );
  }
}
