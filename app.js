const express = require("express");
const morgan = require("morgan");
const postBank = require('./postBank');

const app = express();
app.use(morgan('dev'))
app.use(express.static('public'))

// app.get( '/posts/:id', (req, res) => {
//   console.log( req.params.id ); // --> '7'
// });


app.get("/" , (req, res) => {
  const posts = postBank.list()

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
        ${posts.map(post => `
          <div class='new-item'>
            <p>
              <span class="news=position">${post.id}. ▲ </span>
              <a href="/posts/${post.id}">${post.title}</a>
              <small>(by ${post.name})</small>
            </p>
            <small class="news-info">
              ${post.upvotes} upvotes | ${post.date}
            </small>
          </div>`
        ).join('')}
    </div>
  </body>
</html>`

res.send(html)
})

app.get('/posts/:id', (req, res) => {
  const id = req.params.id;
  const post = postBank.find(id);

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
    <small>${post.date}</small>
    <h2>${post.content}</h2>
    </body>
  </html>
  `

  // const html = 
  // `<!DOCTYPE html>
  // <html>
  //   <head>
  //     <title>Wizard News</title>
  //     <link rel="stylesheet" href="/style.css"/>
  //   </head>
  //   <body>
  //     <div class="news-list">
  //       <header><img src=
  //       "/logo.png"/>Wizard News</header>
  //         ${posts.map(post => `
  //           <div class='new-item'>
  //             <p>
  //               <span class="news=position">${post.id}. ▲ </span>
  //               <a href="/posts/${post.id}">${post.title}</a>
  //               <small>(by ${post.name})</small>
  //             </p>
  //             <small class="news-info">
  //               ${post.upvotes} upvotes | ${post.date}
  //             </small>
  //           </div>`
  //         ).join('')}
  //     </div>
  //   </body>
  // </html>`

  res.send(html);
});

const PORT = 1337;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`, );
});
