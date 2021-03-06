db.quiz.save({
  "title": "Sum all the strikes justin did in his play period",
  "description": "Let's establish how many strikes Justin did in total over the period the dataset represents",
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
  "result": {
      "_id" : "justin",
      "total_strikes" : 3.0
  },
  "expected_aggregation": function(){return [
      {$match: {name:'justin'}},
      { $group : { _id : "$name", total_strikes : { $sum : "$strikes" } } }]},
  "step_descriptions": [
    "select just the data associated with justin",
    "group by name and calculate the sum of all the strikes in the game"
  ]
});