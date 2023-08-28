import {Router} from 'express';
import AuthService from './auth.service.js';
import jwtGuard from './guards/jwt.guard.js';

const authRouter = Router();
const authService = new AuthService();

authRouter.post("/sign-in", async (req, res) => {
    const {email, senha} = req.body;
    try {
        const token = await authService.signIn(email, senha);
        return res.json(token);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});


authRouter.post("/sign-up", async (req, res) => {
    console.log("New user by signup.. ");
    console.log("req.body: ", req.body);
    const {username, email, senha, gender, cargo} = req.body;
    try {
        const newUser = await authService.signUp(username, email, senha, gender, cargo);
        console.log("newUser: ", newUser);
        res.json(newUser);
        return newUser;
    } catch (error) {
        res.status(400).json({error : error.message});
    }
});


export default authRouter;