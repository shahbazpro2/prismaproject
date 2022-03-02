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

    type Tags{
        id:ID,
        name:String
    }

    type  Query {
        getTags: [Tags]
    }

    type Animation{
        id:ID,
        userId: Int, 
        user:User,
        title: String!,
        description:String!,
        path:String!,
        tagId:Int,
        tag:Tags
    }


    type  Query {
        getAnimations: [Animation]
        getAnimationsByTag(name: String!): [Animation]
    }

    type Mutation{
        createAnimation(userId: Int!, title: String!,description:String!,path:String!,tagId:Int!):Animation
    }
    
    `