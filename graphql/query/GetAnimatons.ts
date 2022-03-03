import { gql } from "@apollo/client";

export const GET_ANIMATIONS = gql`
  query getAnimations {
    getAnimations {
      animation{
      id
      user{
      name
      }
      title
      path
      description
    }
      tag{
      id
      name
      }
    }
  }
`;