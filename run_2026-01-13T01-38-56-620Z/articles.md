
## Article Negative Tests

[POST] /articles

### REQUEST: POST http://localhost:3000/api/articles
```json
{
  "headers": {
    "Content-Type": "application/json",
    "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIwMTliYjUwMS05ZjM5LTcxZDEtYjY5Yi1hNDJiNmUyOGM0OTUiLCJzaWQiOiIwMTliYjUwMS1lOTM2LTc3MTItOTc4MC00YTcwMjM5OTFkMzMiLCJleHAiOjE3NjgyNjkyNjEsImlhdCI6MTc2ODI2ODM2MSwianRpIjoiMDE5YmI1MDEtZWZlZS03MzAwLTk0OGQtODgxMTgzYTkzY2I3In0.7ymC6WKNUjwet91hFFwrh3BMB_Fp6tavofXPx-QhJBg"
  },
  "body": {
    "title": "No",
    "content": "Valid content text here...",
    "status": "draft",
    "visibility": "public"
  }
}
```


### RESPONSE: 422 Unprocessable Entity
```json
{
  "status": "error",
  "code": "VALIDATION_ERROR",
  "message": "Validation failed",
  "data": [
    {
      "field": "title",
      "title": "length",
      "message": "Title is required and must be at least 3 chars"
    }
  ]
}
```

- **SUCCESS**: [Negative Case] Create article with short title - Caught VALIDATION_ERROR (422)
[PUT] /articles/00000000-0000-0000-0000-000000000000

### REQUEST: PUT http://localhost:3000/api/articles/00000000-0000-0000-0000-000000000000
```json
{
  "headers": {
    "Content-Type": "application/json",
    "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIwMTliYjUwMS05ZjM5LTcxZDEtYjY5Yi1hNDJiNmUyOGM0OTUiLCJzaWQiOiIwMTliYjUwMS1lOTM2LTc3MTItOTc4MC00YTcwMjM5OTFkMzMiLCJleHAiOjE3NjgyNjkyNjEsImlhdCI6MTc2ODI2ODM2MSwianRpIjoiMDE5YmI1MDEtZWZlZS03MzAwLTk0OGQtODgxMTgzYTkzY2I3In0.7ymC6WKNUjwet91hFFwrh3BMB_Fp6tavofXPx-QhJBg"
  },
  "body": {
    "title": "Update"
  }
}
```


### RESPONSE: 404 Not Found
```json
{
  "status": "error",
  "code": "ARTICLE_NOT_FOUND",
  "message": "Article not found"
}
```

- **SUCCESS**: [Negative Case] Update non-existent article - Caught ARTICLE_NOT_FOUND (404)
[DELETE] /articles/00000000-0000-0000-0000-000000000000

### REQUEST: DELETE http://localhost:3000/api/articles/00000000-0000-0000-0000-000000000000
```json
{
  "headers": {
    "Content-Type": "application/json",
    "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIwMTliYjUwMS05ZjM5LTcxZDEtYjY5Yi1hNDJiNmUyOGM0OTUiLCJzaWQiOiIwMTliYjUwMS1lOTM2LTc3MTItOTc4MC00YTcwMjM5OTFkMzMiLCJleHAiOjE3NjgyNjkyNjEsImlhdCI6MTc2ODI2ODM2MSwianRpIjoiMDE5YmI1MDEtZWZlZS03MzAwLTk0OGQtODgxMTgzYTkzY2I3In0.7ymC6WKNUjwet91hFFwrh3BMB_Fp6tavofXPx-QhJBg"
  },
  "body": null
}
```


### RESPONSE: 404 Not Found
```json
{
  "status": "error",
  "code": "ARTICLE_NOT_FOUND",
  "message": "Article not found"
}
```

- **SUCCESS**: [Negative Case] Delete non-existent article - Caught ARTICLE_NOT_FOUND (404)

## Article Main Flow

[POST] /articles

