
## Authentication Negative Tests

[POST] /auth/register

### REQUEST: POST http://localhost:3000/api/auth/register
```json
{
  "headers": {
    "Content-Type": "application/json"
  },
  "body": {
    "username": "baduser",
    "email": "not-an-email",
    "password": "password123"
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
      "field": "email",
      "title": "email",
      "message": "Invalid email format"
    }
  ]
}
```

- **SUCCESS**: [Negative Case] Register with invalid email format - Caught VALIDATION_ERROR (422)
[POST] /auth/register

### REQUEST: POST http://localhost:3000/api/auth/register
```json
{
  "headers": {
    "Content-Type": "application/json"
  },
  "body": {
    "username": "shortpass",
    "email": "short@example.com",
    "password": "123"
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
      "field": "password",
      "title": "length",
      "message": "Password must be at least 6 characters"
    }
  ]
}
```

- **SUCCESS**: [Negative Case] Register with short password - Caught VALIDATION_ERROR (422)
[POST] /auth/login

### REQUEST: POST http://localhost:3000/api/auth/login
```json
{
  "headers": {
    "Content-Type": "application/json"
  },
  "body": {
    "login_id": "nonexistentuser",
    "password": "wrongpassword"
  }
}
```


### RESPONSE: 401 Unauthorized
```json
{
  "status": "error",
  "code": "AUTH_FAILED",
  "message": "Invalid username or password"
}
```

- **SUCCESS**: [Negative Case] Login with non-existent user - Caught AUTH_FAILED (401)

## Authentication Main Flow

Creating user: testuser708 / test708@example.com
[POST] /auth/register

### REQUEST: POST http://localhost:3000/api/auth/register
```json
{
  "headers": {
    "Content-Type": "application/json"
  },
  "body": {
    "username": "testuser708",
    "email": "test708@example.com",
    "password": "password123"
  }
}
```


### RESPONSE: 201 Created
```json
{
  "status": "success",
  "code": "AUTH_REGISTER_SUCCESS",
  "message": "User registered successfully",
  "data": {
    "id": "019bb501-9f39-71d1-b69b-a42b6e28c495",
    "username": "testuser708",
    "email": "test708@example.com"
  }
}
```

- **SUCCESS**: Registration successful
[POST] /auth/register

### REQUEST: POST http://localhost:3000/api/auth/register
```json
{
  "headers": {
    "Content-Type": "application/json"
  },
  "body": {
    "username": "testuser708",
    "email": "test708@example.com",
    "password": "password123"
  }
}
```


### RESPONSE: 409 Conflict
```json
{
  "status": "error",
  "code": "AUTH_DUPLICATE",
  "message": "Username and Email already exists"
}
```

- **SUCCESS**: [Negative Case] Register duplicate user - Caught AUTH_DUPLICATE (409)
> **WARNING**: MANUAL ACTION REQUIRED ⚠️
An email has been sent to test708@example.com (check Mailpit/Console)
[POST] /auth/verify-email

### REQUEST: POST http://localhost:3000/api/auth/verify-email
```json
{
  "headers": {
    "Content-Type": "application/json"
  },
  "body": {
    "token": "invalid-token"
  }
}
```


### RESPONSE: 400 Bad Request
```json
{
  "status": "error",
  "code": "INVALID_TOKEN",
  "message": "Invalid verification token"
}
```

- **SUCCESS**: [Negative Case] Verify with invalid token - Caught INVALID_TOKEN (400)
[POST] /auth/verify-email

### REQUEST: POST http://localhost:3000/api/auth/verify-email
```json
{
  "headers": {
    "Content-Type": "application/json"
  },
  "body": {
    "token": "7674d48b-07aa-4300-8e66-7da0248c0c1c"
  }
}
```


### RESPONSE: 200 OK
```json
{
  "status": "success",
  "code": "EMAIL_VERIFIED",
  "message": "Email verified successfully",
  "data": null
}
```

