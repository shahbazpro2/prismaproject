import { gql } from "apollo-server-micro";

export const typeDefs = gql`
    type  User {
        id:ID,
        name: String,
        email:String
    }

    type  Query {
        getUsers: [User]
        getUser(name: String!): User
    }

    type Mutation {
    createUser(name: String!, email: String!): User
  }
    
    `