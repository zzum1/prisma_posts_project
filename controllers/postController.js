const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createPost = async (req, res) => {
  const { title, content } = req.body;

  const userId = req.user.id;

  try {
    const post = await prisma.posts.create({
      data: {
        title,
        content,
        userId,
      },
    });
    res.status(201).json({ message: "Post has been created!", post });
  } catch (error) {
    res.status(500).json({ message: "Error while creating a post", error });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await prisma.posts.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        userId: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return res
      .status(200)
      .json({ message: "Posts has been fetched successfully", posts });
  } catch (error) {
    res.status(500).json({ message: "Error while fetching posts", error });
  }
};

const getSinglePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await prisma.posts.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!post) {
      return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json({ message: "Success", post });
  } catch (error) {
    res.status(500).json({ message: "Server error!" });
  }
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  const post = await prisma.posts.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!post) {
    return res.status(404).json({ message: "Not found" });
  }

  if (post.userId !== userId) {
    return res
      .status(403)
      .json({ message: "You can only delete your own posts!" });
  }

  try {
    const post = await prisma.posts.update({
      where: {
        id: parseInt(id),
      },
      data: req.body,
    });
    res.status(201).json({ message: "Post was updated", post });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  const post = await prisma.posts.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!post) {
    return res.status(404).json({ message: "Not found" });
  }

  if (post.userId !== userId) {
    return res
      .status(403)
      .json({ message: "You can only delete your own posts!" });
  }

  try {
    const post = await prisma.posts.delete({
      where: {
        id: parseInt(id),
      },
      data: req.body,
    });
    res.status(201).json({ message: "Post was deleted", post });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getSinglePost,
  updatePost,
  deletePost,
};
