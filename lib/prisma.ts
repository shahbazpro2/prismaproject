import { PrismaClient } from "@prisma/client";



let prisma: PrismaClient;
let globalVar: any = global

if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient()
} else {
    if (!globalVar.prisma) {
        globalVar.prisma = new PrismaClient()
    }
    prisma = globalVar.prisma
}

export default prisma