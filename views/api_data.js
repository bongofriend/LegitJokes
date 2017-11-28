define({ "api": [
  {
    "type": "get",
    "url": "/categories",
    "title": "Get All Available Categories",
    "group": "Category",
    "version": "0.0.0",
    "filename": "controllers/category.js",
    "groupTitle": "Category",
    "name": "GetCategories"
  },
  {
    "type": "get",
    "url": "/joke",
    "title": "Get Jokes From A Category",
    "group": "Jokes",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "category",
            "description": "<p>CategoryID of the desired Jokes</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Response: ",
          "content": "{\n Status: \"Ok\"\n data:[{\n     \"id\": 1,\n     \"content\": \"Was ist gelb, hat einen Arm und kann nicht schwimmen? Ein Bagger\",\n     \"date\": \"2017-11-27\",\n     \"username\": \"hanswurst\",\n     \"category\": 0,\n     \"upvotes\": 0,\n     \"downvotes\": 0\n }]                \n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "controllers/jokes.js",
    "groupTitle": "Jokes",
    "name": "GetJoke"
  },
  {
    "type": "get",
    "url": "/joke/random",
    "title": "Get A Random Joke",
    "group": "Jokes",
    "version": "0.0.0",
    "filename": "controllers/jokes.js",
    "groupTitle": "Jokes",
    "name": "GetJokeRandom"
  },
  {
    "type": "get",
    "url": "/vote",
    "title": "Vote for a Joke",
    "group": "Jokes",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "ID",
            "description": "<p>ID of the Joke</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "vote",
            "description": "<p>&quot;up&quot; for Upvote and &quot;down&quot; for Downvote</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>A Unique JWT Based on the Username</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Authorization-Example: ",
          "content": "{\n    \"Authorization\": Bearer Token\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "controllers/jokes.js",
    "groupTitle": "Jokes",
    "name": "GetVote"
  },
  {
    "type": "post",
    "url": "/joke/submit",
    "title": "Submit a Joke with a Category",
    "group": "Jokes",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>Contents of the Joke</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "category",
            "description": "<p>Category ID for the Joke</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>A Unique JWT Based on the Username</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Authorization-Example: ",
          "content": "{\n    \"Authorization\": Bearer Token\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "controllers/jokes.js",
    "groupTitle": "Jokes",
    "name": "PostJokeSubmit"
  },
  {
    "type": "get",
    "url": "/user/coins",
    "title": "Increase/Decrease Coins",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>&quot;up&quot;/&quot;down&quot; for increasing/decreasing Coins by 1</p>"
          }
        ]
      }
    },
    "header": {
      "examples": [
        {
          "title": "Authorization-Example: ",
          "content": "{\n  \"Authorization\": Bearer Token\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "controllers/users.js",
    "groupTitle": "User",
    "name": "GetUserCoins"
  },
  {
    "type": "post",
    "url": "/user/register",
    "title": "Register an Account",
    "name": "PostUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controllers/users.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "user/authenticate",
    "title": "Exchange Username and Password for a JWT",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password of the User</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username of the User</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Response: ",
          "content": "{\n Status: \"Ok\"\n token: \"UserToken\"   \n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "controllers/users.js",
    "groupTitle": "User",
    "name": "PostUserAuthenticate"
  }
] });
