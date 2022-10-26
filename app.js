const express = require("express");
const morgan = require("morgan");
const postBank = require("./postBank");

const routes = require("./routes/allPosts");
const singleRoutes = require("./routes/singlePosts");
const html = require ("html-template-tag")

const app = express();
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(routes, singleRoutes);



app.get("*", (req, res) => {
  const html = `<!DOCTYPE html>
  <html>
  <head><link rel="stylesheet" href="/style.css"/></head>
  <body class="background">
    <h2 class="messages" >Accio Page! 🧙‍♀️ ... Page Not Found </h2>
    <img class= "images" src="/CatWizard.png"/>
  </body>
  </html>`;

  res.status(404).send(html);
});

app.use((error, req, res, next) => {
 
  const html = `<!DOCTYPE html>

  <html>
  
  <head><link rel="stylesheet" href="/style.css"/></head>
  <body class = "background">
  
    <h2 class="messages">"Don’t put your wand there, boy! … Better wizards than you have lost buttocks, you know."
    -Mad-Eye Meowdy</h2>
    
    
    <small class="errorMessage">This page does not exist.</small>
    <img class="images" src="/MadEyedMeowdy.png"/>
    </body>
  </html>`
  res.status(500).send(html);
 
});

const PORT = 1337;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
