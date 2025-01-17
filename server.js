const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = 3001;
const DATA_FILE = path.join(__dirname, 'data.json');
const SECRET_KEY = 'your_secret_key';

app.use(bodyParser.json());
app.use(cors());

const user = {
  username: 'admin',
  password: bcrypt.hashSync('password', 8) 
};

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  if (username !== user.username) {
    return res.status(404).send('Usuário não encontrado');
  }

  const passwordIsValid = bcrypt.compareSync(password, user.password);
  if (!passwordIsValid) {
    return res.status(401).send({ auth: false, token: null });
  }

  const token = jwt.sign({ id: user.username }, SECRET_KEY, {
    expiresIn: 0 
  });

  res.status(200).send({ auth: true, token: token });
});


app.get('/api/protected', (req, res) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(403).send({ auth: false, message: 'Nenhum token fornecido' });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(500).send({ auth: false, message: 'Falha ao autenticar token' });
    }
    res.status(200).send(decoded);
  });
});

app.post('/api/posts', (req, res) => {
  const post = req.body;
  fs.readFile(DATA_FILE, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Server Error');
    }
    const posts = JSON.parse(data);
    posts.push(post);
    fs.writeFile(DATA_FILE, JSON.stringify(posts), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Server Error');
      }
      res.status(201).send(post);
    });
  });
});

app.get('/api/posts', (req, res) => {
  fs.readFile(DATA_FILE, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Server Error');
    }
    const posts = JSON.parse(data);
    res.status(200).send(posts);
  });
});

if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify([]));
}


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
