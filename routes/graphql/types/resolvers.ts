import { gql } from 'apollo-server-express';

const queries = gql`
  type Query {
    user(input: UserInput!): User!
    blockApp(input: BlockAppInput!): BlockApp!
  }
`;

const mutations = gql`
  type Mutation {
    addUser: User
  }
`;

export { queries, mutations };
