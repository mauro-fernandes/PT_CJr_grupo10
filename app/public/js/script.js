const mockedPosts = [
  {
    id: 1,
    title: "Post 1",
    content:
      "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?",
  },
  {
    id: 2,
    title: "Post 2",
    content:
      "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?",
  },
  {
    id: 3,
    title: "Post 3",
    content:
      "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?",
  },
  {
    id: 4,
    title: "Post 4",
    content:
      "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?",
  },
];

const renderPost = () => {
  const id = window.location.href.split("=")[1];
  post = mockedPosts.find((post) => post.id == id);

  const postElement = document.createElement("div");
  postElement.classList.add("post");

  postElement.innerHTML = `
      <h2>${post.title}</h2>
      <p>${post.content}</p>
    `;
  document.querySelector(".container").appendChild(postElement);
};

renderPost();