db.quiz.save({
  "_id": 10,
  "title": "Having fun on a date",
  "description": "Split out all the components of the data for each document and return a new exploded document",
  "difficulty": 3,
  "data": [
    {
      "title" : "this is my title" ,
      "author" : "bob" ,
      "posted" : new Date(1079895594000),
      "pageViews" : 5 ,
      "tags" : [ "fun" , "good" , "fun" ] ,
      "comments" : [
          { "author" :"joe" , "text" : "this is cool" } ,
          { "author" :"sam" , "text" : "this is bad" }
      ],
      "other" : { "foo" : 5 }
    },
    {
      "title" : "this is your title" ,
      "author" : "dave" ,
      "posted" : new Date(4121381470000) ,
      "pageViews" : 7 ,
      "tags" : [ "fun" , "sport" ] ,
      "comments" : [
          { "author" :"barbara" , "text" : "this is interesting" } ,
          { "author" :"jenny" , "text" : "i like to play pinball",
            "votes": 10 }
      ],
      "other" : { "bar" : 14 }
    },
    {
      "title" : "this is some other title" ,
      "author" : "jane" ,
      "posted" : new Date(978239834000) ,
      "pageViews" : 6 ,
      "tags" : [ "sport" , "code" ] ,
      "comments" : [
          { "author" :"will" , "text" : "i don't like the color" } ,
          { "author" :"jenny" , "text" : "can i get that in green?" }
      ],
      "other" : { "bar" : 14 }
    }
  ],
  "result": [
    {
      "seconds" : 54,
      "minutes" : 59,
      "hour" : 18,
      "dayOfYear" : 81,
      "dayOfMonth" : 21,
      "dayOfWeek" : 1,
      "month" : 3,
      "week" : 12,
      "year" : 2004
    },
    {
      "seconds" : 10,
      "minutes" : 11,
      "hour" : 4,
      "dayOfYear" : 220,
      "dayOfMonth" : 8,
      "dayOfWeek" : 1,
      "month" : 8,
      "week" : 32,
      "year" : 2100
    },
    {
      "seconds" : 14,
      "minutes" : 17,
      "hour" : 5,
      "dayOfYear" : 366,
      "dayOfMonth" : 31,
      "dayOfWeek" : 1,
      "month" : 12,
      "week" : 53,
      "year" : 2000
    }
  ],
  "expected_aggregation": function(){return [
    { $project : {
      _id: 0,
      authors : 1,
      seconds : { $second: "$posted" },
      minutes : { $minute: "$posted" },
      hour : { $hour: "$posted" },
      dayOfYear : { $dayOfYear: "$posted" },
      dayOfMonth : { $dayOfMonth: "$posted" },
      dayOfWeek : { $dayOfWeek: "$posted" },
      month : { $month: "$posted" },
      week : { $week: "$posted" },
      year : { $year: "$posted" }
    }}
  ]},
  "step_descriptions": [
    "exclude the id field add the totalViews field that is the pageViews value + other.foo or other.bar if foo equals null"
  ]
});