- **SUCCESS**: Email Verification successful
[POST] /auth/login

### REQUEST: POST http://localhost:3000/api/auth/login
```json
{
  "headers": {
    "Content-Type": "application/json"
  },
  "body": {
    "login_id": "testuser708",
    "password": "password123"
  }
}
```


### RESPONSE: 200 OK
```json
{
  "status": "success",
  "code": "AUTH_LOGIN_SUCCESS",
  "message": "Login successful",
  "data": {
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIwMTliYjUwMS05ZjM5LTcxZDEtYjY5Yi1hNDJiNmUyOGM0OTUiLCJzaWQiOiIwMTliYjUwMS1lOTM2LTc3MTItOTc4MC00YTcwMjM5OTFkMzMiLCJleHAiOjE3NjgyNjkyNTksImlhdCI6MTc2ODI2ODM1OSwianRpIjoiMDE5YmI1MDEtZTkzYS03MDQxLTkwMmYtN2Y4NmUxZWVjM2IwIn0.vsklSs07Msq_47il3jmE5VFOOiRZwCha4zZ870rPOi0",
    "token_expires_at": 1768269259,
    "refresh_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIwMTliYjUwMS05ZjM5LTcxZDEtYjY5Yi1hNDJiNmUyOGM0OTUiLCJleHAiOjE3Njg4NzMxNTksImlhdCI6MTc2ODI2ODM1OSwianRpIjoiMDE5YmI1MDEtZTkzNi03NzEyLTk3ODAtNGE2ZDdhZjhkYmNlIiwidG9rZW5fdHlwZSI6InJlZnJlc2gifQ.jsLC9THTGJCaMteqBeuieyYyJLjuQalLi6ign6li9mw",
    "refresh_token_expires_at": 1768873159,
    "type_": "Bearer"
  }
}
```

- **SUCCESS**: Login successful
[GET] /auth/profile

### REQUEST: GET http://localhost:3000/api/auth/profile
```json
{
  "headers": {
    "Content-Type": "application/json",
    "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIwMTliYjUwMS05ZjM5LTcxZDEtYjY5Yi1hNDJiNmUyOGM0OTUiLCJzaWQiOiIwMTliYjUwMS1lOTM2LTc3MTItOTc4MC00YTcwMjM5OTFkMzMiLCJleHAiOjE3NjgyNjkyNTksImlhdCI6MTc2ODI2ODM1OSwianRpIjoiMDE5YmI1MDEtZTkzYS03MDQxLTkwMmYtN2Y4NmUxZWVjM2IwIn0.vsklSs07Msq_47il3jmE5VFOOiRZwCha4zZ870rPOi0"
  },
  "body": null
}
```


### RESPONSE: 200 OK
```json
{
  "status": "success",
  "code": "PROFILE_FETCHED",
  "message": "Success",
  "data": {
    "id": "019bb501-9f39-71d1-b69b-a42b6e28c495",
    "username": "testuser708",
    "email": "test708@example.com",
    "avatar_url": null,
    "two_factor_enabled": false,
    "roles": [
      {
        "id": "019bb197-2326-7a83-aa9d-bc3c4fe12c9b",
        "name": "user"
      }
    ],
    "connected_accounts": []
  }
}
```

- **SUCCESS**: Profile fetched & username matches

## OAuth Flow (URL Check)

[GET] /auth/oauth/github

### REQUEST: GET http://localhost:3000/api/auth/oauth/github
```json
{
  "headers": {
    "Content-Type": "application/json",
    "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIwMTliYjUwMS05ZjM5LTcxZDEtYjY5Yi1hNDJiNmUyOGM0OTUiLCJzaWQiOiIwMTliYjUwMS1lOTM2LTc3MTItOTc4MC00YTcwMjM5OTFkMzMiLCJleHAiOjE3NjgyNjkyNTksImlhdCI6MTc2ODI2ODM1OSwianRpIjoiMDE5YmI1MDEtZTkzYS03MDQxLTkwMmYtN2Y4NmUxZWVjM2IwIn0.vsklSs07Msq_47il3jmE5VFOOiRZwCha4zZ870rPOi0"
  },
  "body": null
}
```


