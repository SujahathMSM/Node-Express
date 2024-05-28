const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const app = express();
const blogRoutes = require('./routes/blogRoutes')

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


// Blog Route
app.use('/blogs',blogRoutes);

// 404
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
