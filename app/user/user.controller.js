import UserService from "./user.service.js";
import { Router } from "express";
import jwtGuard from "../auth/guards/jwt.guard.js";

const userRouter = Router();
const userService = new UserService();


userRouter.get("/user", async (req, res) => {
  const listaUsuarios = await userService.findAll();
  console.log("listaUsuarios: ", listaUsuarios);
  res.status(200).json(listaUsuarios);
});

userRouter.patch("/user/:id", jwtGuard, async (req, res) => {
  console.log("req.user: ", req.user);
  const user = req.user;
  const { id } = req.params;
  console.log("id: ", id);

  if (user.id !== +id)
    return res
      .status(403)
      .json({ message: "Você não tem permissão para editar esse usuário!" });

  console.log(`atualizar usuário id: ${id}`);
  try {
    const usuarioAtualizado = await userService.update(+id, req.body);
    res.status(201).json(usuarioAtualizado);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

userRouter.delete("/user/:id", jwtGuard, async (req, res) => {
  const { id } = req.params;
  console.log(`deletar usuário id: ${id}`);
  const user = req.user;
  console.log("user: ", user);
  console.log("admin: ", user.admin);
  if (user.id !== +id)
    if (!user.admin)
      return res
        .status(403)
        .json({
          message: "Você não tem autorização para deletar esse usuário!",
        });

  console.log(`tentando deletar usuário id: ${id}`);
  try {
    const usuarioDeletado = await userService.delete(+id); // o + converte para number
    res.status(201).json(usuarioDeletado);
    return usuarioDeletado;
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

userRouter.get("/user/id/:id", async (req, res) => {
  const { id } = req.params;
  console.log(`buscar usuário id: ${id}`);
  try {
    const usuarioEncontrado = await userService.retrieveUserById(+id);
    console.log("usuarioEncontrado: ", usuarioEncontrado);
    res.status(201).json(usuarioEncontrado);
    return usuarioEncontrado;
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

// rota para buscar usuário (perfil) e posts por username
userRouter.get("/usr/:username", async (req, res) => {
  const { username } = req.params;
  console.log(`buscar usuário por username: ${username}`);
  try {
    const usuarioEncontrado = await userService.findByUsername(username);
    console.log("usuarioEncontrado: ", usuarioEncontrado);
    res.status(201).json(usuarioEncontrado);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

// list last 10 user posts by user (:id) route
userRouter.get("/user/:user_id/posts", async (req, res) => {
  const { user_id } = req.params;
  console.log(`find posts from user id: ${user_id}`);
  try {
    const postsFound = await userService.PostsByUserId(+user_id);
    res.status(201).json(postsFound);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

// rota de sessão para buscar usuário logado
/*
userRouter.get("/user/me", async (req, res) => {
  console.log("req.user: ", req.user);
  const user = req.user;
  console.log("user: ", user);
  console.log("user.id: ", user.id);
  console.log("user.username: ", user.username);
  console.log("user.email: ", user.email);

  try {
    res.status(201).json(user);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});
*/



export default userRouter;
