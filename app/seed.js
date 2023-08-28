const seed_users = [
  {
    username: "mauro",
    email: "m@unb.br",
    senha: "123456",
    gender: "M",
    cargo: "membro",
  },
  {
    username: "leo",
    senha: "123456",
    gender: "M",
    email: "leo@unb.br",
    cargo: "membro",
  },
  {
    username: "pejao",
    senha: "123456",
    gender: "M",
    email: "p@unb.br",
    cargo: "membro",
  },
  {
    username: "joao",
    senha: "123456",
    gender: "M",
    email: "j@unb.br",
    cargo: "membro",
  },
  {
    username: "gus",
    senha: "123456",
    gender: "M",
    email: "g@unb.br",
    cargo: "trainee",
  },
  {
    username: "hector",
    senha: "123456",
    gender: "M",
    email: "h@unb.br",
    cargo: "trainee",
  },
  {
    username: "admin",
    senha: "123456",
    gender: "M",
    email: "admin@xyz.abc",
    cargo: "admin",
  },
  {
    username: "admin2",
    senha: "123456",
    gender: "M",
    email: "admin2@xyz.abc",
    cargo: "admin",
  },
  {
    username: "admin3",
    senha: "123456",
    gender: "M",
    email: "admin3@xyz.abc",
    cargo: "admin",
  },
  {
    username: "admin5",
    senha: "123456",
    gender: "M",
    email: "admin5@xyz.abc",
    cargo: "admin",
  },
];

const seed_posts = [
  {
    title: "Post 1",
    content: "Conteúdo do post 1. Teste de seed. lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos? ",
    user_id: 1,
  },
  {
    title: "Post 2",
    content: "Conteúdo do post 2. lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos? ",
    user_id: 1,
  },
  {
    title: "Post 3",
    content: "Conteúdo do post 3. lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?",
    user_id: 1,
  },
  {
    title: "Post 4",
    content: "Conteúdo do post 4. lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos? ",
    user_id: 1,
  },
];

const seed_comments = [
  {
    content_comments: "Comentário 1",
    user_id: 1,
    post_id: 1,
  },
  {
    content_comments: "Comentário 2",
    user_id: 1,
    post_id: 1,
  },
  {
    content_comments: "Comentário 3",
    user_id: 1,
    post_id: 1,
  },
];

async function main() {
  console.log("Iniciando seed...");
  const users = await prisma.user.createMany({
    data: seed_users,
    skipDuplicates: true,
  });
  console.log("Usuários criados: ", users);
  const posts = await prisma.post.createMany({
    data: seed_posts,
    skipDuplicates: true,
  });
  console.log("Posts criados: ", posts);
  const comments = await prisma.comment.createMany({
    data: seed_comments,
    skipDuplicates: true,
  });
  console.log("Comentários criados: ", comments);
  console.log("Seed finalizado!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
