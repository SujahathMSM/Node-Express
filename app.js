const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const app = express();
const Blog = require("./Models/blog");

// Setting up DB connection
const dbC =
  "mongodb+srv://sujahath98:yr0qWQzhJQFbxcfX@backeddb.fypsocd.mongodb.net/?retryWrites=true&w=majority&appName=BackedDB";
mongoose
  .connect(dbC)
  .then(() => app.listen(3000))
  .catch((err) => console.log(err));

//Setting up EJS
app.set("view engine", "ejs");
// Middleware and static files - Making a file publicly available
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));

// route

app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// Blog routes

app.get("/blogs", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 }) // to sort by descending order - new to old
    .then((result) => {
      res.render("index", { title: "Blogs", blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

// handling POST requests
app.post("/blogs", (req, res) => {
  // console.log(req.body)
  const blog = new Blog(req.body);
  blog.save()
  .then((result) => {
    res.redirect("/blogs")
  })
  .catch((err) => {
    console.log(err)
  })
})


app.get('/blogs/:id', (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then(result => {
      res.render('details', { blog: result, title: 'Blog Details' });
    })
    .catch(err => {
      console.log(err);
    });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create a new Blog" });
});

// 404

app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