### RESPONSE: 200 OK
```json
{
  "status": "success",
  "code": "OAUTH_URL_GENERATED",
  "message": "Redirect URL generated",
  "data": {
    "url": "https://github.com/login/oauth/authorize?response_type=code&client_id=Ov23liO7KHzJLFiji3aH&state=5ZHzlsy-5l0Wa4z5-qsoyw&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth%2Foauth%2Fgithub%2Fcallback&scope=user%3Aemail+read%3Auser"
  }
}
```

- **SUCCESS**: GitHub OAuth URL generated
[GET] /auth/oauth/google

### REQUEST: GET http://localhost:3000/api/auth/oauth/google
```json
{
  "headers": {
    "Content-Type": "application/json",
    "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIwMTliYjUwMS05ZjM5LTcxZDEtYjY5Yi1hNDJiNmUyOGM0OTUiLCJzaWQiOiIwMTliYjUwMS1lOTM2LTc3MTItOTc4MC00YTcwMjM5OTFkMzMiLCJleHAiOjE3NjgyNjkyNTksImlhdCI6MTc2ODI2ODM1OSwianRpIjoiMDE5YmI1MDEtZTkzYS03MDQxLTkwMmYtN2Y4NmUxZWVjM2IwIn0.vsklSs07Msq_47il3jmE5VFOOiRZwCha4zZ870rPOi0"
  },
  "body": null
}
```


### RESPONSE: 200 OK
```json
{
  "status": "success",
  "code": "OAUTH_URL_GENERATED",
  "message": "Redirect URL generated",
  "data": {
    "url": "https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=271681036140-hrrtcfq7a2qop8tdkmdcva5qq1mogo7h.apps.googleusercontent.com&state=o5WSVOMfT7CiL4zNSPGydw&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth%2Foauth%2Fgoogle%2Fcallback&scope=email+profile"
  }
}
```

- **SUCCESS**: Google OAuth URL generated

## Refresh Token Flow

[POST] /auth/refresh

### REQUEST: POST http://localhost:3000/api/auth/refresh
```json
{
  "headers": {
    "Content-Type": "application/json",
    "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIwMTliYjUwMS05ZjM5LTcxZDEtYjY5Yi1hNDJiNmUyOGM0OTUiLCJzaWQiOiIwMTliYjUwMS1lOTM2LTc3MTItOTc4MC00YTcwMjM5OTFkMzMiLCJleHAiOjE3NjgyNjkyNTksImlhdCI6MTc2ODI2ODM1OSwianRpIjoiMDE5YmI1MDEtZTkzYS03MDQxLTkwMmYtN2Y4NmUxZWVjM2IwIn0.vsklSs07Msq_47il3jmE5VFOOiRZwCha4zZ870rPOi0"
  },
  "body": {
    "refresh_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIwMTliYjUwMS05ZjM5LTcxZDEtYjY5Yi1hNDJiNmUyOGM0OTUiLCJleHAiOjE3Njg4NzMxNTksImlhdCI6MTc2ODI2ODM1OSwianRpIjoiMDE5YmI1MDEtZTkzNi03NzEyLTk3ODAtNGE2ZDdhZjhkYmNlIiwidG9rZW5fdHlwZSI6InJlZnJlc2gifQ.jsLC9THTGJCaMteqBeuieyYyJLjuQalLi6ign6li9mw"
  }
}
```


