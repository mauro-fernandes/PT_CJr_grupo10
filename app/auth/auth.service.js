import jwt from 'jsonwebtoken';
import UserService from "../user/user.service.js";

const userService = new UserService();

class AuthService {
    async signIn(email, senha) {
        const user = await userService.findByEmail(email);
        console.log("user: ", user);

        if (!user)
            throw new Error("Usuário não encontrado!");

        if (user.senha !== senha) {
            throw new Error("Senha inválida!");
        }

        const token = jwt.sign({ id: user.id }, "secret", {expiresIn: '15m'});
        return { token };
    }


    async signUp(username, email, senha, gender, cargo, admin = false) {
        const user = await userService.findByEmail(email);

        if (user)
            throw new Error("Usuário já cadastrado!");

        const newUser = await userService.create( username, email, senha, gender, cargo, admin);
        return { newUser };
    }

}

export default AuthService

