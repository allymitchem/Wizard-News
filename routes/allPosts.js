const express = require("express");
const router = express.Router();
const morgan = require("morgan");
const postBank = require("../postBank");
const timeAgo = require("node-time-ago");

const html = require("html-template-tag");

const posts = postBank.list();

const app = express();
app.use(morgan("dev"));
app.use(express.static("public"));

router.get("/", async (req, res) => {
  const html = `<!DOCTYPE html>
<html>
  <head>
    <title>Wizard News</title>
    <link rel="stylesheet" href="/style.css"/>
  </head>
  <body>
    <div class="news-list">
      <header><img src=
      "/logo.png"/>Wizard News</header>
        ${posts
          .map(
            (post) => `
          <div class='new-item'>
            <p>
              <span class="news=position">${post.id}. ▲ </span>
              <a href="/posts/${post.id}">${post.title}</a>
              <small>(by ${post.name})</small>
            </p>
            <small class="news-info">
              ${post.upvotes} upvotes | ${timeAgo(post.date)}
            </small>
          </div>`
          )
          .join("")}
    </div>
  </body>
</html>`;

  res.send(html);
});

module.exports = router;
