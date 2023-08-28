import jwtGuard from "../auth/guards/jwt.guard.js";
import CommentService from "./comment.service.js";
import UserService from "../user/user.service.js";
import { Router } from "express";

const commentRouter = Router();
const commentService = new CommentService();
const userService = new UserService();

// restrição: que o usuário crie apenas seus próprios comments
commentRouter.post("/comment", jwtGuard, async (req, res) => {
  const { content_comments, post_id } = req.body;
  console.log("'req.user': ", req.user);
  const currUserId = req.user.id;
  try {
    const newComment = await commentService.create(
      content_comments,
      currUserId,
      post_id
    );
    console.log("newComment: ", newComment);
    res.status(201).json(newComment);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

commentRouter.get("/comment", async (req, res) => {
  const listComments = await commentService.findAll();
  console.log("listComments: ", listComments);
  res.status(200).json(listComments);
  return listComments;
});

// TODO: // usuario pode editar comentário se for o dono do comentário ou se for admin
commentRouter.patch("/comment/:comment_id", jwtGuard, async (req, res) => {
  console.log("req.params: ", req.params);
  const id = + req.params.comment_id; // == const { comment_id } = req.params ???
  console.log(`atualizar comentário id: ${+id}`);
  const user = req.user; /// usuario logado
  console.log("req.user: ", req.user);
  const commentAuthorId = await commentService.findUserIdbyCommentId(id)  /// dono do comentário
  console.log("commentAuthor: ", commentAuthorId);
  if (user.id !== + commentAuthorId.user_id)
    if (!user.admin)
      return res
        .status(403)
        .json({
          message: "Você não tem permissão para editar esse comentário!",
        });

  
  try {
    const commentUpdated = await commentService.update(+id, req.body);
    res.status(201).json(commentUpdated);
    return commentUpdated;
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// TODO: // usuario pode deletar comentário se for o dono do comentário ou se for admin, ou se for o dono do post
commentRouter.delete("/comment/:id", jwtGuard, async (req, res) => {
  console.log("req.params: ", req.params);
  const post = await commentService.findPostIdbyCommentId(+req.params.id); /// usuario logado
  console.log("post: ", post);
  console.log("req.user: ", req.user);
  const user = (req.user); /// usuario logado

  //console.log("post: ", post);
  if (user.id !== +req.params.id)
    if (!user.admin)
      return res
        .status(403)
        .json({
          message: "Você não tem permissão para deletar esse comentário!",
        });

  const { id } = req.params;
  console.log(`deletar comentário id: ${id}`);
  try {
    const commentDeleted = await commentService.delete(+id); // o + converte para number
    res.status(201).json({commentDeleted}); 
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

commentRouter.get("/comment/:post_id", async (req, res) => {
  const { post_id } = req.params;
  const listComments = await commentService.findByPostId(+post_id);
  console.log("listComments: ", listComments);
  res.status(200).json(listComments);
  return listComments;
});

export default commentRouter;
