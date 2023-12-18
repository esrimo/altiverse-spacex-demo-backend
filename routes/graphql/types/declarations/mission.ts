import { gql } from 'graphql-tag';

export const Mission = gql`
  type Mission {
    id: ID!
    shipId: ID!
    name: String!
    destination: String!
    cargo: String!
    active: Boolean!
  }

  input MissionsInput {
    shipId: ID!
  }
`;