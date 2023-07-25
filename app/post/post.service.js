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

  async delete(id) {
    return await prisma.post
      .delete({
        where: {
          id,
        },
      })
      .catch((e) => {
        if (e.code === "P2025") throw new Error("Post não encontrado!");
        throw new Error(e.message);
      });
  }

  async update(id, body) {
    return await prisma.post
      .update({
        where: {
          id,
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

  async findById(id) {
    return await prisma.post
      .findUnique({
        where: {
          id,
        },
      })
      .catch((e) => {
        if (e.code === "P2025") throw new Error("Post não encontrado!");
        throw new Error(e.message);
      });
  }

  async findByUser(user_id) {
    return await prisma.post
      .findMany({
        where: {
          user_id,
        },
      })
      .catch((e) => {
        if (e.code === "P2025") throw new Error("Post não encontrado!");
        throw new Error(e.message);
      });
  }
}

export default PostService;
