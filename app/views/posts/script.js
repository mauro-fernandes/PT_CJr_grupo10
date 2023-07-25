// Import the functions you need from the SDKs you need
import { mockedPosts } from "../mocked_posts.js";



console.log("teste oi");


const renderPosts = () => {
  const postContainer = document.querySelector('.postList');
  
  mockedPosts.forEach(post => {
    console.log("post: ", post);  // test if it is working  // it is working    

    const postElement = document.createElement("div");
    console.log("postElement: ", postElement);  // test if it is working  // it is working

    postElement.addEventListener("click", () => {
      console.log("post clicked");
      window.location.href = `http://localhost:3000/app/views/posts/post_content.html?id=${post.id}`;
    });

    postElement.classList.add("post");

    postElement.innerHTML = `
    <div class="post">
    <div class="postText">
      <h2>${post.title}</h2>
      <p>${post.content.slice(0, 355)}...</p>
    </div>
    </div>
    


    `;
    console.log("postElement: ", postElement);  // test if it is working  // it is working

    console.log("postContainer: ", postContainer);  // test if it is working  // it is working
    postContainer.appendChild(postElement);

});
}





renderPosts();

console.log(window.location.pathname);
console.log(window.location.href);