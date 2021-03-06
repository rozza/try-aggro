db.quiz.save({
  "title": "Average score of Justin T",
  "description": "Justin has the best batting record in baseball, what is his game average for last year?",
  "difficulty": 1,
  "data": [
    {
      "name": "justin",
      "game": 1,
      "date": ISODate("2007-09-19T19:06:51Z"),
      "hits": 20,
      "strikes": 1,
      "balls": 5,
      "homeround": 1
    },
    {
      "name": "justin",
      "game": 1,
      "date": ISODate("2007-09-20T19:06:51Z"),
      "hits": 30,
      "strikes": 1,
      "balls": 5,
      "homeround": 1
    },
    {
      "name": "justin",
      "game": 1,
      "date": ISODate("2007-09-21T19:06:51Z"),
      "hits": 50,
      "strikes": 1,
      "balls": 5,
      "homeround": 1
    }
  ],
  "result": [{
      "_id" : "justin",
      "avg_hits" : 33.333333333333336
  }],
  "expected_aggregation": function(){return [
      {$match: {name:'justin'}},
      { $group : { _id : "$name", avg_hits : { $avg : "$hits" } } }]},
  "step_descriptions": [
    "select just the data associated with justin",
    "group by name and calculate the average of all the hits per game"
  ]
});
