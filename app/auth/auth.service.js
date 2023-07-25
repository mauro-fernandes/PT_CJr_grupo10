import jwt from 'jsonwebtoken';
import UserService from "../user/user.service.js";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const userService = new UserService();

class AuthService {
    async signIn(email, senha) {
        const user = await userService.findByEmail(email);
        console.log("user: ", user);

        if (!user)
            throw new Error("Usuário não encontrado!");

        if (!(await bcrypt.compare(senha, user.senha)))
            throw new Error("Senha inválida!");

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {expiresIn: '15m'});
        return { token };
    }


    async signUp(username, email, senha, gender, cargo, admin = false) {
        const salt = await bcrypt.genSalt();
        senha = await bcrypt.hash(senha, salt);
        
        const user = await userService.findByEmail(email);
        if (user)
            throw new Error("Usuário já cadastrado!");
        const newUser = await userService.create( username, email, senha, gender, cargo, admin);
        return { newUser };
    }

}

export default AuthService

