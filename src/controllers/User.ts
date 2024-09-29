import { Request, response, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { CreateUserType } from "../core/GuardUser.js";
import { error } from "console";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export class User {
  async CreateUser(req: Request, res: Response) {
    try {
      if (CreateUserType(req.body)) {
        const user = await prisma.user.findFirst({
          where: { email: req.body.email },
        });
        if (!user) {
          const camadaSegurança = 10;
          const hashPassword = await bcrypt.hash(
            req.body.password,
            camadaSegurança
          );
          await prisma.user.create({
            data: {
              name: req.body.name,
              email: req.body.email,
              password: hashPassword,
            },
          });
          res.send("usuário cadastrado com sucesso");
        } else {
          throw new Error("usuário ja cadastrado");
        }
      } else {
        throw new Error("campos inválidos");
      }
    } catch (error) {
      if (error instanceof Error) {
        res.json(error.message);
      } else {
        res.json(error);
      }
    }
  }
  async DeleteUser(req: Request, res: Response) {
    let id = Number(req.params.id);
    try {
      await prisma.user.delete({ where: { id } });

      res.send("usuário deletado com sucesso");
    } catch (error) {
      res.send(error);
    }
  }
  async UpdtadeUser(req: Request, res: Response) {}
  async ShowUser(req: Request, res: Response) {
    try {
      console.log("ola meu viajante do mundo");
      const { posts } = req.query;
      console.log(posts);
      if (posts) {
        const [allUsersWithPosts] = await prisma.user.findMany({
          include: { post: { select: { text: true, description: true } } },
        });
        const { post } = allUsersWithPosts;

        res.json(allUsersWithPosts);
        return;
      }

      const [allUsers] = await prisma.user.findMany();
      res.json(allUsers);
    } catch (error) {
      res.json("sem usuário cadastrado");
    }
  }
}
