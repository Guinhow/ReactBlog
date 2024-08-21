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

// const users = [{ id: 1, username: 'user', password: 'password'}]; // senha hasheada

// app.post('/api/login', (req, res) => {
//   const { username, password } = req.body;
//   const user = users.find(user => user.username === username);
//   if (user && bcrypt.compareSync(password, user.password)) {
//     const token = jwt.sign({ id: user.id }, 'secret_key', { expiresIn: '1h' });
//     res.json({ token });
//   } else {
//     res.status(401).json({ message: 'Invalid credentials' });
//   }
// });




// Usuário fake para demonstração
const user = {
  username: 'admin',
  password: bcrypt.hashSync('password', 8) // Senha hash para segurança
};

// Rota de login
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
    expiresIn: 0 // expira em 24 horas
  });

  res.status(200).send({ auth: true, token: token });
});

// Rota protegida
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








// Rota para receber os dados do formulário
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

// Rota para servir os dados armazenados
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

// Inicializa o arquivo JSON se ele não existir
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify([]));
}


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
