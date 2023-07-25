import { mockedPosts } from "../mocked_posts.js";

console.log(window.location.pathname);
console.log(window.location.href);




let getRouteId = () => {
  //const route = window.location.pathname;
  const path = window.location.href;
  console.log("path: ", path);
  //return +path.split("/").pop(); 
  const route = +path.split("=")[1];
  console.log("route: ", route);
  return route;
}

let renderPost = () => {
  let postId = 0 //getRouteId();


  const container = document.querySelector('.postList');
  
  container.innerHTML = `
    <div class="post">
    <div class="postText">
      <h2>${mockedPosts[postId].title}</h2>
      <p>${mockedPosts[postId].content}</p>
    </div>
    </div>
    `;
    
    console.log("postContainer: ", container);  // test if it is working  // it is working

};




renderPost();

console.log(window.location.pathname);
console.log(window.location.href);