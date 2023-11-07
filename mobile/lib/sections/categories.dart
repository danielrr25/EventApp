import 'package:flutter/material.dart';

class CategoryCircle extends StatelessWidget {
  final IconData icon;
  final bool isSelected;
  final VoidCallback onPressed;
  final String label;

  CategoryCircle({
    required this.icon,
    required this.isSelected,
    required this.onPressed,
    required this.label,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onPressed,
      child: Column(
        children: [
          Icon(
            icon,
            size: 48.0,
            color: isSelected ? Colors.blue : Colors.grey,
          ),
          Text(
            label,
            style: TextStyle(fontSize: 16.0),
          ),
        ],
      ),
    );
  }
}
