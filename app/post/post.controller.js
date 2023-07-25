import PostService from "./post.service.js";
import { Router } from "express";

const postRouter = Router();
const postService = new PostService();

postRouter.post("/post", async (req, res) => {
  const { title, content, user_id } = req.body;
  try {
    const newPost = await postService.create(title, content, user_id);
    console.log("newPost: ", newPost);
    res.status(201).json(newPost);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

postRouter.get("/post", async (req, res) => {
  const listPosts = await postService.findAll();
  console.log("listPosts: ", listPosts);
  res.status(200).json(listPosts);
});

postRouter.delete("/post/:id", async (req, res) => {
  const { id } = req.params;
  console.log(`delete post id: ${id}`);
  try {
    const postDeleted = await postService.delete(+id); // + converts to integer
    res.status(201).json(postDeleted);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

postRouter.patch("/post/:id", async (req, res) => {
  const { id } = req.params;
  console.log(`update post id: ${id}`);
  try {
    const postUpdated = await postService.update(+id, req.body);
    res.status(201).json(postUpdated);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

postRouter.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  console.log(`find post id: ${id}`);
  try {
    const postFound = await postService.findById(+id);
    res.status(201).json(postFound);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

postRouter.get("/post/:user_id", async (req, res) => {
  const { user_id } = req.params;
  console.log(`find posts from user id: ${user_id}`);
  try {
    const postsFound = await postService.findByUserId(+user_id);
    res.status(201).json(postsFound);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

export default postRouter;
