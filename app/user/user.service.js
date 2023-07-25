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
    const listusers = await prisma.user.findMany()
    .catch((e) => { throw new Error(e.message); });
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
    return await prisma.user.update({
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



  
}


export default UserService;
