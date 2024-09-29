import express from "express";
import { User } from "../controllers/User.js";

interface Db {
  id: number;
  name: string;
  email: string;
}
type arrayObj = [Db];

const Db: arrayObj = [{ name: "lucas", id: 10, email: "lucasssilva" }]; //banco de dados em memória

const isDb = (value: unknown): value is Db => {
  //funcção de typguard
  console.log(value);
  if (
    value &&
    typeof value === "object" &&
    "id" in value &&
    "name" in value &&
    "email" in value
  ) {
    return true;
  } else {
    return false;
  }
};

export const routerUsers = express.Router();

routerUsers.get("/showUsers", (req, response) => {
  const value = req.body;
  if (isDb(value)) {
    const { id, email, name } = req.body;
    if (
      Db.find((valuedb) => {
        return valuedb.email === email;
      })
    ) {
      response.send("ola seja muito bem vindo " + value.name);
      return;
    } else {
      response.send("usuário não enconntrando");
      return;
    }
  } else {
    response.send("formato não compátivel");
  }
});
