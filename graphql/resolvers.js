import { PrismaClient } from "@prisma/client";
import _ from "lodash";
import { DateTimeResolver } from 'graphql-scalars';

const prisma = new PrismaClient();
// console.log('prisma', prisma.$connect)
export const resolvers = {
  Query: {
    allUsers: async (_parent, _args, contextValue) => {
      // In this case, we'll pretend there is no data when
      // we're not logged in. Another option would be to
      // throw an error.
      if (!contextValue.user) return null;
      // Todo: you can add here logic with user role

      const users = await prisma.user.findMany()
      return _.map(users, (user) => (_.omit(user, ['password'])))
    },
    usersWithOrders: async(_parent, _args, contextValue) => {
      const users = await prisma.user.findMany({
        select: {
          email: true,
          username: true,
          orders: true,
          // _count: {
          //   select: { orders: true },
          // }
        },
      })
      return users
    },
    orders: () => orders,
    
    // authors: () => authors
  },
  DateTime: DateTimeResolver,
};

  // const users = await prisma.user.findMany({
  //   select: {
  //     email: true,
  //     username: true,
  //     orders: true,
  //     // _count: {
  //     //   select: { orders: true },
  //     // }
  //   },
  // });
  // console.log('[users]', users)


  const orders = await prisma.order.findMany({
    include: {
      user: true
    }
  });
  // console.log('[orders]', orders)

    // const flattenedUsers = _.map(users, (user) => (user = {
    //   email: user.email,
    //   username: user.username,
    //   orders: user._count.orders
    // }))
    // // console.log('flatten', flatten)
    // return res.status(200).json(flattenedUsers);

// const authors = [
//   {
//     name: 'Kate Chopin',
//     books: [
//       {
//         title: 'The Awakening',
//         author: 'Kate Chopin',
//       }
//     ]
//   },
//   {
//     name: 'Paul Auster',
//     books: [
//       {
//         title: 'City of Glass',
//         author: 'Paul Auster',
//       }
//     ]
//   }
// ]

// const books = [
//   {
//     title: 'The Awakening',
//     author: authors[0],
//   },
//   {
//     title: 'City of Glass',
//     author: authors[1],
//   },
// ];