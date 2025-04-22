# Testing


## Get all users
`GET http://localhost:3001/api/users`

## Get all thoughts
`GET http://localhost:3001/api/thoughts`

## Get a single user
`GET http://localhost:3001/api/users/{userid}`

## Get a single thought
`GET http://localhost:3001/api/thoughts/{thoughtid}`


## Create a new thought
`POST http://localhost:3001/api/thoughts`

Body: 
```JSON
{
  "thoughtText": "we're getting there",
  "username": "coolcoder"
}
```

Add a Friend
POST http://localhost:3001/api/users/{userid}/friends/{friendid}

Create a new user
POST http://localhost:3001/api/users

Body (JSON):
{
  "username": "new_user123",
  "email": "newuser123@example.com"
}

Add a reaction to a thought
POST http://localhost:3001/api/thoughts/{thoughtid}/reactions

Body (JSON):
{
  "reactionBody": "Awesome thought!",
  "username": "node_ninja"
}


Update a user to change email
PUT http://localhost:3001/api/users/{userid}

user id 
Body (JSON):
{
  "email": "updatedemail@example.com"
}

Update a thought
PUT http://localhost:3001/api/thoughts/{thoughtid}

Body (JSON):
{
  "thoughtText": "Updated thought text goes here!"
}

Delete a thought
DELETE http://localhost:3001/api/thoughts/{thoughtid}

Remove a reaction
DELETE http://localhost:3001/api/thoughts/{thoughtid}/reactions/{reactionId}

Remove a friend
DELETE http://localhost:3001/api/users/{userid}/friends/{friendid}

Delete a user 
DELETE http://localhost:3001/api/users/{userid}

