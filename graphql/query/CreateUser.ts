import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  query createUser {
    createUser(currency: "USD") {
      currency
      rate
    }
  }
`;