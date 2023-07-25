import UserService from "./user.service.js";
import { Router } from "express";

const userRouter = Router();
const userService = new UserService();

userRouter.post("/user", async (req, res) => {
    const { username, email, senha, gender, cargo } = req.body;
    try {
        const novoUsuario = await userService.create(username, email, senha, gender, cargo);
        console.log("novoUsuario: ", novoUsuario);
        res.status(201).json(novoUsuario);
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
    });

userRouter.get("/user", async (req, res) => {
    const listaUsuarios = await userService.findAll();
    console.log("listaUsuarios: ", listaUsuarios);
    res.status(200).json(listaUsuarios);
});


userRouter.delete("/user/:id", async (req, res) => {
    const { id } = req.params;
    console.log(`deletar usuário id: ${id}`);
    try {
        const usuarioDeletado = await userService.delete(+id); // o + converte para number
        res.status(201).json(usuarioDeletado); 
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
});

userRouter.patch("/user/:id", async (req, res) => {
    const { id } = req.params;
    console.log(`atualizar usuário id: ${id}`);
    try {
        const usuarioAtualizado = await userService.update(+id, req.body);
        res.status(201).json(usuarioAtualizado); 
    } catch (e) {   
        res.status(400).json({ message: e.message });

    }
})


export default userRouter;
