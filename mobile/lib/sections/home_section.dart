import 'package:flutter/material.dart';
import 'package:mobile/sections/categories.dart';

class HomeSection extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        // Add your CategoryCircle widgets here for different event types.
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            CategoryCircle(
              icon: Icons.music_note,
              isSelected: true,
              onPressed: () {
                // Add logic for music category.
              },
              label: 'Music',
            ),
            CategoryCircle(
              icon: Icons.sports,
              isSelected: true,
              onPressed: () {
                // Add logic for sports category.
              },
              label: 'Sports',
            ),
            CategoryCircle(
              icon: Icons.local_bar,
              isSelected: true,
              onPressed: () {
                // Add logic for clubbing category.
              },
              label: 'Clubbing',
            ),
          ],
        ),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            CategoryCircle(
              icon: Icons.party_mode,
              isSelected: true,
              onPressed: () {
                // Add logic for party category.
              },
              label: 'Party',
            ),
            CategoryCircle(
              icon: Icons.group,
              isSelected: true,
              onPressed: () {
                // Add logic for Greek life category.
              },
              label: 'Greek Life',
            ),
            CategoryCircle(
              icon: Icons.people,
              isSelected: true,
              onPressed: () {
                // Add logic for clubs category.
              },
              label: 'Clubs',
            ),
          ],
        ),
      ],
    );
  }
}