### REQUEST: POST http://localhost:3000/api/articles
```json
{
  "headers": {
    "Content-Type": "application/json",
    "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIwMTliYjUwMS05ZjM5LTcxZDEtYjY5Yi1hNDJiNmUyOGM0OTUiLCJzaWQiOiIwMTliYjUwMS1lOTM2LTc3MTItOTc4MC00YTcwMjM5OTFkMzMiLCJleHAiOjE3NjgyNjkyNjEsImlhdCI6MTc2ODI2ODM2MSwianRpIjoiMDE5YmI1MDEtZWZlZS03MzAwLTk0OGQtODgxMTgzYTkzY2I3In0.7ymC6WKNUjwet91hFFwrh3BMB_Fp6tavofXPx-QhJBg"
  },
  "body": {
    "title": "Test Article 2026-01-13T01:40:56.090Z",
    "content": "This is a test article content containing **Markdown**.",
    "excerpt": "Short excerpt",
    "status": "draft",
    "visibility": "public",
    "tags": [
      "019bb197-25c7-7861-9f0b-13af106f96f8"
    ]
  }
}
```


### RESPONSE: 201 Created
```json
{
  "status": "success",
  "code": "ARTICLE_CREATED",
  "message": "Article created",
  "data": {
    "id": "019bb503-683a-7e80-9ba6-c40e374e7f85",
    "title": "Test Article 2026-01-13T01:40:56.090Z",
    "slug": "test-article-2026-01-13t01-40-56-090z-2026-01-13",
    "excerpt": "Short excerpt",
    "content": "This is a test article content containing **Markdown**.",
    "status": "draft",
    "visibility": "public",
    "tags": [
      {
        "id": "019bb197-25c7-7861-9f0b-13af106f96f8",
        "name": "Technology",
        "slug": "technology"
      }
    ],
    "featured_image": null,
    "author": {
      "id": "019bb501-9f39-71d1-b69b-a42b6e28c495",
      "username": "testuser708",
      "avatar_url": null
    },
    "created_at": "2026-01-13T01:40:58.042280Z",
    "updated_at": "2026-01-13T01:40:58.042283Z"
  }
}
```

- **SUCCESS**: Article created
- **SUCCESS**: Author field present
[GET] /articles/019bb503-683a-7e80-9ba6-c40e374e7f85

