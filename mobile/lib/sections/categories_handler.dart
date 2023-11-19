import 'package:mobile/sections/home_section.dart';
import 'package:flutter/material.dart'; // Add this import

class CategoryHandler {
  static IconData getIconForCategory(String category) {
    // Placeholder logic to return icons based on the category
    switch (category.toLowerCase()) {
      case 'sports':
        return Icons.sports_soccer;
      case 'music':
        return Icons.music_note;
      // Add other cases for each category
      default:
        return Icons.category; // Default icon if no match
    }
  }

  static List<Event> filterEventsByCategory(
      List<Event> eventDataList, String category) {
    return eventDataList
        .where((event) => event.eventCategory.toLowerCase() == category.toLowerCase())
        .toList();
  }
}
