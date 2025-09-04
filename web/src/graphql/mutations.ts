// src/graphql/mutations.js
import { gql } from "@apollo/client";

export const CREATE_APPLICATION = gql`
  mutation CreateApplication($input: ApplicationInput!) {
    createApplication(input: $input) {
      id
      company
      role
      currentStatus
    }
  }
`;

export const UPDATE_APPLICATION_STATUS = gql`
  mutation UpdateStatus($id: Int!, $status: Status!) {
    updateApplicationStatus(id: $id, status: $status) {
      id
      currentStatus
    }
  }
`;

export const DELETE_APPLICATION = gql`
  mutation DeleteApplication($id: Int!) {
    deleteApplication(id: $id)
  }
`;