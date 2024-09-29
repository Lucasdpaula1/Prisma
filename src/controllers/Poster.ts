import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { throwDeprecation } from "process";
import { error } from "console";

const prisma = new PrismaClient();

export class Post {
  async CreatePost(request: Request, response: Response) {
    try {
      const { title, description } = request.body;
      const id = Number(request.params.id);
      console.log(id);
      const user = await prisma.user.findUnique({ where: { id } });
      console.log(user);
      if (!user) {
        throw new Error("não foi possivel criar um post, pois não tem usuário");
      }
      await prisma.post.create({
        data: {
          userId: user.id,
          text: title,
          description,
        },
      });

      response.send("post criado com sucesso");
    } catch (error) {
      if (error instanceof Error) {
        response.send(error.message);
        return;
      }
      response.send(error);
    }
  }
  async DeletePost(request: Request, response: Response) {
    try {
      const { text, id } = request.query;
      const idNumber = Number(id);
      if (typeof text === "string" && typeof idNumber === "number") {
        const post = await prisma.post.findFirst({
          where: { userId: idNumber, AND: { text } },
        });
        if (post) {
          await prisma.post.delete({ where: { id: post.id } });
          response.json("post deletado com sucesso");
          return;
        } else {
          throw new Error("post não existente");
        }
      } else {
        throw new Error("formato não compátivel");
      }
    } catch (error) {
      if (error instanceof Error) {
        response.json(error.message);
      }
    }
  }
}
