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

export const UPDATE_STATUS = gql`
  mutation ($id: Int!, $status: Status!) {
    updateStatus(id: $id, status: $status) {
      id
      currentStatus
    }
  }
`;

export const DELETE_APPLICATION = gql`
  mutation ($id: Int!) {
    delete_application(id: $id)
  }
`;