const express = require("express");
const router = express.Router();
const morgan = require("morgan");
const postBank = require("../postBank");
const timeAgo = require("node-time-ago");
const html = require("html-template-tag");

const app = express();
app.use(morgan("dev"));
app.use(express.static("public"));

router.get("/posts/:id", async (req, res, next) => {
  const id = req.params.id;
  const post = postBank.find(id);

  if (!post.id) {
    next({
      name: "wrong ID",
      message: "The ID provided does not match our database.",
    });
  } else {
    const html = `<!DOCTYPE html>
      <html>
        <head>
          <title>Wizard News</title>
          <link rel="stylesheet" href="/style.css"/>
        </head>
        <body>
        <header><img src= "/logo.png"/>Wizard News</header>
        <p>
        <span>${post.title}</span> <small> (by ${post.name})
        </p>
        <small>${timeAgo(post.date)}</small>
        <h2>${post.content}</h2>
        </body>
      </html>
      `;

    res.send(html);
  }
});

module.exports = router;
