// src/database/prisma.ts
import { PrismaClient } from '@prisma/client';

// Adiciona o prisma ao objeto global para evitar múltiplas instâncias durante o desenvolvimento.
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
