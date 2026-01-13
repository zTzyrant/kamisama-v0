
## Tag Tests

[GET] /articles/tags

### REQUEST: GET http://localhost:3000/api/articles/tags
```json
{
  "headers": {
    "Content-Type": "application/json",
    "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIwMTliYjUwMS05ZjM5LTcxZDEtYjY5Yi1hNDJiNmUyOGM0OTUiLCJzaWQiOiIwMTliYjUwMS1lOTM2LTc3MTItOTc4MC00YTcwMjM5OTFkMzMiLCJleHAiOjE3NjgyNjkyNjEsImlhdCI6MTc2ODI2ODM2MSwianRpIjoiMDE5YmI1MDEtZWZlZS03MzAwLTk0OGQtODgxMTgzYTkzY2I3In0.7ymC6WKNUjwet91hFFwrh3BMB_Fp6tavofXPx-QhJBg"
  },
  "body": null
}
```


### RESPONSE: 200 OK
```json
{
  "status": "success",
  "code": "TAGS_FETCHED",
  "message": "Success",
  "data": [
    {
      "id": "019bb197-25c7-7861-9f0b-13af106f96f8",
      "name": "Technology",
      "slug": "technology"
    },
    {
      "id": "019bb197-25cd-79f1-a2a5-588dfad4e6d2",
      "name": "Programming",
      "slug": "programming"
    },
    {
      "id": "019bb197-25d1-7ad1-a3fd-4063ad027f20",
      "name": "Health",
      "slug": "health"
    },
    {
      "id": "019bb197-25d6-78d2-bcfe-cf809102b156",
      "name": "Lifestyle",
      "slug": "lifestyle"
    },
    {
      "id": "019bb197-25da-7cf1-a523-8f60ab5853bc",
      "name": "Rust",
      "slug": "rust"
    },
    {
      "id": "019bb197-25df-7dc3-a79c-1bd38cf3e313",
      "name": "Web Development",
      "slug": "web-development"
    }
  ]
}
```

- **SUCCESS**: Tags listed
> **INFO**: Selected Tag: Technology (019bb197-25c7-7861-9f0b-13af106f96f8)
[POST] /articles/tags

### REQUEST: POST http://localhost:3000/api/articles/tags
```json
{
  "headers": {
    "Content-Type": "application/json",
    "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIwMTliYjUwMS05ZjM5LTcxZDEtYjY5Yi1hNDJiNmUyOGM0OTUiLCJzaWQiOiIwMTliYjUwMS1lOTM2LTc3MTItOTc4MC00YTcwMjM5OTFkMzMiLCJleHAiOjE3NjgyNjkyNjEsImlhdCI6MTc2ODI2ODM2MSwianRpIjoiMDE5YmI1MDEtZWZlZS03MzAwLTk0OGQtODgxMTgzYTkzY2I3In0.7ymC6WKNUjwet91hFFwrh3BMB_Fp6tavofXPx-QhJBg"
  },
  "body": {
    "name": "Tag-79"
  }
}
```


### RESPONSE: 403 Forbidden
```json
{
  "status": "error",
  "code": "ACCESS_DENIED",
  "message": "You do not have permission to access this resource"
}
```

> **INFO**: User cannot create tags (Expected for normal user if restricted)
[POST] /articles/tags

### REQUEST: POST http://localhost:3000/api/articles/tags
```json
{
  "headers": {
    "Content-Type": "application/json",
    "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIwMTliYjUwMS05ZjM5LTcxZDEtYjY5Yi1hNDJiNmUyOGM0OTUiLCJzaWQiOiIwMTliYjUwMS1lOTM2LTc3MTItOTc4MC00YTcwMjM5OTFkMzMiLCJleHAiOjE3NjgyNjkyNjEsImlhdCI6MTc2ODI2ODM2MSwianRpIjoiMDE5YmI1MDEtZWZlZS03MzAwLTk0OGQtODgxMTgzYTkzY2I3In0.7ymC6WKNUjwet91hFFwrh3BMB_Fp6tavofXPx-QhJBg"
  },
  "body": {
    "name": ""
  }
}
```


### RESPONSE: 403 Forbidden
```json
{
  "status": "error",
  "code": "ACCESS_DENIED",
  "message": "You do not have permission to access this resource"
}
```

- **FAILED**: [Negative Case] Create tag with empty name - Failed. Got 403 / ACCESS_DENIED, Expected 422 / VALIDATION_ERROR
