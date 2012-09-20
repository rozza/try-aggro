db.quiz.save({
  "_id": 12,
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
  "result": [
    {
      "_id" : ObjectId("505a63ab9b1e9234661b98f8"),
      "title" : "this is my title",
      "author" : "bob",
      "posted" : ISODate("2004-03-21T18:59:54Z"),
      "pageViews" : 5,
      "tags" : "fun",
      "comments" : [
        {
          "author" : "joe",
          "text" : "this is cool"
        },
        {
          "author" : "sam",
          "text" : "this is bad"
        }
      ],
      "other" : {
        "foo" : 5
      }
    },
    {
      "_id" : ObjectId("505a63ab9b1e9234661b98f8"),
      "title" : "this is my title",
      "author" : "bob",
      "posted" : ISODate("2004-03-21T18:59:54Z"),
      "pageViews" : 5,
      "tags" : "good",
      "comments" : [
        {
          "author" : "joe",
          "text" : "this is cool"
        },
        {
          "author" : "sam",
          "text" : "this is bad"
        }
      ],
      "other" : {
        "foo" : 5
      }
    },
    {
      "_id" : ObjectId("505a63ab9b1e9234661b98f8"),
      "title" : "this is my title",
      "author" : "bob",
      "posted" : ISODate("2004-03-21T18:59:54Z"),
      "pageViews" : 5,
      "tags" : "fun",
      "comments" : [
        {
          "author" : "joe",
          "text" : "this is cool"
        },
        {
          "author" : "sam",
          "text" : "this is bad"
        }
      ],
      "other" : {
        "foo" : 5
      }
    },
    {
      "_id" : ObjectId("505a63ab9b1e9234661b98f9"),
      "title" : "this is your title",
      "author" : "dave",
      "posted" : ISODate("2100-08-08T04:11:10Z"),
      "pageViews" : 7,
      "tags" : "fun",
      "comments" : [
        {
          "author" : "barbara",
          "text" : "this is interesting"
        },
        {
          "author" : "jenny",
          "text" : "i like to play pinball",
          "votes" : 10
        }
      ],
      "other" : {
        "bar" : 14
      }
    },
    {
      "_id" : ObjectId("505a63ab9b1e9234661b98f9"),
      "title" : "this is your title",
      "author" : "dave",
      "posted" : ISODate("2100-08-08T04:11:10Z"),
      "pageViews" : 7,
      "tags" : "sport",
      "comments" : [
        {
          "author" : "barbara",
          "text" : "this is interesting"
        },
        {
          "author" : "jenny",
          "text" : "i like to play pinball",
          "votes" : 10
        }
      ],
      "other" : {
        "bar" : 14
      }
    },
    {
      "_id" : ObjectId("505a63ab9b1e9234661b98fa"),
      "title" : "this is some other title",
      "author" : "jane",
      "posted" : ISODate("2000-12-31T05:17:14Z"),
      "pageViews" : 6,
      "tags" : "sport",
      "comments" : [
        {
          "author" : "will",
          "text" : "i don't like the color"
        },
        {
          "author" : "jenny",
          "text" : "can i get that in green?"
        }
      ],
      "other" : {
        "bar" : 14
      }
    },
    {
      "_id" : ObjectId("505a63ab9b1e9234661b98fa"),
      "title" : "this is some other title",
      "author" : "jane",
      "posted" : ISODate("2000-12-31T05:17:14Z"),
      "pageViews" : 6,
      "tags" : "code",
      "comments" : [
        {
          "author" : "will",
          "text" : "i don't like the color"
        },
        {
          "author" : "jenny",
          "text" : "can i get that in green?"
        }
      ],
      "other" : {
        "bar" : 14
      }
    }
  ],
  "expected_aggregation": function(){return [
    { $unwind : "$tags" }
  ]},
  "title": "Playing tag",
  "description": "unwind the tags emitting a document for each tag",
  "step_descriptions": [
    "emit all the documents pr tag, each tag will return be returned with all the other document fields"
  ]
});