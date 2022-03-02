import { gql } from "@apollo/client";

export const GET_ANIMATIONS = gql`
  query getAnimations {
    getAnimations {
      id
      userId{
      name
      }
      title
      path
      tagId{
      id
      name
      }
    }
  }
`;