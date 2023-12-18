import { User } from './user';
import { BlockApp } from './blockApp';
import { Ship } from './ship';
import { Mission } from './mission';

const resolvers = {
  Query: {
    ...User.query,
    ...BlockApp.query,
    ...Ship.query,
    ...Mission.query,
  },
  Mutation: {
    ...User.mutation,
    ...BlockApp.mutation,
    ...Ship.mutation,
    ...Mission.mutation,
  },
};

export { resolvers };
