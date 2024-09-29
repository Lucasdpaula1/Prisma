import express, { Request, Response } from "express";
import { routerUsers } from "./routes/User.js";
const app = express();
app.use(express.json());
const port = 8000;
app.get("/", (req: Request, res) => {
  res.send("HIIIIIIIIIIIIII");
});
app.use("/", routerUsers);

app.listen(port, () => {
  console.log(`now  listening on port ${port}`);
});
