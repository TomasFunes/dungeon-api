import fs from 'node:fs/promises';

import bodyParser from 'body-parser';
import express from 'express';

const app = express();

app.use(express.static('images'));
app.use(bodyParser.json());


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); 
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  next();
});

app.get('/heroes', async (req, res) => {
  const fileContent = await fs.readFile('./data/heroes.json');

  const heroesData = JSON.parse(fileContent);

  res.status(200).json({ heroes: heroesData });
});

app.get('/user-heroes', async (req, res) => {
  const fileContent = await fs.readFile('./data/user-heroes.json');

  const heroes = JSON.parse(fileContent);

  res.status(200).json({ heroes });
});

app.put('/user-heroes', async (req, res) => {
  const heroes = req.body.heroes;


  await fs.writeFile('./data/user-heroes.json', JSON.stringify(heroes));

  res.status(200).json({ message: 'User heroes updated!' });
});


app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  res.status(404).json({ message: '404 - Not Found' });
});

app.listen(3000);
