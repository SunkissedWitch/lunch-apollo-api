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

**POST** `/orders/create`

```
{
  order: String,
  price: Float,
}
```

**GET** `/orders`
*Get all orders*

**GET** `/orders/users`
*Get all users with grouped by orders*

**GET** `/orders/users/:userId`
*Get all orders by one user*

**GET** `/polls?date=YYYY-MM-DD` 
*Get all polls by date or today polls by default, if queries is not provided*

**GET** `/polls/:pollId`
*Get unique poll by id*

**POST** `/polls/:pollId/answer`
```
{
  answer: Int | String (restaurantId)
}
```
*Creates or updates user's answer with restaurantId for poll*

*Headers*:
  ```Authorization: Bearer <token>```