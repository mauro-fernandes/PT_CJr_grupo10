export const header = {
    
    render: () => {
    const header = document.querySelector('header')
    header.innerHTML = `
    
    <div class="header">
    <div class="headerLogo">
      <h1>Blog</h1>
      </div>
      <div class="headerMenu">
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">Posts</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Contact</a></li>
        </ul>
        </div>`



    }
}

