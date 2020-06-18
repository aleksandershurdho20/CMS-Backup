const express = require('express');
const jwt = require('jsonwebtoken');
const chalk = require('chalk');
const { v4: genId } = require('uuid');
const fs = require('fs');

const app = express();

app.use(express.json({ extended: true }));

const secret = fs.readFileSync('secret.key');

// const admin = [
//   {
//     id: '9b9c9e18-ed8e-4dae-8dbb-748aca883c60',
//     email: 'email@email',
//     password: 'key',
//   },
// ];

let user = [
  {
    id: 'a7d920e2-5566-4142-802b-53c61f3y5k',
    name: 'Aname',
    lastname: 'Alastname',
    email: 'name@gmail.com',
    password: '12345',
    phone: '123252356',
    address: 'adrss1 ',
  },
  {
    id: 'd869a8e2-5566-4142-802b-53c61f3096b1',
    name: 'brad',
    lastname: 'brad-lastname',
    email: 'brad@brad.com',
    password: 'key',
    phone: '7329823423',
    address: 'adresaime',
  },
  {
    id: 'c89428e2-5566-4142-802b-53942jh096b1',
    name: 'jake',
    lastname: 'jake-lastname',
    email: 'jake@jake.com',
    password: 'key',
    phone: '9549035832',
    address: 'blablalbla',
  },
];

const verifyToken = (req, res, next) => {
  const authtoken = req.headers['authorization'];
  if (authtoken) {
    req.token = authtoken;
    next();
  } else {
    res.sendStatus(403);
  }
};


app.post('/api/signup', (req, res) => {
  const { name, lastname, email, password, phone, address } = req.body;

  const emailAlreadyRegistered = user.map((item) => item.email).includes(email);
  if (emailAlreadyRegistered) {
    return res.json({ success: false, msg: 'Email already registered, try another' });
  }

  const newUser = { id: genId(), ...req.body };
  user.push(newUser);
  jwt.sign({ id: newUser.id }, secret, { expiresIn: 7200 }, (err, token) => {
    if (err) {
      return res.sendStatus(400);
    } else {
      return res.status(200).json({ success: true, user, token, msg: 'user registered' });
    }
  });
});


app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  const emailExists = user.map((item) => item.email).includes(email);
  if (!emailExists) {
    return res.json({ success: false, msg: 'email not found' });
  }
  const passwordMatches = user.map((item) => item.password).includes(password);
  if (!passwordMatches) {
    return res.json({ success: false, msg: 'Password does not match' });
  }

  const userinfo = user.find((item) => item.email == email);

  jwt.sign({ id: userinfo.id }, secret, { expiresIn: 7200 }, (err, token) => {
    if (err) {
      return res.sendStatus(400);
    } else {
      return res.status(200).json({ success: true, msg: 'user logged in', token });
    }
  });
});


app.get('/api/user', verifyToken, (req, res) => {
  try {
    const decoded = jwt.verify(req.token, secret);
    const index = user.map((item) => item.id).indexOf(decoded.id);
    if (index > -1) {
      const verifiedUser = user[index];
      res.status(200).json({ user: verifiedUser });
    } else {
      return res.sendStatus(400);
    }
  } catch (err) {
    // console.log(err);
    res.sendStatus(500);
  }
});


app.get('/api/view-all-users', verifyToken, (req, res) => {
  return res.status(200).json({ success: true, users: user });
});

app.put('/api/delete-user', verifyToken, (req, res) => {
  const { id } = req.body;
  let newUsers = user.filter((item) => item.id !== id);
  user = newUsers;
  return res.status(200).json({ success: true, users: user });
});

app.put('/api/update', verifyToken, (req, res) => {
  const { id, name, lastname, email, password, phone, address } = req.body;
  let index = user.map((item) => item.id).indexOf(id);
  if (index <= -1) {
    return res.sendStatus(400);
  }
  user[index] = { ...req.body };
  return res.status(200).json({ success: true, user });
});
app.listen(process.env.PORT || 5000, () => console.log(chalk.bold.yellow('server is running up on port 5000')));
