import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export default function jwtGuard ( req, res, next ) {
    console.log("Guard executando!");
    const authHeader = req.headers['authorization'];

    if (!authHeader)
        return res.status(401).json({message: 'Token não fornecido!'});

    const [prefix, token] = authHeader.split(" ");

    if (prefix !== 'Bearer')
        return res.status(401).json({message: 'Token mal formatado!'});

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);  
        console.log("decoded: ", decoded);
        req.user = decoded;
        next();
    }   
    catch (error) {
        return res.status(401).json({message: 'Token inválido!'});
    }
}
