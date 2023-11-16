import 'package:flutter/material.dart';

class SearchName extends StatefulWidget {
  final ValueChanged<String> onSearch;

  const SearchName({Key? key, required this.onSearch}) : super(key: key);

  @override
  _SearchNameState createState() => _SearchNameState();
}

class _SearchNameState extends State<SearchName> {
  TextEditingController _searchController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: Padding(
        padding: const EdgeInsets.only(left: 16.0, right: 16.0, bottom: 16.0),
        child: Container(
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(20.0),
            color: Colors.grey[200], // Adjust the color as needed
          ),
          child: TextField(
            controller: _searchController,
            onChanged: (query) {
              widget.onSearch(query);
            },
            decoration: InputDecoration(
              hintText: 'Search...',
              border: InputBorder.none,
              contentPadding: const EdgeInsets.symmetric(horizontal: 16.0),
            ),
          ),
        ),
      ),
    );
  }

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }
}
