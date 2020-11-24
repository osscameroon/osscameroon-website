import 'dart:ui';

import 'package:flutter/cupertino.dart';
import 'package:flutter_statusbarcolor/flutter_statusbarcolor.dart';

changeStatusColor(Color color) async {
  try {
    await FlutterStatusbarcolor.setStatusBarColor(color, animate: true);
    FlutterStatusbarcolor.setStatusBarWhiteForeground(
        useWhiteForeground(color));
  } on Exception catch (e) {
    print(e);
  }
}

launchScreen(context, String tag, {Object arguments}) {
  if (arguments == null) {
    Navigator.pushNamed(context, tag);
  } else {
    Navigator.pushNamed(context, tag, arguments: arguments);
  }
}
