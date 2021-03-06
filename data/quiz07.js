db.quiz.save({
  "title": "Tags and views",
  "description": "Let's pull out the tags and pageviews values and create a new meta sub document",
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
      "_id" : ObjectId("505a58819b1e9234661b98f5"),
      "author" : "bob",
      "meta" : {
        "tags" : [
          "fun",
          "good",
          "fun"
        ],
        "views" : 5
      }
    },
    {
      "_id" : ObjectId("505a58819b1e9234661b98f6"),
      "author" : "dave",
      "meta" : {
        "tags" : [
          "fun",
          "sport"
        ],
        "views" : 7
      }
    },
    {
      "_id" : ObjectId("505a58819b1e9234661b98f7"),
      "author" : "jane",
      "meta" : {
        "tags" : [
          "sport",
          "code"
        ],
        "views" : 6
      }
    }
  ],
  "expected_aggregation": function(){return [
      { $project : {
          author : 1,
          meta : { tags : "$tags",
                   views : "$pageViews" }
                  }}
      ]},
  "step_descriptions": [
    "exclude the id field and promote the foo and bar variables to the top results"
  ]
});