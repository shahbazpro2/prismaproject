import prisma from "../../../lib/prisma";

export const resolvers = {
    Query: {
        getUsers: async () => await prisma.user.findMany(),
        getUser: async (_: any, args: { name: string }) => await prisma.user.findFirst({
            where: { name: args.name }
        })
    },
    Mutation: {
        createUser: async (_: any, args: { name: string, email: string }) => await prisma.user.create({ data: { name: args.name, email: args.email } })
    }
}