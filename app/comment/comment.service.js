import { PrismaClient } from "@prisma/client";  
const prisma = new PrismaClient();

class CommentService {
    async create(content_comments, user_id, post_id) {
        return await prisma.comment
            .create({
                data: {
                    content_comments,
                    user_id,
                    post_id,
                },
            })
            .catch((e) => {
                throw new Error(e.message);
            });        
    }


    async findAll() {
        const comments = await prisma.comment.findMany();
        return comments;
    }


    async delete(id) {
        return await prisma.comment.delete({
            where: {
                id
            },
        })
        .catch((e) => {
            if (e.code === "P2025") 
                throw new Error("Comentário não encontrado!");
            throw new Error(e.message);
        });
    }


    async update(id, body) {
        return await prisma.comment
            .update({
                where: {
                    id,
                },
                data: {
                    ...body,
                },
            })
            .catch((e) => {
                if (e.code === "P2025") 
                    throw new Error("Comentário não encontrado!");
                throw new Error(e.message);
            });
    }


    async findByPostId(id) {
        return await prisma.comment.findMany({
            where: {
                post_id: id
            },
        })
        .catch((e) => {
            if (e.code === "P2025") 
                throw new Error("Comentário não encontrado!");
            throw new Error(e.message);
        });
    }
        
}

export default CommentService;