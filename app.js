import express from 'express';
import userRouter from './app/user/user.controller.js';
import postRouter from './app/post/post.controller.js';
import commentRouter from './app/comment/comment.controller.js';
import authRouter from './app/auth/auth.controller.js';


const app = express();
app.use(express.json());
app.use(userRouter);
app.use(postRouter);
app.use(commentRouter);
app.use(authRouter);

app.use(express.static('public', {extensions: ['html']}, {index: 'login.html'}, {index: 'paginaposts.html'}));



// function callback_servidor() {
//     console.log('Server started on port 3000');
// }
// app.listen(3000, callback_servidor());


app.get('/hello', (req, res) => {// http://localhost:3000/hello
    res.status(200).json({message: 'Hello World'});
})

// renderizar o login.html

app.get('/', (req, res) => {
    res.status(200).send('TODO  ');
})




const port = 3001;
app.listen(port, () => {
console.log(`Server started on port ${port}`);
});
