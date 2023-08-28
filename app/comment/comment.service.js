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
      })
      .finally(async () => {
        prisma.$disconnect();
      });
  }

  async findAll() {
    const comments = await prisma.comment
      .findMany({
        include: {
          user: {
            select: {
              username: true,
              email: true,
              cargo: true,
            },
          },
        },
      })
      .catch((e) => {
        throw new Error(e.code, e.message);
      });
    return comments;
  }

  async delete(comment_id) {
    return await prisma.comment
      .delete({
        where: {
          comment_id,
        },
      })
      .catch((e) => {
        if (e.code === "P2025") throw new Error("Comentário não encontrado!");
        throw new Error(e.message);
      });
  }

  async update(comment_id, body) {
    return await prisma.comment
      .update({
        where: { comment_id },
        data: { ...body },
      })
      .catch((e) => {
        if (e.code === "P2025") throw new Error("Comentário não encontrado!");
        throw new Error(e.message);
      });
  }

  async findByPostId(id) {
    return await prisma.comment
      .findMany({
        where: {
          post_id: id,
        },
      })
      .catch((e) => {
        if (e.code === "P2025") throw new Error("Comentário não encontrado!");
        throw new Error(e.message);
      });
  }

  // TODO: // restrição: atualização de comments somente pelo dono do comment, ou do post, ou admin
  async findPostIdbyCommentId(id) {
    console.log("reached comm_service; id: ", id);
    return await prisma.comment
      .findUniqueOrThrow({
        where: {
          comment_id: id,
        },
        select: {
          post_id: true,
        },
      })
      .catch((e) => {
        if (e.code === "P2025") throw new Error("Comentário não encontrado!");
        throw new Error(e.message);
      });
  }

  async findUserIdbyCommentId(comment_id) {
    console.log("reached comm_service; id: ", comment_id);
    return await prisma.comment
      .findUniqueOrThrow({
        where: {
          comment_id,
        },
        select: {
          user_id: true,
        },
      })
      .catch((e) => {
        if (e.code === "P2025") throw new Error("Comentário não encontrado!");
        throw new Error(e.message);
      });
  }
}

export default CommentService;
