import express, { Request, Response } from "express";
import { routerUsers } from "./routes/User.js";
import { routerPost } from "./routes/Post.js";
import { networkInterfaces } from "os";

const app = express();
app.use(express.json());
const port = 8000;

app.use("/", routerUsers);
app.use("/", routerPost, () => {
  console.log("ola mundo");
});
app.listen(port, () => {
  console.log(`now  listening on port ${port}`);
});
