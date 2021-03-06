db.quiz.save({
  "title": "Select dave's post",
  "description": "Let's match on a single document showing dave's blog post",
  "difficulty": 1,
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
  "result": {
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
  "expected_aggregation": function(){return [
      { $match : { author : "dave" }}]},
  "step_descriptions": [
    "select the blog post for dave"
  ]
});