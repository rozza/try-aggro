db.quiz.save({
  "title": "Project all the games elements to the top",
  "description": "Lets transform the document projecting all the documents in the game",
  "difficulty": 1,
  "data": [
    {
      "name": "justin",
      "games": [
        {
          "date": ISODate("2007-09-19T19:06:51Z"),
          "hits": 20,
          "strikes": 1,
          "balls": 5,
          "homeround": 1
        },
        {
          "game": 1,
          "date": ISODate("2007-09-20T19:06:51Z"),
          "hits": 30,
          "strikes": 1,
          "balls": 5,
          "homeround": 1
        },
        {
          "game": 1,
          "date": ISODate("2007-09-21T19:06:51Z"),
          "hits": 50,
          "strikes": 1,
          "balls": 5,
          "homeround": 1
        }        
      ]
    }
  ],
  "result": [
    {
      "date": ISODate("2007-09-19T19:06:51Z"),
      "hits": 20,
      "strikes": 1,
      "balls": 5,
      "homeround": 1
    },
    {
      "game": 1,
      "date": ISODate("2007-09-20T19:06:51Z"),
      "hits": 30,
      "strikes": 1,
      "balls": 5,
      "homeround": 1
    },
    {
      "game": 1,
      "date": ISODate("2007-09-21T19:06:51Z"),
      "hits": 50,
      "strikes": 1,
      "balls": 5,
      "homeround": 1
    }        
  ],
  "expected_aggregation": function(){return [
      {$match: {name:"justin"}},
      {$project: {_id:0, strikes: "$games.hits"}}]},
  "step_descriptions": [
    "select just the data associated with justin",
    "unwind the list of games available for justin",
    "only return the field strikes"
  ]
});