db.quiz.save({
  "_id": 8,
  "title": "Projecting Authors",
  "description": "Return the author for each document and mark it with a boolean if it's dave who wrote it",
  "difficulty": 2,
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
      "author" : "bob",
      "daveWroteIt" : false
    },
    {
      "author" : "dave",
      "daveWroteIt" : true
    },
    {
      "author" : "jane",
      "daveWroteIt" : false
    }
  ],
  "expected_aggregation": function(){return [
    { $project : {
      _id: 0,
      author : 1,
      daveWroteIt : { $eq : ["$author", "dave"] }
    }}
  ]},
  "step_descriptions": [
    "exclude the id field add the author field and return the result of checking the equality of the author field against dave as daveWroteIt"
  ]
});