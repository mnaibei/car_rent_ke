import { PrismaClient } from "../prisma/generated/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// We keep the initialization simple to avoid the constructor error
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
