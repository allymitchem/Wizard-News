const express = require("express");
const morgan = require("morgan");
const postBank = require('./postBank');

const app = express();
app.use(morgan('dev'))

// app.get("/", (req, res) => res.send("Hello World!"));
app.get("/" , (req, res) => {
const posts = postBank.list()

const html = `<!DOCTYPE html>
<html>
  <head>
    <title>Wizard News</title>
  </head>
  <body>
    <ul>
      ${posts.map(post => `<li>${post.title
      } By: ${post.name}`)}</li>
     
    </ul>
  </body>
</html>`

res.send(html)
})
// console.log(post.title)
const PORT = 1337;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`, );
});
