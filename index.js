const express = require('express')
const { PrismaClient } = require('@prisma/client')
const _ = require('lodash')
const { hashPassword, verifyPassword } = require('./utils/hash')
const app = express()
const prisma = new PrismaClient()
const jwt = require('jsonwebtoken')
const cors = require('cors')

app.use(express.json())
app.use(cors())

const isAuthorized = (req, res, next) => {
  try {
    const { authorization } = req.headers
    const [, token] = authorization.split(' ')

    if (!jwt.verify(token, process.env.JWT_KEY)) {
      return res.status(403)
    }
    next()
  } catch (err) {
    console.log('[error][isAuthorized]', err)
    return res.status(403).json({ message: err.message })
  }
}

app.post('/users/create', async (req, res) => {
  try {
    const { email, username, password } = req.body
    const hashedPassword = hashPassword(password)
    const newUser = await prisma.user.create({
      data: {
        password: hashedPassword,
        email,
        username,
      },
    });

    return res.status(200).json({ messsage: 'user created', user: _.omit(newUser, 'password') })
  } catch (err) {
    console.log('[error]', err)
    res.status(500).json({ message: err.message })
  }
})

app.post('/users/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        email: email
      }
    })

    if (!verifyPassword(password, process.env.SALT, user.password)) {
      return res.status(403).json({ message: 'Unauthorized' })
    }
    const token = jwt.sign(user, process.env.JWT_KEY)

    return res.status(200).json({ token })
  } catch (err) {
    console.log('[error]', err)
    res.status(500).json({ message: err.message })
  }
})

app.get('/users', isAuthorized, async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        email: true,
        username: true
      }
    })

    return res.status(200).json(users);
  } catch (err) {
    console.log('[error]', err)
    res.status(500).json({ message: err.message })
  }
})

const server = app.listen(process.env.PORT)

const shutDown = async () => {
  await prisma.$disconnect();

  server.close(() => {
    console.log('Closed out remaining connections');
    process.exit(0);
  });

  setTimeout(() => {
    console.error('Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 10000);
}

process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);
