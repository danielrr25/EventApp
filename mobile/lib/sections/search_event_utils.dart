// import 'package:flutter/material.dart';
// import 'package:mobile/components/fetch_user.dart';
// import 'package:mobile/sections/search_event.dart';

// class SearchEvent extends SearchDelegate {
//   final FetchEvent _eventList = FetchEvent();

//   @override
//   List<Widget>? buildActions(BuildContext context) {
//     return [
//       IconButton(
//           onPressed: () {
//             query = '';
//           },
//           icon: const Icon(Icons.close))
//     ];
//   }

//   @override
//   Widget? buildLeading(BuildContext context) {
//     return IconButton(
//         onPressed: () {
//           Navigator.pop(context);
//         },
//         icon: const Icon(Icons.arrow_back_ios));
//   }

//   @override
//   Widget buildResults(BuildContext context) {
//     return FutureBuilder<List<Event>>(
//         future: _eventList.fetchEventList(),
//         builder: (context, snapshot) {
//           if (!snapshot.hasData) {
//             return const Center(
//               child: CircularProgressIndicator(),
//             );
//           }
//           List<Event>? data = snapshot.data;
//           return ListView.builder(
//             itemCount: data?.length,
//             itemBuilder: (context, index) {
//               return Card(
//                 child: ListTile(
//                   title: Row(
//                     children: [
//                       Container(
//                         height: 60,
//                         width: 60,
//                         decoration: BoxDecoration(
//                             color: Colors.purple,
//                             borderRadius: BorderRadius.circular(10)),
//                         child: Center(
//                           child: Text(
//                             '${data?[index].eventName}',
//                             style: const TextStyle(
//                                 color: Colors.white,
//                                 fontWeight: FontWeight.bold),
//                           ),
//                         ),
//                       ),
//                       const SizedBox(
//                         width: 10,
//                       ),
//                       Column(
//                         crossAxisAlignment: CrossAxisAlignment.start,
//                         children: [
//                           Text('${data?[index].eventLocation}'),
//                           Text(' User id: ${data?[index].eventDate}'),
//                         ],
//                       )
//                     ],
//                   ),
//                 ),
//               );
//             },
//           );
//         });
//   }

//   @override
//   Widget buildSuggestions(BuildContext context) {
//     return const Center(child: Text('Search Events'));
//   }
// }