### RESPONSE: 200 OK
```json
{
  "status": "success",
  "code": "TOKEN_REFRESHED",
  "message": "Token refreshed successfully",
  "data": {
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIwMTliYjUwMS05ZjM5LTcxZDEtYjY5Yi1hNDJiNmUyOGM0OTUiLCJzaWQiOiIwMTliYjUwMS1lOTM2LTc3MTItOTc4MC00YTcwMjM5OTFkMzMiLCJleHAiOjE3NjgyNjkyNjEsImlhdCI6MTc2ODI2ODM2MSwianRpIjoiMDE5YmI1MDEtZWZlZS03MzAwLTk0OGQtODgxMTgzYTkzY2I3In0.7ymC6WKNUjwet91hFFwrh3BMB_Fp6tavofXPx-QhJBg",
    "refresh_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIwMTliYjUwMS05ZjM5LTcxZDEtYjY5Yi1hNDJiNmUyOGM0OTUiLCJleHAiOjE3Njg4NzMxNjEsImlhdCI6MTc2ODI2ODM2MSwianRpIjoiMDE5YmI1MDEtZWZlZi03NWIwLThhNmMtODUxYzkzYjFhZDM3IiwidG9rZW5fdHlwZSI6InJlZnJlc2gifQ.pPDOQqt8uywDH9iYuJB7Ims0mN7mmWq6x7Avq0HWInY",
    "type_": "Bearer"
  }
}
```

- **SUCCESS**: Token refreshed successfully

## 2FA Flow

   DEBUG: Current Client Email: test708@example.com
[GET] /auth/profile

### REQUEST: GET http://localhost:3000/api/auth/profile
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
  "code": "PROFILE_FETCHED",
  "message": "Success",
  "data": {
    "id": "019bb501-9f39-71d1-b69b-a42b6e28c495",
    "username": "testuser708",
    "email": "test708@example.com",
    "avatar_url": null,
    "two_factor_enabled": false,
    "roles": [
      {
        "id": "019bb197-2326-7a83-aa9d-bc3c4fe12c9b",
        "name": "user"
      }
    ],
    "connected_accounts": []
  }
}
```

   DEBUG: Server Profile Email: test708@example.com
[POST] /auth/2fa/setup

### REQUEST: POST http://localhost:3000/api/auth/2fa/setup
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
  "code": "2FA_SETUP_READY",
  "message": "Scan this QR code",
  "data": {
    "secret": "X62KAERO5P3KZIGMFPYX7R2QCJKDUNOU",
    "qr_code_url": "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",
    "backup_codes": []
  }
}
```

- **SUCCESS**: 2FA Secret received

📷 SCAN THIS QR CODE (OR COPY SECRET) 📷
Secret: X62KAERO5P3KZIGMFPYX7R2QCJKDUNOU
   Attempting to display QR Code in terminal...
Backup Codes: []
[POST] /auth/2fa/confirm

### REQUEST: POST http://localhost:3000/api/auth/2fa/confirm
```json
{
  "headers": {
    "Content-Type": "application/json",
    "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIwMTliYjUwMS05ZjM5LTcxZDEtYjY5Yi1hNDJiNmUyOGM0OTUiLCJzaWQiOiIwMTliYjUwMS1lOTM2LTc3MTItOTc4MC00YTcwMjM5OTFkMzMiLCJleHAiOjE3NjgyNjkyNjEsImlhdCI6MTc2ODI2ODM2MSwianRpIjoiMDE5YmI1MDEtZWZlZS03MzAwLTk0OGQtODgxMTgzYTkzY2I3In0.7ymC6WKNUjwet91hFFwrh3BMB_Fp6tavofXPx-QhJBg"
  },
  "body": {
    "secret": "X62KAERO5P3KZIGMFPYX7R2QCJKDUNOU",
    "code": "000000"
  }
}
```


### RESPONSE: 400 Bad Request
```json
{
  "status": "error",
  "code": "INVALID_CODE",
  "message": "Invalid verification code"
}
```

- **SUCCESS**: [Negative Case] Confirm 2FA with wrong code - Caught INVALID_CODE (400)
> **WARNING**: MANUAL ACTION REQUIRED ⚠️
Please add the secret to your Authenticator App.
[POST] /auth/2fa/confirm

