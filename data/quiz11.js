db.quiz.save({
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
      "author" : "bob",
      "pageViews" : 5
    },
    {
      "author" : "dave",
      "pageViews" : 1007
    },
    {
      "author" : "jane",
      "pageViews" : 6
    }
  ],
  "expected_aggregation": function(){return [
    { $project : {
      _id : 0,
      author : 1,
      pageViews : { $cond : [
                    { $eq : ["$author", "dave"]},
                        { $add : ["$pageViews", 1000]},
                                 "$pageViews"]}
    }}
  ]},
  "title": "Doctor Daves views",
  "description": "return the pagesviews for each document but if it's dave's entry return 1000 as the pageViews",
  "step_descriptions": [
    "exclude the id field add the author and pageviews where pageviews is set to 1000 if the autor equals dave"
  ]
});