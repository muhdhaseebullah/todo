const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();

const crypto = require("crypto");
const async = require("async");
const xss = require("xss");
const _ = require("lodash");
const bcrypt = require("bcryptjs");
const PrintLog = require("../utils/req-body-logger");
const ResponseHelper = require("../utils/response-helper");
const { QueryTypes, Op } = require("sequelize");
const db = require("../models");
const upload = require("../config/multer-config");
process.on("uncaughtException", function (err) {
  console.log(err);
  console.log("uncaught exception in  {STACK TRACE :  %s}", err.stack);
});

router.post("/register", async function (req, res) {
  console.log("============= /register [ START ]==================");
  console.log("req: ", req.body);

  const { username, password, email } = req.body;
  if (username == "" || password == "" || email == "") {
    return res.send({ code: 400, message: "incomplete details" });
  } else {
    let sql = "SELECT * FROM users WHERE username = :username";
    let findusers = await db.sequelize.query(sql, {
      replacements: { username: username },
      type: QueryTypes.SELECT,
    });
    if (findusers.length > 0) {
      console.log("user already exists");
      return res.send({ code: 400, message: "user already exists" });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      let newUser = await db.users.create({
        username: username,
        password: hashedPassword,
        email: email,
      });
      if (newUser) {
        return res.send({ code: 200, message: "user added successfully" });
      } else {
        return res.send({ code: 400, message: "user not added" });
      }
    }

    // Insert the user into the database
  }
});

// Login API
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Retrieve the user from the database
  let sql = "SELECT * FROM users WHERE username = :username";
  let user = await db.sequelize.query(sql, {
    replacements: { username: username },
    type: QueryTypes.SELECT,
  });
  if (user.length > 0) {
    bcrypt.compare(password, user[0].password, (err, isMatch) => {
      if (!isMatch) {
        return res.send({ code: 401, message: "Inavalid Password" });
      } else {
        jwt.sign(
          { user },
          "secret_key",
          { expiresIn: "30000s" },
          (err, token) => {
            return res.send({
              code: 200,
              message: "login successfull",
              token: token,
            });
          }
        );
      }

      // Generate a JWT token
      // const token = jwt.sign({ id: results[0].id }, 'your_secret_key');

      // res.status(200).json({ token });
    });
  } else {
    return res.send({ code: 401, message: "Inavalid  UserName" });
  }
});

// Middleware to authenticate requests
const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    req.token = token;
    next();
  } else {
    res.send({ code: 401, message: "Token is invalid" });
  }
};

router.post("/gettodolist", verifyToken, async function (req, res) {
  console.log("------- gettodolist [START]------------");
  jwt.verify(req.token, "secret_key", async (err, authData) => {
    if (err) {
      res.send({ code: 401, message: error });
    } else {
      console.log("req: ", req.body);
      let userId = parseInt(req.body.userId);
      let sql = "SELECT * FROM todos WHERE userId = :userID";
      let user = await db.sequelize.query(sql, {
        replacements: { userID: userId }, // Use "userID" instead of "userId" in the replacements object
        type: QueryTypes.SELECT,
      });
      res.send({ code: 200, result: user });
    }
  });
});

router.post("/todo", async function (req, res) {
  console.log("============= /todolist [ START ]==================");
  console.log("req: ", req.body);

  const { userId, title, completed } = req.body;
  if (userId == "" || title == "" || completed == "") {
    return res.send({ code: 400, message: "incomplete details" });
  } else {
    let todo = await db.todos.create({
      userId: userId,
      title: title,
      completed: completed,
    });
    if (todo) {
      return res.send({ code: 200, message: "todo list added successfully" });
    } else {
      return res.send({ code: 400, message: "todo list not added" });
    }
  }
});

// Fetch TODO list API
router.get("/getUsers", verifyToken, async (req, res) => {
  // Retrieve TODO list from the database for the authenticated user
  jwt.verify(req.token, "secret_key", async (err, authData) => {
    if (err) {
      res.send({ code: 401, message: error });
    } else {
      let sql = "SELECT * FROM users ";
      let findusers = await db.sequelize.query(sql, {
        type: QueryTypes.SELECT,
      });
      res.send({ code: 200, result: findusers });
    }
  });
});

module.exports = router;
