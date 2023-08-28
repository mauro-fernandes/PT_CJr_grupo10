import jwt from "jsonwebtoken";
import UserService from "../user/user.service.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const userService = new UserService();

class AuthService {
  async signIn(email, senha) {
    const user = await userService.findByEmail(email);
    console.log("authenticated user: ", user);

    if (!user) throw new Error("Usuário não encontrado!");

    if (!(await bcrypt.compare(senha, user.senha)))
      throw new Error("Senha inválida!");

    const payload = {
      id: user.id,
      admin: user.admin,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });
    return { token };
  }

  // TODO: implementar o método de logout
  async signOut() {
    //const user = await userService.findByEmail(email);
    //console.log("user: ", user);
    // return jwt.sign(
    //   { id: user.id, admin: user.admin },
    //   process.env.JWT_SECRET,
    //   { expiresIn: "1s" }
    // )
    const token = (jwt.expiresIn = 0);
    return { message: "Logout realizado com sucesso!" };
  }

  // ?? TODO: implementar o método de refresh token ??
  async refreshToken(token) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userService.findById(decoded.id);
    if (!user) throw new Error("Usuário não encontrado!");
    const newToken = jwt.sign(
      { id: user.id, admin: user.admin },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );
    return { newToken };
  }

  async signUp(username, email, senha, gender, cargo, admin) {
    const salt = await bcrypt.genSalt();
    senha = await bcrypt.hash(senha, salt);

    const user = await userService.findByEmail(email);
    if (user) throw new Error("Usuário já cadastrado!");
    const newUser = await userService.create(
      username,
      email,
      senha,
      gender,
      cargo,
      admin
    );
    return { newUser };
  }
}

export default AuthService;