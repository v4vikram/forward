# User Registration Endpoint

## URL
`/api/v1/users/register`

## Method
`POST`

## Request Body
The request body should be a JSON object containing the following fields:

- `fullname.firstname` (string, required): The first name of the user. Must be at least 3 characters long.
- `fullname.lastname` (string, optional): The last name of the user. Must be at least 3 characters long.
- `email` (string, required): The email address of the user. Must be a valid email format.
- `password` (string, required): The password for the user. Must be at least 5 characters long.

Example:
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

## Response

### Success (200)
If the user is successfully created, the response will be a JSON object containing the user details and an authentication token.

Example:
```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "user": {
      "_id": "60d0fe4f5311236168a109ca",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com",
      "createdAt": "2021-06-21T12:00:00.000Z",
      "updatedAt": "2021-06-21T12:00:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Validation Error (400)
If the request body fails validation, the response will be a JSON object containing the validation errors.

Example:
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "msg": "Name must be at least 3 characters long",
      "param": "fullname.firstname",
      "location": "body"
    },
    {
      "msg": "Please enter a valid email address",
      "param": "email",
      "location": "body"
    }
  ]
}
```

### User Already Exists (400)
If a user with the given email already exists, the response will be a JSON object indicating the error.

Example:
```json
{
  "success": false,
  "message": "User already exists"
}
```

### Internal Server Error (500)
If there is an internal server error, the response will be a JSON object indicating the error.

Example:
```json
{
  "success": false,
  "message": "Internal Server Error",
  "error": "Error message"
}
```
