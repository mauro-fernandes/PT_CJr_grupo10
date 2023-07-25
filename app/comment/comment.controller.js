import CommentService from "./comment.service.js";
import { Router } from "express";

const commentRouter = Router();
const commentService = new CommentService();

commentRouter.post("/comment", async (req, res) => {
    const { content_comments, user_id, post_id } = req.body;
    try {
        const newComment = await commentService.create(content_comments, user_id, post_id);
        console.log("novoComment: ", newComment);
        res.status(201).json(newComment);
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
    });

commentRouter.get("/comment", async (req, res) => {
    const listComments = await commentService.findAll();
    console.log("listComments: ", listComments);
    res.status(200).json(listComments);
});


commentRouter.delete("/comment/:id", async (req, res) => {
    const { id } = req.params;
    console.log(`deletar comentário id: ${id}`);
    try {
        const commentDeleted = await commentService.delete(+id); // o + converte para number
        res.status(201).json(commentDeleted); // {mensagem} é o mesmo que {mensagem: mensagem}
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
})


export default commentRouter;



