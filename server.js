const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

let users = [];
let posts = [];

app.post('/signup', (req, res) => {
    const { username, password, email } = req.body;
    if (users.find(user => user.username === username)) {
        return res.status(400).json({ message: 'Username already exists' });
    }
    users.push({ username, password, email });
    res.status(201).json({ message: 'User registered successfully' });
});

app.post('/signin', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username && user.password === password);
    if (!user) {
        return res.status(400).json({ message: 'Invalid username or password' });
    }
    res.status(200).json({ message: 'User signed in successfully' });
});

app.post('/posts', (req, res) => {
    const { title, content, author, nsfw, nsfl, community } = req.body;
    const newPost = { title, content, author, nsfw, nsfl, community, id: posts.length + 1 };
    posts.push(newPost);
    res.status(201).json(newPost);
});

app.get('/posts', (req, res) => {
    res.status(200).json(posts);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

