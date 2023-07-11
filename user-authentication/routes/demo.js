const express = require("express");
const bcrypt = require(`bcryptjs`);

const db = require("../data/database");
const session = require("express-session");

const router = express.Router();

router.get("/", function (req, res) {
  res.render("welcome");
});

router.get("/signup", function (req, res) {
  let sessionInputData = req.session.inputData;

  if (!sessionInputData) {
    sessionInputData = {
      hasError: false,
      email: ``,
      confirmedEmail: ``,
      password: ``,
    };
  }

  req.session.inputData = null;

  res.render("signup", { inputData: sessionInputData });
});

router.get("/login", function (req, res) {
  let sessionInputData = req.session.inputData;

  if (!sessionInputData) {
    sessionInputData = {
      hasError: false,
      email: ``,
      password: ``,
    };
  }

  req.session.inputData = null;

  res.render("login", { inputData: sessionInputData });
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
    req.session.inputData = {
      hasError: true,
      message: `invaild input.`,
      email: email,
      confirmedEmail: confirmEmail,
      password: password,
    };

    req.session.save(function () {
      res.redirect(`/signup`);
    });

    return;
  }

  const existingUser = await db
    .getDb()
    .collection(`users`)
    .findOne({ email: email });

  if (existingUser) {
    req.session.inputData = {
      hasError: true,
      message: `User exists already.`,
      email: email,
      confirmedEmail: confirmEmail,
      password: password,
    };
    req.session.save(function () {
      res.redirect(`/signup`);
    });

    return;
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
    req.session.inputData = {
      hasError: true,
      message: `Could not log in.`,
      email: email,
      password: password,
    };

    req.session.save(function () {
      res.redirect(`/login`);
    });

    return;
  }

  const pwdEqual = await bcrypt.compare(password, existingUser.password);

  if (!pwdEqual) {
    req.session.inputData = {
      hasError: true,
      message: `Could not log in.`,
      email: email,
      password: password,
    };

    req.session.save(function () {
      res.redirect(`/login`);
    });

    return;
  }

  req.session.user = { id: existingUser._id, email: existingUser.email };
  req.session.isAuthenticated = true;
  req.session.save(function () {
    res.redirect(`/profile`);
  });
});

router.get("/admin", function (req, res) {
  if (!res.locals.isAuth) {
    return res.status(401).render(`401`);
  }

  if (!res.locals.isAdmin) {
    return res.status(403).render(`403`);
  }

  res.render("admin");
});

router.get("/profile", function (req, res) {
  if (!res.locals.isAuth) {
    return res.status(401).render(`401`);
  }

  res.render("profile");
});

router.post("/logout", function (req, res) {
  req.session.user = null;
  req.session.isAuthenticated = false;
  res.redirect(`/`);
});

module.exports = router;