### REQUEST: POST http://localhost:3000/api/auth/2fa/confirm
```json
{
  "headers": {
    "Content-Type": "application/json",
    "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIwMTliYjUwMS05ZjM5LTcxZDEtYjY5Yi1hNDJiNmUyOGM0OTUiLCJzaWQiOiIwMTliYjUwMS1lOTM2LTc3MTItOTc4MC00YTcwMjM5OTFkMzMiLCJleHAiOjE3NjgyNjkyNjEsImlhdCI6MTc2ODI2ODM2MSwianRpIjoiMDE5YmI1MDEtZWZlZS03MzAwLTk0OGQtODgxMTgzYTkzY2I3In0.7ymC6WKNUjwet91hFFwrh3BMB_Fp6tavofXPx-QhJBg"
  },
  "body": {
    "secret": "X62KAERO5P3KZIGMFPYX7R2QCJKDUNOU",
    "code": "147776"
  }
}
```


### RESPONSE: 200 OK
```json
{
  "status": "success",
  "code": "2FA_ENABLED",
  "message": "Two-factor authentication enabled. Backup codes generated.",
  "data": {
    "backup_codes": [
      "lvMJc5ZoWC",
      "kgefp4kGev",
      "otJfKgZr74",
      "hrzmIvBr5y",
      "7alkumtc5J",
      "3yVVe2dpBY",
      "qQdigyROcM",
      "eGfBoWkctR",
      "XwzY485uQ1",
      "OgkE95a5TO"
    ]
  }
}
```

- **SUCCESS**: 2FA Enabled successfully
   Testing 2FA Login Challenge (Negative)...
[POST] /auth/login

### REQUEST: POST http://localhost:3000/api/auth/login
```json
{
  "headers": {
    "Content-Type": "application/json",
    "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIwMTliYjUwMS05ZjM5LTcxZDEtYjY5Yi1hNDJiNmUyOGM0OTUiLCJzaWQiOiIwMTliYjUwMS1lOTM2LTc3MTItOTc4MC00YTcwMjM5OTFkMzMiLCJleHAiOjE3NjgyNjkyNjEsImlhdCI6MTc2ODI2ODM2MSwianRpIjoiMDE5YmI1MDEtZWZlZS03MzAwLTk0OGQtODgxMTgzYTkzY2I3In0.7ymC6WKNUjwet91hFFwrh3BMB_Fp6tavofXPx-QhJBg"
  },
  "body": {
    "login_id": "test708@example.com",
    "password": "password123"
  }
}
```


### RESPONSE: 202 Accepted
```json
{
  "status": "error",
  "code": "TWO_FACTOR_REQUIRED",
  "message": "Two-factor authentication is required",
  "data": {
    "temp_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIwMTliYjUwMS05ZjM5LTcxZDEtYjY5Yi1hNDJiNmUyOGM0OTUiLCJleHAiOjE3NjgyNjg3MDEsImlhdCI6MTc2ODI2ODQwMSwianRpIjoiMDE5YmI1MDItOGI0Ni03NTUzLWFhMzgtZWIyYWEwOTE0NGRkIiwidG9rZW5fdHlwZSI6IjJmYV90ZW1wIn0.WtgTsajJ1Z5IK4kMuhc56fYf2-PFZlbb1B7V6D8wyjs"
  }
}
```

[POST] /auth/2fa/verify-login

