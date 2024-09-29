import express from "express";
import { Post } from "../controllers/Poster.js";
export const routerPost = express.Router();
const { CreatePost, DeletePost } = new Post();

routerPost.post("/CreatePost/:id", CreatePost);
routerPost.delete("/deletePost", DeletePost);
