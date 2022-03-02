import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const resolvers = {
    Query: {
        getUsers: async () => await prisma.user.findMany(),
        getUser: async (_: any, args: { name: string }) => await prisma.user.findFirst({
            where: { name: args.name }
        }),
        getTags: async () => await prisma.tag.findMany()
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