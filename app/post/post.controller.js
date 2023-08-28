import PostService from "./post.service.js";
import { Router } from "express";
import jwtGuard from "../auth/guards/jwt.guard.js";
import UserService from "../user/user.service.js";

const postRouter = Router();
const postService = new PostService();
const userService = new UserService();

postRouter.post("/post", jwtGuard, async (req, res) => {
  const user_id = req.user.id;
  const { title, content } = req.body;
  try {
    const newPost = await postService.create(title, content, user_id);
    console.log("newPost: ", newPost);
    return res.status(201).json(newPost);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

postRouter.get("/post", async (req, res) => {
  const listPosts = await postService.findAll();
  console.log("listPosts: ", listPosts);
  res.status(200).json(listPosts);
});

postRouter.patch("/post/:post_id", jwtGuard, async (req, res) => {
  const { post_id } = req.params;
  console.log(`update post id: ${post_id}`);
  const {id} = req.user;
  const {user_id} = await postService.findByPostId(+post_id);
  if (id !== user_id) // user_id do post
    return res
      .status(403)
      .json({ message: "Você não tem permissão para editar esse post!" });

    try {
    const postUpdated = await postService.update(+post_id, req.body);
    return res.status(201).json(postUpdated);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

//  posts podem ser deletados apenas por seus próprios autores ou pelo ADMIN
postRouter.delete("/post/:id", jwtGuard, async (req, res) => {
  const user = req.user; /// usuario logado
  if (user.id !== +req.params.user_id && !user.admin)
    return res
      .status(403)
      .json({ message: "Você não tem permissão para deletar esse post!!" });

  const { id } = req.params;
  console.log(`delete post id: ${id}`);
  try {
    const postDeleted = await postService.delete(+id); // + converts to integer
    return res.status(201).json(postDeleted);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

postRouter.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  console.log(`find post id: ${id}`);
  try {
    const postFound = await postService.findByPostId(+id);
    console.log("postsFound: ", postFound);
    return res.status(201).json(postFound);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

// list last 10 user posts by user (:id) route
postRouter.get("/postsByUserId/:user_id", async (req, res) => {
  const { user_id } = req.params;
  console.log(`find posts from user id: ${user_id}`);
  try {
    var postsFound;
    postsFound = await postService.retrieveByUserId(+user_id);
    return res.status(201).json(postsFound);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

export default postRouter;
