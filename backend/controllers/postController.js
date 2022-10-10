const slugify = require('slugify');

// Post model
const Post = require('../models/Post');

// Get list of all posts // GET // Complete
exports.getPosts = async (req, res, next) => {
  const posts = await Post.find();
  if (posts) {
    res.status(200).json(posts);
  } else {
    res.status(400);
    throw new Error('No posts found');
  }
};

// Get list of all posts of category // GET
exports.getCategoryPosts = async (req, res, next) => {
  const posts = await Post.find({
    categories: {
      $in: [req.params.post],
    },
  });
  if (posts) {
    res.status(200).json(posts);
  } else {
    res.status(400);
    throw new Error('No posts found');
  }
  res.status(200).json(`Get list of all posts of post ${req.params.post}`);
  // res.status(200).json(posts);
};

// Get specific post // GET
exports.postDetail = async (req, res, next) => {
  const post = await Post.findOne({ slug: req.params.slug });
  if (!post) {
    res.status(400);
    throw new Error('Post not found');
  }
  res.status(200).json(post);
  // res.status(200).json(`Get specific post: ${req.params.id}`);
};

// Create a new post // POST // Complete
exports.createPost = async (req, res, next) => {
  const { title, body, username } = req.body;
  if (!title || !body || !username) {
    res.status(400);
    throw new Error('Please add text');
  }

  // generate slug
  let slug = slugify(req.body.title, { remove: /[*+~.()'"!:@]/g, lower: true });
  const extraId = Math.floor(Math.random() * 10_000);
  slug += `-${extraId.toString()}`;

  const newPost = await Post.create({
    title: req.body.title,
    body: req.body.body,
    photo: req.body.photo,
    username: req.body.username.toLowerCase(),
    categories: req.body.categories,
    slug,
  });
  // res.status(200).json('New post created');
  res.status(200).json(newPost);
};

// Update a post // PUT
exports.updatePost = async (req, res, next) => {
  const post = await Post.findOne({ slug: req.params.slug });
  if (!post) {
    res.status(400);
    throw new Error('Post does not exist');
  }

  if (!req.body.username) {
    res.status(400);
    throw new Error('Post does not exist');
  }

  if (post.username !== req.body.username) {
    res.status(401);
    throw new Error('Use not authorized');
  }

  const updatedPost = await Post.findOneAndUpdate(
    req.params.slug,
    {
      $set: req.body,
    },
    { new: true },
  );
  res.status(200).json(updatedPost);
};

// Delete a specifc post // DELETE // Complete
exports.deletePost = async (req, res, next) => {
  const post = await Post.findOne({ slug: req.params.slug });
  if (!post) {
    res.status(400);
    throw new Error('Post does not exist');
  }

  if (!req.body.username) {
    res.status(400);
    throw new Error('User not found');
  }

  if (post.username !== req.body.username.toLowerCase()) {
    res.status(401);
    throw new Error('Use not authorized');
  }

  await post.remove();
  res.status(200).json('Post has been deleted');
};
