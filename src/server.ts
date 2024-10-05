import express, { Request, Response } from "express";
import swaggerOptions from "swagger-ui-express";
import { Option } from "./config/swagger.js";

import { routerUsers } from "./routes/User.js";
import { routerPost } from "./routes/Post.js";
import swaggerjson from "./swager.json" assert { type: "json" };

const app = express();
app.use(express.json());
const port = 8000;

app.use("/user", routerUsers);
app.use("/api-docs", swaggerOptions.serve, swaggerOptions.setup(swaggerjson));
app.use("/", routerPost);

app.listen(port, () => {
  console.log(`now  listening on port ${port}`);
});
