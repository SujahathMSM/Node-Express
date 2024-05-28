const Blog = require("../Models/blog");

// View All blogs
const blog_index = (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 }) // to sort by descending order - new to old
    .then((result) => {
      res.render("index", { title: "Blogs", blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
};

// Add a new blog and view
const blog_post = (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then((result) => {
      res.redirect("/blogs");
    })
    .catch((err) => {
      console.log(err);
    });
};

// To go and Create a new blog
const blog_create = (req, res) => {
  res.render("create", { title: "Create a new Blog" });
};

// View a more about a blog in Main page
const blog_single = (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      console.log(result);
      res.render("details", { title: "Blog Details", blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
};

// Delete a blog
const blog_delete = (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = {
  blog_index,
  blog_create,
  blog_post,
  blog_single,
  blog_delete
};
