db.quiz.save({
  "title": "Playing with project",
  "description": "Return the total page views for each document adding together the pageViews and either the foo or bar values",
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
      "totalViews" : 10
    },
    {
      "totalViews" : 21
    },
    {
      "totalViews" : 20
    }
  ],
  "expected_aggregation": function(){return [
    { $project : {
    _id: 0,
    totalViews : { $add :
                    ["$pageViews",
                     { $ifNull : ["$other.foo",
                                  "$other.bar"] } ] }
    }}
  ]},
  "step_descriptions": [
    "exclude the id field add the totalViews field that is the pageViews value + other.foo or other.bar if foo equals null"
  ]
});