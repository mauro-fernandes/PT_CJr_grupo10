import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class UserService {
  async create(username, email, senha, gender, cargo, admin) {
    return await prisma.user
      .create({
        data: {
          username,
          email,
          senha,
          gender,
          cargo,
          admin,
        },
      })
      .catch((e) => {
        if (e.code === "P2002") throw new Error("Usuário já cadastrado!");
        throw new Error(e.message);
      });
  }

  async findAll() {
    console.log("listando usuários...");
    const listusers = await prisma.user.findMany().catch((e) => {
      throw new Error(e.message);
    });
    return listusers;
  }

  async delete(id) {
    return await prisma.user
      .delete({
        where: {
          id,
        },
      })
      .catch((e) => {
        if (e.code === "P2025") throw new Error("Usuário não encontrado!");
        throw new Error(e.message);
      });
  }

  async update(id, body) {
    return await prisma.user
      .update({
        where: {
          id,
        },
        data: {
          ...body,
        },
      })
      .catch((e) => {
        if (e.code === "P2025") throw new Error("Usuário não encontrado!");
        throw new Error(e.message);
      });
  }

  async findByEmail(email) {
    return await prisma.user
      .findUnique({
        where: {
          email,
        },
      })
      .catch((e) => {
        throw new Error(e.message);
      });
  }

  //service para buscar usuário por id
  async retrieveUserById(id) {
    return await prisma.user
      .findUnique({
        where: {
          id,
        },
      })
      .catch((e) => {
        throw new Error(e.message);
      });
  }

  async findByUsername(username) {    //service para buscar posts e respec comments de usuário a partir de seu  username
    return await prisma.user
      .findUnique({
        where: { username },
        
        include: {
          posts: {
            orderBy: { createdAt: "desc" },
            include: {comments: true}}
        }, 
      })
      .catch((e) => {
        throw new Error(e.message);
      });
  }

  // trazer todos os posts de um usuário (abordagem via include)
  async PostsByUserId(id) {
    return await prisma.user
      .findMany({
        where: { id },
        take: 10,
        orderBy: { createdAt: "desc"},
        include: {
          posts: {include: {comments: true}}
        }, 
      })
      .catch((e) => {
        if (e.code === "P2025") throw new Error("Nenhum Post encontrado!");
        throw new Error(e.message);
      });
  }

  // trazer a partir de id de usuário, os 10 últimos posts  e respectivos comments de um usuário  (abordagem - `user.findUnique` usando include posts e include comments)
  async last10PostsById(id) {
    return await prisma.user
      .findUnique({
        where: { id },
        take: 10,
        orderBy: { createdAt },
        include: {
          posts: { include: { comments: true } },
        },
      })
      .catch((e) => {
        if (e.code === "P2025") throw new Error("Nenhum Post encontrado!");
        throw new Error(e.message);
      });
  }
  
}

export default UserService;
