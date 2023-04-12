# Getting Started

1. Install dependencies: `yarn`
2. Creatae own `.env` file from `.env.example` and fill the variables
3. Run Prisma Migrate: `yarn run prisma migrate`
4. Run API in dev mode with auto-reload: `yarn start:dev`
5. Run Prisma Studio for browsing DB: `yarn prisma:studio`

# API Endpoints:

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