import 'package:get/get.dart';
import 'package:valecash/app/modules/details/details_controller.dart';

class DetailsBinding extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut(() => DetailsController());
  }
}