### REQUEST: POST http://localhost:3000/api/auth/2fa/verify-login
```json
{
  "headers": {
    "Content-Type": "application/json",
    "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIwMTliYjUwMS05ZjM5LTcxZDEtYjY5Yi1hNDJiNmUyOGM0OTUiLCJzaWQiOiIwMTliYjUwMS1lOTM2LTc3MTItOTc4MC00YTcwMjM5OTFkMzMiLCJleHAiOjE3NjgyNjkyNjEsImlhdCI6MTc2ODI2ODM2MSwianRpIjoiMDE5YmI1MDEtZWZlZS03MzAwLTk0OGQtODgxMTgzYTkzY2I3In0.7ymC6WKNUjwet91hFFwrh3BMB_Fp6tavofXPx-QhJBg"
  },
  "body": {
    "temp_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIwMTliYjUwMS05ZjM5LTcxZDEtYjY5Yi1hNDJiNmUyOGM0OTUiLCJleHAiOjE3NjgyNjg3MDEsImlhdCI6MTc2ODI2ODQwMSwianRpIjoiMDE5YmI1MDItOGI0Ni03NTUzLWFhMzgtZWIyYWEwOTE0NGRkIiwidG9rZW5fdHlwZSI6IjJmYV90ZW1wIn0.WtgTsajJ1Z5IK4kMuhc56fYf2-PFZlbb1B7V6D8wyjs",
    "code": "000000"
  }
}
```


### RESPONSE: 400 Bad Request
```json
{
  "status": "error",
  "code": "INVALID_CODE",
  "message": "Invalid MFA code"
}
```

- **FAILED**: [Negative Case] 2FA Login with wrong code - Failed. Got 400 / INVALID_CODE, Expected 401 / INVALID_TOKEN
   Testing 2FA Login Challenge (Positive - TOTP)...
[POST] /auth/login

### REQUEST: POST http://localhost:3000/api/auth/login
```json
{
  "headers": {
    "Content-Type": "application/json",
    "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIwMTliYjUwMS05ZjM5LTcxZDEtYjY5Yi1hNDJiNmUyOGM0OTUiLCJzaWQiOiIwMTliYjUwMS1lOTM2LTc3MTItOTc4MC00YTcwMjM5OTFkMzMiLCJleHAiOjE3NjgyNjkyNjEsImlhdCI6MTc2ODI2ODM2MSwianRpIjoiMDE5YmI1MDEtZWZlZS03MzAwLTk0OGQtODgxMTgzYTkzY2I3In0.7ymC6WKNUjwet91hFFwrh3BMB_Fp6tavofXPx-QhJBg"
  },
  "body": {
    "login_id": "test708@example.com",
    "password": "password123"
  }
}
```


### RESPONSE: 202 Accepted
```json
{
  "status": "error",
  "code": "TWO_FACTOR_REQUIRED",
  "message": "Two-factor authentication is required",
  "data": {
    "temp_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIwMTliYjUwMS05ZjM5LTcxZDEtYjY5Yi1hNDJiNmUyOGM0OTUiLCJleHAiOjE3NjgyNjg3MDksImlhdCI6MTc2ODI2ODQwOSwianRpIjoiMDE5YmI1MDItYThiOS03MDYzLWE1MzctYzc2MjliY2NiM2VjIiwidG9rZW5fdHlwZSI6IjJmYV90ZW1wIn0.CzKbBc6Vy6nQYGyueuMDu99u4N55zPlYuXiygJCAXX0"
  }
}
```

[POST] /auth/2fa/verify-login

### REQUEST: POST http://localhost:3000/api/auth/2fa/verify-login
```json
{
  "headers": {
    "Content-Type": "application/json",
    "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIwMTliYjUwMS05ZjM5LTcxZDEtYjY5Yi1hNDJiNmUyOGM0OTUiLCJzaWQiOiIwMTliYjUwMS1lOTM2LTc3MTItOTc4MC00YTcwMjM5OTFkMzMiLCJleHAiOjE3NjgyNjkyNjEsImlhdCI6MTc2ODI2ODM2MSwianRpIjoiMDE5YmI1MDEtZWZlZS03MzAwLTk0OGQtODgxMTgzYTkzY2I3In0.7ymC6WKNUjwet91hFFwrh3BMB_Fp6tavofXPx-QhJBg"
  },
  "body": {
    "temp_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIwMTliYjUwMS05ZjM5LTcxZDEtYjY5Yi1hNDJiNmUyOGM0OTUiLCJleHAiOjE3NjgyNjg3MDksImlhdCI6MTc2ODI2ODQwOSwianRpIjoiMDE5YmI1MDItYThiOS03MDYzLWE1MzctYzc2MjliY2NiM2VjIiwidG9rZW5fdHlwZSI6IjJmYV90ZW1wIn0.CzKbBc6Vy6nQYGyueuMDu99u4N55zPlYuXiygJCAXX0",
    "code": "534130"
  }
}
```


