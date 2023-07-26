import { PrismaClient } from "@prisma/client";
import _ from "lodash";

const prisma = new PrismaClient();
// console.log('prisma', prisma.$connect)
export const resolvers = {
  Query: {
    users: () => users,
    // authors: () => authors
  },
};


    const users = await prisma.user.findMany({
      select: {
        email: true,
        username: true,
        _count: {
          select: { orders: true },
        }
      },
    });

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