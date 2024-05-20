const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const app = express();
const Blog = require("./Models/blog");

// Setting up DB connection
const dbC =
  "mongodb+srv://sujahath98:<pwd>@backeddb.fypsocd.mongodb.net/?retryWrites=true&w=majority&appName=BackedDB";
mongoose
  .connect(dbC)
  .then(() => app.listen(3000))
  .catch((err) => console.log(err));

//Setting up EJS
app.set("view engine", "ejs");
// Middleware and static files - Making a file publicly available
app.use(morgan("dev"));
app.use(express.static("public"));

// Mongoose and Mongo sandbox routes
// to send a blog to database

app.get("/add-blog", (req, res) => {
  const blog = new Blog({
    title: "My new Blog 2",
    snippet: "This is a sippet of my new blog 2",
    body: "Here you can read more about my new blog 2",
  });

  blog
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

// to get all the blogs from DB
app.get("/all-blogs", (req, res) => {
  Blog.find().then((result) => {
    res.send(result);
  });
});

// to get a single blog 
app.get('/single-blog', (req, res) => {
  Blog.findById("664b53bb7f8c25838731f585")
  .then((result) => {
    res.send(result)
  })
  .catch((err) => {
    console.log(err)
  })
})

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
  res.render("index", { title: "Home", blogs });
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
