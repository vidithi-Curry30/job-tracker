import { gql } from "@apollo/client";

export const CREATE_APPLICATION = gql`
  mutation ($input: ApplicationInput!) {
    createApplication(input: $input) {
      id
      company
      role
      currentStatus
    }
  }
`;