const express = require("express");
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();

const dbC = "mongodb+srv://sujahath98:yr0qWQzhJQFbxcfX@backeddb.fypsocd.mongodb.net/?retryWrites=true&w=majority&appName=BackedDB";
mongoose.connect(dbC)
.then(() => app.listen(3000))
.catch((err) => console.log(err))

app.set("view engine", "ejs");
;

app.use(morgan('dev'))

// Middleware and static files - Making a file publicly available
app.use(express.static("public"));

app.get("/", (req, res) => {
  const blogs = [
    {
      title: "Yoshi finds eggs",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
    {
      title: "Mario finds stars",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
    {
      title: "How to defeat bowser",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
  ];
  res.render("index", { title: "Home" , blogs});
});


app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// redirect

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create a new Blog" });
});

// 404

app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
