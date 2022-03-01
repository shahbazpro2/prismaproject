import { Prisma } from "@prisma/client";
import prisma from "../../../lib/prisma";

export const resolvers = {
    Query: {
        getUsers: async () => await prisma.user.findMany(),
        getUser: async (_: any, args: { name: string }) => await prisma.user.findFirst({
            where: { name: args.name }
        })
    },
    Mutation: {
        createUser: async (_: any, args: { name: string, email: string }) => {
            try {
                const res = await prisma.user.create({ data: { name: args.name, email: args.email } })
                if (res) return res
                console.log(res)
            } catch (error) {
                if (error instanceof Prisma.PrismaClientKnownRequestError) {
                    // The .code property can be accessed in a type-safe manner
                    if (error.code === 'P2002') {
                        throw 'User already exist with this email'

                    }
                }
                throw error
            }
        }
    }
}