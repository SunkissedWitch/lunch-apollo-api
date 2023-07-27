import jwt from 'jsonwebtoken'
import { GraphQLError } from 'graphql';

export const getUser = (bearerToken) => {
  try {
    const [, token] = bearerToken.split(" ");
    const jwtKey = process.env.JWT_KEY
    const user = jwt.verify(token, jwtKey);
  
    if (!user) {
      return false
    }
  
    return user;

  } catch (error) {
    throw new GraphQLError('Invalid token', {
      extensions: {
        code: 'Unauthorized',
        http: { status: 403 },
      },
    });
  }
};