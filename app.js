const express = require("express");
const morgan = require("morgan");
const postBank = require("./postBank");
const timeAgo = require('node-time-ago');
const routes = require("./routes/allPosts")


const app = express();
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(routes)


// app.get("/posts/:id", (req, res) => {
//   const id = req.params.id;
//   const post = postBank.find(id);

//   if (!post.id) {
//     throw new Error("error here");
//   }
//   const html = `<!DOCTYPE html>
//   <html>
//     <head>
//       <title>Wizard News</title>
//       <link rel="stylesheet" href="/style.css"/>
//     </head>
//     <body>
//     <header><img src= "/logo.png"/>Wizard News</header>
//     <p>
//     <span>${post.title}</span> <small> (by ${post.name})
//     </p>
//     <small>${post.date}</small>
//     <h2>${post.content}</h2>
//     </body>
//   </html>
//   `;

//   res.send(html);
// });

app.use((err, req, res, next) => {
  console.error(err.stack);

  const html = `<!DOCTYPE html>
  <html>
    <h2>Accio Page! 🧙‍♀️ ... Page Not Found </h2>
    <img src="/CatWizard.png"/>
  </html>`;

  res.status(404).send(html);
});

const PORT = 1337;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
