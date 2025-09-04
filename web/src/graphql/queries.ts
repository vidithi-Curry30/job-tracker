// src/graphql/queries.js
import { gql } from "@apollo/client";

export const GET_APPLICATIONS = gql`
  query GetApplications {
    applications {
      id
      company
      role
      currentStatus
    }
  }
`;