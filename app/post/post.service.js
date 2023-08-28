import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class PostService {
  async create(title, content, user_id) {
    return await prisma.post
      .create({
        data: {
          title,
          content,
          user_id,
        },
      })
      .catch((e) => {
        throw new Error(e.message);
      });
  }

  async findAll() {
    const posts = await prisma.post.findMany();
    return posts;
  }

  async update(id, body) {
    return await prisma.post
      .update({
        where: {
          post_id: id,
        },
        data: {
          ...body,
        },
      })
      .catch((e) => {
        if (e.code === "P2025") throw new Error("Post não encontrado!");
        throw new Error(e.message);
      });
  }

  async delete(id) {
    return await prisma.post
      .delete({
        where: {
          post_id:id,
        },
      })
      .catch((e) => {
        if (e.code === "P2025") throw new Error("Post não encontrado!");
        throw new Error(e.message);
      });
  }

  async findByPostId(post_id) {
    return await prisma.post
      .findUnique({
        where: {
          post_id,
        },
      })
      .catch((e) => {
        if (e.code === "P2025") throw new Error("Post não encontrado!");
        throw new Error(e.message);
      });
  }

  // trazer os últimos 10 posts de um usuário via id (include para comments)
  async retrieveByUserId(user_id) {
    return await prisma.post
      .findMany({
        where: {
          user_id,
        },
        take: 10,
        orderBy: { createdAt: "desc" },
        include: { comments: true },
      })
      .catch((e) => {
        if (e.code === "P2025") throw new Error("Nenhum Post encontrado!");
        throw new Error(e.message);
      });
  }

  /*
  async user_idByPostId(post_id) {
    return await prisma.post
      .findUnique({
        where: {
          post_id,
        },
        include: {user_id: true},
      })
      .catch((e) => {
        if (e.code === "P2025") throw new Error("Post não encontrado!");
        throw new Error(e.message);
      });
  }
  */
}

export default PostService;
