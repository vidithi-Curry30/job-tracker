import { gql } from "@apollo/client";

export const GET_APPLICATIONS = gql`
  query {
    applications {
      id
      company
      role
      currentStatus
    }
  }
`;