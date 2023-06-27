const express = require("express");
const mongodb = require(`mongodb`);

const db = require(`../data/database`);

const ObjectId = mongodb.ObjectId;

const router = express.Router();

router.get("/", function (req, res) {
  res.redirect("/posts");
});

router.get("/posts", function (req, res) {
  res.render("posts-list");
});

router.get("/new-post", async function (req, res) {
  const authors = await db.getDb().collection(`authors`).find().toArray();
  res.render("create-post", { authors: authors });
});

router.post(`/posts`, async function (req, res) {
  const author = await db.getDb().collection(`authors`).findOne({ _id: new ObjectId(req.body.author) });

  const newPost = {
    title: req.body.title,
    summary: req.body.summary,
    body: req.body.content,
    date: new Date(),
    author: {
      id: author._id,
      name: author.name,
      email: author.email
    }
  };

  await db.getDb().collection(`posts`).insertOne(newPost);

  res.redirect(`/posts`);
});

module.exports = router;
