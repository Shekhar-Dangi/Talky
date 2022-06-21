const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const auth = require("./routes/auth.js");
const user = require("./routes/user.js");
const message = require("./routes/message.js");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");
const User = require("./models/User.js");
const moment = require("moment");

const app = express();

const server = http.createServer(app);

const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(`${__dirname}/public`));


// Connecting to DB
mongoose.connect(
  process.env.CONNECTION_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("MongoDB Connected!");
  }
);

app.use("/auth", auth);
app.use("/user", user);
app.use("/message", message);

app.get("/", (req, res) => {
  res.send("Hello beta!");
});

// SOCKET IO
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.use((socket, next) => {
  const email = socket.handshake.auth.email;
  if (!email) {
    return next(new Error("invalid email"));
  }
  socket.email = email;
  next();
});

const getId = (email) => {
  for (let [id, socket] of io.of("/").sockets) {
    if (socket.email === email) return id;
  }
};

io.on("connection", (current) => {
  const users = [];

  const contacts = current.handshake.auth.contacts;
  const currentEmail = current.handshake.auth.email;
  console.log(currentEmail + " connected!");

  for (let [id, socket] of io.of("/").sockets) {
    if (contacts.includes(socket.email)) {
      io.to(id).emit("user", { userId: current.id, email: currentEmail });
      users.push({ userId: id, email: socket.email });
    }
  }
  current.emit("users", users);
  current.on("disconnect", async () => {
    console.log(currentEmail + " DISCONNECTED!");
    await User.updateOne(
      { email: currentEmail },
      { lastSeen: moment().format("HH:mm") }
    );
    for (let [id, socket] of io.of("/").sockets) {
      if (contacts.includes(socket.email)) {
        io.to(id).emit("remove_user", {
          userId: current.id,
          email: currentEmail,
        });
      }
    }
  });
  current.on("new_contact", ({ email, userEmail, userId }) => {
    let user = { userId, email: userEmail };

    let id = getId(email);
    if (id) io.to(id).emit("new_contact", user);
  });
  current.on("contact_response", ({ email, userId, emitTo }) => {
    let user = { userId, email };
    if (userId) io.to(emitTo).emit("contact_response", user);
  });
  current.on("message", ({ email, message }) => {
    let id = getId(email);
    if (id) {
      io.to(id).emit("message", message);
    }
  });
  current.on("sendseen", ({ email, to, id }) => {
    let toId = getId(to);
    if (toId) io.to(toId).emit("seen", { email, id });
  });
  current.on("typing", ({ email, to }) => {
    let id = getId(to);
    if (id) io.to(id).emit("user_typing", email);
  });
  current.on("not_typing", ({ email, to }) => {
    let id = getId(to);
    if (id) io.to(id).emit("user_not_typing", email);
  });
});

server.listen(PORT, () => {
  console.log(`Server running at Port ${PORT}`);
});
