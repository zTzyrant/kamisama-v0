
## Admin Tests

[GET] /admin/casbin/policies

### REQUEST: GET http://localhost:3000/api/admin/casbin/policies
```json
{
  "headers": {
    "Content-Type": "application/json",
    "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIwMTliYjUwMS05ZjM5LTcxZDEtYjY5Yi1hNDJiNmUyOGM0OTUiLCJzaWQiOiIwMTliYjUwMS1lOTM2LTc3MTItOTc4MC00YTcwMjM5OTFkMzMiLCJleHAiOjE3NjgyNjkyNjEsImlhdCI6MTc2ODI2ODM2MSwianRpIjoiMDE5YmI1MDEtZWZlZS03MzAwLTk0OGQtODgxMTgzYTkzY2I3In0.7ymC6WKNUjwet91hFFwrh3BMB_Fp6tavofXPx-QhJBg"
  },
  "body": null
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

> **INFO**: User is not admin (Expected)