### RESPONSE: 400 Bad Request
```json
{
  "status": "error",
  "code": "INVALID_CODE",
  "message": "Invalid MFA code"
}
```

- **FAILED**: 2FA Login Failed: {"status":"error","code":"INVALID_CODE","message":"Invalid MFA code"}
   ⏩ [SKIPPED] No backup codes available for testing
   Testing Disable 2FA...
[POST] /auth/2fa/disable

### REQUEST: POST http://localhost:3000/api/auth/2fa/disable
```json
{
  "headers": {
    "Content-Type": "application/json",
    "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIwMTliYjUwMS05ZjM5LTcxZDEtYjY5Yi1hNDJiNmUyOGM0OTUiLCJzaWQiOiIwMTliYjUwMS1lOTM2LTc3MTItOTc4MC00YTcwMjM5OTFkMzMiLCJleHAiOjE3NjgyNjkyNjEsImlhdCI6MTc2ODI2ODM2MSwianRpIjoiMDE5YmI1MDEtZWZlZS03MzAwLTk0OGQtODgxMTgzYTkzY2I3In0.7ymC6WKNUjwet91hFFwrh3BMB_Fp6tavofXPx-QhJBg"
  },
  "body": {
    "password": "password123"
  }
}
```


### RESPONSE: 200 OK
```json
{
  "status": "success",
  "code": "2FA_DISABLED",
  "message": "Two-factor authentication disabled",
  "data": null
}
```

- **SUCCESS**: 2FA Disabled successfully

## Logout Flow

[POST] /auth/logout

### REQUEST: POST http://localhost:3000/api/auth/logout
```json
{
  "headers": {
    "Content-Type": "application/json",
    "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIwMTliYjUwMS05ZjM5LTcxZDEtYjY5Yi1hNDJiNmUyOGM0OTUiLCJzaWQiOiIwMTliYjUwMS1lOTM2LTc3MTItOTc4MC00YTcwMjM5OTFkMzMiLCJleHAiOjE3NjgyNjkyNjEsImlhdCI6MTc2ODI2ODM2MSwianRpIjoiMDE5YmI1MDEtZWZlZS03MzAwLTk0OGQtODgxMTgzYTkzY2I3In0.7ymC6WKNUjwet91hFFwrh3BMB_Fp6tavofXPx-QhJBg"
  },
  "body": {
    "refresh_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIwMTliYjUwMS05ZjM5LTcxZDEtYjY5Yi1hNDJiNmUyOGM0OTUiLCJleHAiOjE3Njg4NzMxNjEsImlhdCI6MTc2ODI2ODM2MSwianRpIjoiMDE5YmI1MDEtZWZlZi03NWIwLThhNmMtODUxYzkzYjFhZDM3IiwidG9rZW5fdHlwZSI6InJlZnJlc2gifQ.pPDOQqt8uywDH9iYuJB7Ims0mN7mmWq6x7Avq0HWInY"
  }
}
```


### RESPONSE: 200 OK
```json
{
  "status": "success",
  "code": "LOGOUT_SUCCESS",
  "message": "Successfully logged out",
  "data": null
}
```

- **SUCCESS**: Logout successful
[GET] /auth/profile

### REQUEST: GET http://localhost:3000/api/auth/profile
```json
{
  "headers": {
    "Content-Type": "application/json"
  },
  "body": null
}
```


### RESPONSE: 401 Unauthorized
```json
{
  "status": "error",
  "code": "AUTH_MISSING",
  "message": "Authorization header is missing"
}
```

- **SUCCESS**: Old token is invalid after logout
