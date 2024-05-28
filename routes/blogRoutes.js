const express = require("express");
const Blog = require("../Models/blog");
const router = express.Router();
const blogcontoller = require('../Controllers/blogController')
// Blog routers

// View All blogs
router.get("/", blogcontoller.blog_index);

// handling POST requests
router.post("/", blogcontoller.blog_post);

// Creating new blog
router.get("/create", blogcontoller.blog_create);

//View a single blog
router.get("/:id", blogcontoller.blog_single);

// De
router.delete("/:id", blogcontoller.blog_delete);

module.exports = router
