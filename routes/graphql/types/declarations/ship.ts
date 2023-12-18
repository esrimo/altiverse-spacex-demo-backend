import { gql } from 'graphql-tag';

export const Ship = gql`
  type Ship {
    id: ID!
    name: String
    class: String
    image: String
    active: Boolean!
  }

  input ShipsInput {
    pagination: PaginationInput
  }
`;
