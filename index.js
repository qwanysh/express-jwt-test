const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

const SECRET_KEY = 'SECRET_KEY';

const auth = (req, res, next) => {
  const bearerHeader = req.headers.authorization;
  if (bearerHeader) {
    const token = bearerHeader.split(' ')[1];
    try {
      const user = jwt.verify(token, SECRET_KEY);
      req.user = user;
      next();
    } catch {
      res.sendStatus(400);
    }
  } else {
    res.sendStatus(403);
  }
};

app.get('/', (req, res) => {
  res.send('endpoint');
});

app.get('/protected', auth, (req, res) => {
  res.json({ user: req.user });
});

app.post('/login', (req, res) => {
  // authorizing user
  const user = { id: 1, username: 'username' };
  const token = jwt.sign(user, SECRET_KEY);
  res.json({ token });
});

app.listen(process.env.PORT || 8000);
