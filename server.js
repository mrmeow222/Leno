const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

let users = [];
let posts = [];

app.post('/signup', (req, res) => {
    const { username, password, email } = req.body;
    const userExists = users.find(user => user.username === username);
    if (userExists) {
        return res.status(400).json({ message: 'Username already exists' });
    }
    const newUser = { username, password, email };
    users.push(newUser);
    res.status(201).json({ message: 'User created successfully' });
});

app.post('/signin', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        res.status(200).json({ message: 'User signed in', username: user.username });
    } else {
        res.status(400).json({ message: 'Invalid username or password' });
    }
});

app.post('/posts', (req, res) => {
    const { title, content, author, nsfw, nsfl, community } = req.body;
    const newPost = { title, content, author, nsfw, nsfl, community, createdAt: new Date() };
    posts.push(newPost);
    res.status(201).json(newPost);
});

app.get('/posts', (req, res) => {
    res.status(200).json(posts);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
