import { gql } from "@apollo/client";

export const GET_ANIMATIONS_BY_USER = gql`
  query getAnimationsByUser($id:ID!) {
    getAnimationsByUser(id:$id) {
        id
      user{
      name
      }
      title
      path
      description
      TagOnAnimation{
      tag{
      id
      name
      }
      }
      }
  }
`;