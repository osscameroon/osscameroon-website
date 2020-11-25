import 'package:caparledev/src/models/lading.dart';
import 'package:caparledev/src/utils/LadingImages.dart';

List<LadingWalk> ladingWalkImg() {
  List<LadingWalk> list = List<LadingWalk>();

  var img1 = LadingWalk();
  img1.img = lading_walk_1;
  list.add(img1);

  var img2 = LadingWalk();
  img2.img = lading_walk_2;
  list.add(img2);

  var img3 = LadingWalk();
  img3.img = lading_walk_3;
  list.add(img3);

  return list;
}
