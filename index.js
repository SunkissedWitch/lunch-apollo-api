const express = require("express");
const { PrismaClient } = require("@prisma/client");
const _ = require("lodash");
const { hashPassword, verifyPassword } = require("./utils/hash");
const app = express();
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();

app.use(express.json());
app.use(cors());

const isAuthorized = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const [, token] = authorization.split(" ");
    const user = jwt.verify(token, process.env.JWT_KEY);
    if (!user) {
      return res.status(403);
    }
    req.user = user;
    next();
  } catch (err) {
    console.log("[error][isAuthorized]", err);
    return res.status(403).json({ message: err.message });
  }
};

app.post("/users/create", async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const hashedPassword = hashPassword(password);
    const newUser = await prisma.user.create({
      data: {
        password: hashedPassword,
        email,
        username,
      },
    });

    return res.status(200).json({
      message: "user created",
      user: _.omit(newUser, "password"),
    });
  } catch (err) {
    console.log("[error]", err);
    res.status(500).json({ message: err.message });
  }
});

app.post("/users/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        email: email,
      },
    });

    if (!verifyPassword(password, process.env.SALT, user.password)) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    const token = jwt.sign(_.omit(user, "password"), process.env.JWT_KEY);

    return res.status(200).json({ token });
  } catch (err) {
    console.log("[error]", err);
    res.status(500).json({ message: err.message });
  }
});

app.get("/", async (req, res) => {
  return res.status(200).json({ route: "index" });
});

app.get("/users", isAuthorized, async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        email: true,
        username: true,
        _count: {
          select: { orders: true },
        }
      },
    });
    const flattenedUsers = _.map(users, (user) => (user = {
      email: user.email,
      username: user.username,
      orders: user._count.orders
    }))
    // console.log('flatten', flatten)
    return res.status(200).json(flattenedUsers);
  } catch (err) {
    console.log("[error]", err);
    res.status(500).json({ message: err.message });
  }
});

app.post("/orders", isAuthorized, async (req, res) => {
  try {
    const { order, price } = req.body;
    const { id } = req.user;
    const newOrder = await prisma.order.create({
      data: {
        text: order,
        price,
        userId: id,
      },
    });

    return res.status(200).json({
      message: "order created",
      order: _.pick(newOrder, ["text", "price"]),
    });
  } catch (err) {
    console.log("[error]", err);
    res.status(500).json({ message: err.message });
  }
});

app.get("/orders", isAuthorized, async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: {
          select: {
            username: true
          }
        }
      }
    })
    return res.status(200).json(orders);
  } catch (err) {
    console.log("[error]", err);
    res.status(500).json({ message: err.message });
  }
})

app.get("/orders/users", isAuthorized, async (req, res) => {
  try {
    const orders = await prisma.user.findMany({
      select: {
        username: true,
        id: true,
        orders: true
      }
    })
    return res.status(200).json(orders);
  } catch (err) {
    console.log("[error]", err);
    res.status(500).json({ message: err.message });
  }
})

app.get("/orders/users/:userId", isAuthorized, async (req, res) => {
  try {
    const { userId } = req.params
    const parsedId = _.parseInt(userId)

    const orders = await prisma.order.findMany({
      where: {
        userId: parsedId
      }
    })
    return res.status(200).json(orders);
  } catch (err) {
    console.log("[error]", err);
    res.status(500).json({ message: err.message });
  }
})

const server = app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`);
});

const shutDown = async () => {
  await prisma.$disconnect();

  server.close(() => {
    console.log("Closed out remaining connections");
    process.exit(0);
  });

  setTimeout(() => {
    console.error(
      "Could not close connections in time, forcefully shutting down"
    );
    process.exit(1);
  }, 10000);
};

process.on("SIGTERM", shutDown);
process.on("SIGINT", shutDown);