### REQUEST: GET http://localhost:3000/api/articles/019bb503-683a-7e80-9ba6-c40e374e7f85
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
  "code": "ARTICLE_FETCHED",
  "message": "Success",
  "data": {
    "id": "019bb503-683a-7e80-9ba6-c40e374e7f85",
    "title": "Test Article 2026-01-13T01:40:56.090Z",
    "slug": "test-article-2026-01-13t01-40-56-090z-2026-01-13",
    "excerpt": "Short excerpt",
    "content": "This is a test article content containing **Markdown**.",
    "status": "draft",
    "visibility": "public",
    "tags": [
      {
        "id": "019bb197-25c7-7861-9f0b-13af106f96f8",
        "name": "Technology",
        "slug": "technology"
      }
    ],
    "featured_image": null,
    "author": {
      "id": "019bb501-9f39-71d1-b69b-a42b6e28c495",
      "username": "testuser708",
      "avatar_url": null
    },
    "created_at": "2026-01-13T01:40:58.042280Z",
    "updated_at": "2026-01-13T01:40:58.042283Z"
  }
}
```

- **SUCCESS**: Get Article by ID success
[PUT] /articles/019bb503-683a-7e80-9ba6-c40e374e7f85

### REQUEST: PUT http://localhost:3000/api/articles/019bb503-683a-7e80-9ba6-c40e374e7f85
```json
{
  "headers": {
    "Content-Type": "application/json",
    "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIwMTliYjUwMS05ZjM5LTcxZDEtYjY5Yi1hNDJiNmUyOGM0OTUiLCJzaWQiOiIwMTliYjUwMS1lOTM2LTc3MTItOTc4MC00YTcwMjM5OTFkMzMiLCJleHAiOjE3NjgyNjkyNjEsImlhdCI6MTc2ODI2ODM2MSwianRpIjoiMDE5YmI1MDEtZWZlZS03MzAwLTk0OGQtODgxMTgzYTkzY2I3In0.7ymC6WKNUjwet91hFFwrh3BMB_Fp6tavofXPx-QhJBg"
  },
  "body": {
    "title": "Updated Title",
    "status": "published"
  }
}
```


### RESPONSE: 200 OK
```json
{
  "status": "success",
  "code": "ARTICLE_UPDATED",
  "message": "Article updated",
  "data": {
    "id": "019bb503-683a-7e80-9ba6-c40e374e7f85",
    "title": "Updated Title",
    "slug": "test-article-2026-01-13t01-40-56-090z-2026-01-13",
    "excerpt": "Short excerpt",
    "content": "This is a test article content containing **Markdown**.",
    "status": "published",
    "visibility": "public",
    "tags": [
      {
        "id": "019bb197-25c7-7861-9f0b-13af106f96f8",
        "name": "Technology",
        "slug": "technology"
      }
    ],
    "featured_image": null,
    "author": {
      "id": "019bb501-9f39-71d1-b69b-a42b6e28c495",
      "username": "testuser708",
      "avatar_url": null
    },
    "created_at": "2026-01-13T01:40:58.042280Z",
    "updated_at": "2026-01-13T01:41:02.027152Z"
  }
}
```

- **SUCCESS**: Article updated
- **SUCCESS**: Title updated
[GET] /articles?page=1&limit=5&status=published

### REQUEST: GET http://localhost:3000/api/articles?page=1&limit=5&status=published
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
  "code": "ARTICLES_FETCHED",
  "message": "Success",
  "data": {
    "data": [
      {
        "id": "019bb503-683a-7e80-9ba6-c40e374e7f85",
        "title": "Updated Title",
        "slug": "test-article-2026-01-13t01-40-56-090z-2026-01-13",
        "excerpt": "Short excerpt",
        "content": "This is a test article content containing **Markdown**.",
        "status": "published",
        "visibility": "public",
        "tags": [
          {
            "id": "019bb197-25c7-7861-9f0b-13af106f96f8",
            "name": "Technology",
            "slug": "technology"
          }
        ],
        "featured_image": null,
        "author": {
          "id": "019bb501-9f39-71d1-b69b-a42b6e28c495",
          "username": "testuser708",
          "avatar_url": null
        },
        "created_at": "2026-01-13T01:40:58.042280Z",
        "updated_at": "2026-01-13T01:41:02.027152Z"
      }
    ],
    "meta": {
      "total": 1,
      "page": 1,
      "limit": 5
    }
  }
}
```

- **SUCCESS**: Articles listed (Published)
[DELETE] /articles/019bb503-683a-7e80-9ba6-c40e374e7f85

### REQUEST: DELETE http://localhost:3000/api/articles/019bb503-683a-7e80-9ba6-c40e374e7f85
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
  "code": "ARTICLE_DELETED",
  "message": "Article deleted",
  "data": null
}
```

- **SUCCESS**: Article deleted
[GET] /articles/019bb503-683a-7e80-9ba6-c40e374e7f85

### REQUEST: GET http://localhost:3000/api/articles/019bb503-683a-7e80-9ba6-c40e374e7f85
```json
{
  "headers": {
    "Content-Type": "application/json",
    "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIwMTliYjUwMS05ZjM5LTcxZDEtYjY5Yi1hNDJiNmUyOGM0OTUiLCJzaWQiOiIwMTliYjUwMS1lOTM2LTc3MTItOTc4MC00YTcwMjM5OTFkMzMiLCJleHAiOjE3NjgyNjkyNjEsImlhdCI6MTc2ODI2ODM2MSwianRpIjoiMDE5YmI1MDEtZWZlZS03MzAwLTk0OGQtODgxMTgzYTkzY2I3In0.7ymC6WKNUjwet91hFFwrh3BMB_Fp6tavofXPx-QhJBg"
  },
  "body": null
}
```


### RESPONSE: 404 Not Found
```json
{
  "status": "error",
  "code": "ARTICLE_NOT_FOUND",
  "message": "Article not found"
}
```

- **SUCCESS**: Article now 404 (Correctly deleted)
