import 'package:flutter/material.dart';
import 'package:mobile/sections/home_section.dart';

class CategoryHandler {
  static IconData getIconForCategory(String category) {
    // You can implement logic to return the appropriate icon based on the category
    // For now, let's return a default icon (you may want to update this)
    return Icons.category;
  }

  static List<EventData> filterEventsByCategory(
      List<EventData> eventDataList, String category) {
    return eventDataList.where((event) => event.eventCategory == category).toList();
  }
}
