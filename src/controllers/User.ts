import { NextFunction, Request, response, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { CreateUserType } from "../core/GuardUser.js";

import bcrypt from "bcrypt";

import { PoolPrisma } from "../connection/Poolconnect.js";
import { throwDeprecation } from "process";

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
          res.status(200).send("usuário cadastrado com sucesso");
        } else {
          throw new Error("usuário ja possui cadastro no sistema");
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
    console.log(id);
    const user = await prisma.user.findFirst({ where: { id } });
    console.log(user);
    try {
      if (user) {
        console.log(id);
        await prisma.post.deleteMany({ where: { userId: id } });
        await prisma.user.delete({ where: { id } });

        res.status(200).send("usuário deletado com sucesso");
        return;
      } else {
        throw new Error("usuário não encontrado");
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(404).json(error.message);
        return;
      }
      res.status(500).json("erro interno de servidor");
    }
  }
  async UpdtadeUser(req: Request, res: Response) {}
  /**
   * @swagger
   * /user/showUser:
   *  get:
   *    summary: listagem de todos os usuários
   *    description: objetivo lista usuáriios
   *    tags: [USERS]
   *    parameters:
   *      - in: query
   *        name: posts
   *        description: busca todos os posts relacionados do usuário
   *        schema:
   *          type: boolean
   *          description: posts relacionados, true or false se quiser o post
   *    requestBody:
   *      content:
   *        application/json:
   *           schema:
   *              type: object
   *              properties:
   *                 name:
   *                   type: string
   *              examples:
   *               name: lucas
   *
   *
   *
   *
   *    responses:
   *        200:
   *         description: all users
   *         content:
   *            application/json:
   *               schema:
   *                  example:
   *                     User:
   *                       value:
   *                         name: lucas
   *                         email: lucas@
   *                         password: 1234
   *
   *                  type: object
   *                  properties:
   *                        name:
   *                          type: string
   *                        email:
   *                          type: string
   *                        password:
   *                          type: integer
   *
   *
   *
   *
   *
   */
  async ShowUser(req: Request, res: Response) {
    try {
      const { posts } = req.query;

      console.log(posts);
      if (posts === "true") {
        const allUsersWithPosts = await prisma.user.findMany({
          include: { post: { select: { text: true, description: true } } },
        });

        res.status(200).json(allUsersWithPosts);
        return;
      }

      const allUsers = await prisma.user.findMany();
      res.status(200).json(allUsers);
    } catch (error) {
      res.status(500).json("erro interno do servidor");
    }
  }
  async Login(req: Request, res: Response) {
    const prisma = PoolPrisma.getInstance();
  }
  async auth(req: Request, res: Response) {}
}
