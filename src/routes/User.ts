import express from "express";
import { User } from "../controllers/User.js";
export const routerUsers = express.Router();

const { CreateUser, DeleteUser, UpdtadeUser, ShowUser } = new User();
routerUsers.get("/showUser", ShowUser);
routerUsers.post("/CreateUser", CreateUser);
routerUsers.delete("/delete/:id", DeleteUser);
routerUsers.patch("/atualizar", UpdtadeUser);
