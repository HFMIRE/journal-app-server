const express = require("express");
const { User, Entries } = require("./db");
const bcyrpt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { verifyToken } = require("./auth");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static("public"));

app.post("/users", async (req, res) => {
  const { username, password } = req.body;
  const passwordHash = await bcyrpt.hash(password, 10);
  await User.create({ username, passwordHash });
  res.sendStatus(201);
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userRecord = await User.findOne({ where: { username } });
  const verfiyUser = await bcyrpt.compare(password, userRecord.passwordHash);
  res.status(200);
  if (verfiyUser) {
    const token = jwt.sign({ userid: userRecord.id }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
    return res.json({ token, userid: userRecord.id });
  } else {
    res.sendStatus(404);
  }
});

app.get("/users/:userid", async (req, res) => {
  const userId = req.params.userid;
  const findByUserId = await User.findByPk(userId);
  res.send(findByUserId);
});

app.delete("/users/:userid", async (req, res) => {
  const userId = req.params.userid;
  const userToDelete = await User.findByPk(userId);
  try {
    await userToDelete.destroy();
    res.sendStatus(200);
  } catch {
    res.sendStatus(500);
  }
});
// entries
// Jwt token should taken user Id not username
app.post("/users/:userid/entries", verifyToken, async (req, res) => {
  const UserId = req.params.userid;
  const { name, description } = req.body;
  await Entries.create({ name, description, UserId });
  res.sendStatus(201);
});

//get all entry by user
app.get("/users/:userid/entries", verifyToken, async (req, res) => {
  const UserId = req.params.userid;
  const findByUserId = await Entries.findAll({ where: { UserId: UserId } });
  res.json(findByUserId);
});

app.get("/users/:userid/entries/:entriesid", verifyToken, async (req, res) => {
  const EntriesId = req.params.entriesid;
  const findByEntriesId = await Entries.findByPk(EntriesId);
  res.send(findByEntriesId);
});

app.put("/users/:userid/entries/:entriesid", verifyToken, async (req, res) => {
  const { name, description } = req.body;
  const EntriesId = req.params.entriesid;
  const findByEntriesId = await Entries.findByPk(EntriesId);
  try {
    await findByEntriesId.update({ name, description });
    res.sendStatus(200);
  } catch {
    res.sendStatus(500);
  }
});

app.delete(
  "/users/:userid/entries/:entriesid",
  verifyToken,
  async (req, res) => {
    const EntriesId = req.params.entriesid;
    const entriesToDelete = await Entries.findByPk(EntriesId);
    try {
      await entriesToDelete.destroy();
      res.sendStatus(200);
    } catch {
      res.sendStatus(500);
    }
  }
);

app.listen(process.env.PORT || 5000);

module.exports = app;
