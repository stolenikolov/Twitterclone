import express from 'express';
import cors from 'cors';
import { sequelize, User, Post } from './db.js';
import 'dotenv/config';
import loginRouter from './login.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/login', loginRouter);

// Sync database
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully!');
    await sequelize.sync();
    console.log('All models were synchronized!');
  } catch (err) {
    console.error('Unable to connect to the database:', err);
  }
})();

// Your new route goes here
app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Register route
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.create({ username, password });
    res.json({ message: `User ${username} registered!` });
  } catch (err) {
    res.status(400).json({ error: 'Username already exists' });
  }
});
// POSTS
app.post('/dashboard',async(req,res)=>{
  const {message,userId} = req.body;
  try{
    const post = await Post.create({userId,message});
    res.json({message:"Post added"});
  }catch(err){
    res.status(401).json({err});
  }
})

app.get('/posts', async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: {
        model: User,
        attributes: ['username'], // only include username
      },             
      order: [['createdAt', 'DESC']],
    });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Increment likes for a post
app.post('/posts/:id/like', async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    post.likes = (post.likes || 0) + 1;
    await post.save();

    res.json({ message: 'Post liked', likes: post.likes });
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Increment comments for a post
app.post('/posts/:id/comment', async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    post.comments = (post.comments || 0) + 1;
    await post.save();

    res.json({ message: 'Comment added', comments: post.comments });
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});





// Start server
app.listen(5000, () => console.log('Server running on port 5000'));
