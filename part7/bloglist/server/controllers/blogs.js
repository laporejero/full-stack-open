const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

blogsRouter.get("/", async (request, response, next) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  });
  response.json(blogs);
});

blogsRouter.post("/", async (request, response, next) => {
  const body = request.body;
  const user = request.user;

  if (!user) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  if (!body.title || !body.url || !body.author) {
    return response.status(400).end();
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id,
  });

  const savedBlog = await blog.save();
  await savedBlog.populate("user", {
    username: 1,
    name: 1,
    id: 1,
  });

  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (request, response, next) => {
  const user = request.user;
  if (!user) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const blog = await Blog.findById(request.params.id);
  if (!blog) {
    return response.status(404).json({ error: "blog not found" });
  }

  if (blog.user._id.toString() === user._id.toString()) {
    await Blog.findByIdAndDelete(request.params.id);
    return response.status(204).end();
  }

  return response.status(403).json({ error: "user not authorized" });
});

blogsRouter.put("/:id", async (request, response, next) => {
  const body = request.body;

  const findBlogById = await Blog.findById(request.params.id);

  if (!findBlogById) {
    return response.status(404).json({ message: "Blog not found" });
  }

  findBlogById.likes = body.likes;

  const updatedBlog = await findBlogById.save();
  const populatedBlog = await updatedBlog.populate("user", {
    username: 1,
    name: 1,
    id: 1,
  });

  response.status(200).json(populatedBlog);
});

module.exports = blogsRouter;
