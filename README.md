API Endpoints:

**POST** `/users/create`
```
{
  password: String,
  email: String,
  username: String,
}
```

**POST** `/users/login`
```
{
  email: String,
  password: String,
}
```

**GET** `/users`

*Headers*:
  ```Authorization: Bearer <token>```