import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
export const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  type User {
    id: Int
    email: String
    username: String
    password: String
    orders: [Order]
    answers: [Answer]
  }

  type Order {
    id: Int
    createdAt: DateTime
    text: String
    price: Float
    userId: Int
    user: User
  }

  type Answer {
    id: Int
    pollId: Int
    poll: Poll
    userId: Int
    user: User
    restaurantId: Int
    restaurant: Restaurant
  }

  type Restaurant {
    id: Int
    name: String
    polls: [Poll]
    answers: [Answer]
  }

  type Poll {
    id: Int
    dateStart: DateTime
    dueDate: DateTime
    available_restaurants: [Restaurant]
    winner: Int
    answers: [Answer]
    isClosed: Boolean
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    allUsers: [User]
    orders: [Order]
    usersWithOrders: [User]
  }
  scalar DateTime
`;