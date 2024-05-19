const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.listen(3000, () => {
  console.log("Listening on port 3000");
});

// Let demonstrate how Middleware works
app.use((req, res, next) =>  {
  console.log("getting a request")
  console.log(req.url)
  console.log(req.method)
  next();
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
  res.render("index", { title: "Home" , blogs});
});

app.use((req, res, next) => {
  console.log("Another Middleware")
  next();
})

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
