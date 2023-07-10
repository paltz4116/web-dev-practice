const express = require("express");
const bcrypt = require(`bcryptjs`);

const db = require("../data/database");
const session = require("express-session");

const router = express.Router();

router.get("/", function (req, res) {
  res.render("welcome");
});

router.get("/signup", function (req, res) {
  res.render("signup");
});

router.get("/login", function (req, res) {
  res.render("login");
});

router.post("/signup", async function (req, res) {
  const userData = req.body;
  const email = userData.email;
  const confirmEmail = userData[`confirm-email`];
  const password = userData.password;

  if (
    !email ||
    !confirmEmail ||
    !password ||
    password.trim() < 3 ||
    email !== confirmEmail ||
    !email.includes(`@`)
  ) {
    console.log(`incorrect data`);
    return res.redirect(`/signup`);
  }

  const existingUser = await db
    .getDb()
    .collection(`users`)
    .findOne({ email: email });

  if (existingUser) {
    console.log(`existing user`);
    return res.redirect(`/signup`);
  }

  const hashedPwd = await bcrypt.hash(password, 12);

  const user = {
    email: email,
    password: hashedPwd,
  };

  await db.getDb().collection(`users`).insertOne(user);

  res.redirect(`/login`);
});

router.post("/login", async function (req, res) {
  const userData = req.body;
  const email = userData.email;
  const password = userData.password;

  const existingUser = await db
    .getDb()
    .collection(`users`)
    .findOne({ email: email });

  if (!existingUser) {
    console.log(`user email data is not existing`);
    return res.redirect(`/login`);
  }

  const pwdEqual = await bcrypt.compare(password, existingUser.password);

  if (!pwdEqual) {
    console.log(`password is not equal`);
    return res.redirect(`/login`);
  }

  req.session.user = { id: existingUser._id, email: existingUser.email };
  req.session.isAuthenticated = true;
  req.session.save(function () {
    res.redirect(`/admin`);
  });
});

router.get("/admin", function (req, res) {
  if(!req.session.isAuthenticated){
    return res.status(401).render(`401`);
  }

  res.render("admin");
});

router.post("/logout", function (req, res) {
  req.session.user = null;
  req.session.isAuthenticated = false;
  res.redirect(`/`);
});

module.exports = router;
