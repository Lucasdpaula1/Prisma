import { PrismaClient } from "@prisma/client";
export class PoolPrisma {
  private static prismaInstance: PrismaClient;
  private constructor() {}

  public static getInstance(): PrismaClient {
    if (!PoolPrisma.prismaInstance) {
      PoolPrisma.prismaInstance = new PrismaClient(); // gerando uma nova pool de conexão caso não exista
    }
    return PoolPrisma.prismaInstance;
  }
}
