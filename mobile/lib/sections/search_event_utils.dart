import 'package:flutter/material.dart';
import 'package:mobile/sections/search_event.dart';

class SearchEvent extends SearchDelegate {
  late Future<List<Event>> _eventList;

  @override
  List<Widget>? buildActions(BuildContext context) {
    return [
      IconButton(
          onPressed: () {
            query = '';
          },
          icon: const Icon(Icons.close))
    ];
  }

  @override
  Widget? buildLeading(BuildContext context) {
    return IconButton(
        onPressed: () {
          Navigator.pop(context);
        },
        icon: const Icon(Icons.arrow_back_ios));
  }

  @override
  Widget buildResults(BuildContext context) {
    _eventList = fetchEventList(query: query);
    return FutureBuilder<List<Event>>(
        future: _eventList,
        builder: (context, snapshot) {
          if (snapshot.hasData) {
            List<Event> filteredEvents = filterEvents(snapshot.data!, query);
            return ListView.builder(
              itemCount: filteredEvents.length,
              itemBuilder: (context, index) {
                DateTime date = DateTime.parse(filteredEvents[index].eventDate);
                return Card(
                  child: Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: ListTile(
                      // date = snapshot.data![index].eventDate as DateTime;
                      title: Text(
                        filteredEvents[index].eventName,
                        style: const TextStyle(
                            fontSize: 25, fontWeight: FontWeight.bold),
                      ),
                      subtitle: Text(
                        '${filteredEvents[index].eventLocation}\nDate: ${date.day}/${date.month}/${date.year}',
                        style: const TextStyle(
                          fontSize: 18,
                        ),
                      ),
                      // trailing: Text('When?$date'),
                    ),
                  ),
                );
              },
            );
          } else if (snapshot.hasError) {
            return Text('Error: ${snapshot.error}');
          }
          return const CircularProgressIndicator();
        });
  }

  @override
  Widget buildSuggestions(BuildContext context) {
    return const Center(child: Text('Search Events'));
  }
}
