db.quiz.save({
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
      "comments" : {
        "author" : "jenny",
        "text" : "i like to play pinball",
        "votes" : 10
      }
    },
    {
      "comments" : {
        "author" : "jenny",
        "text" : "can i get that in green?"
      }
    }
  ],
  "expected_aggregation": function(){return [
    { $match : {"comments.author" : "jenny" }},
    { $project : {
      _id: 0,
      comments : 1
    }},
    { $unwind : "$comments" },
    { $match : { "comments.author" : "jenny" } }
  ]},
  "title": "Jenny's comments",
  "description": "only show the comments where jenny was the author",
  "step_descriptions": [
    "filter out all the documents where the author is jenny, project the comments, unwind all of the comments and filter out all comments not written by jenny"
  ]
});