const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      // required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    categories: [
      {
        type: String,
        required: false,
        ref: 'Category',
      },
    ],
    slug: {
      type: String,
      required: true,
      // unique: true,
    },
  },
  { timestamps: true },
);

PostSchema.virtual('url').get(function() {
  return `/posts/${this.slug}`;
});

module.exports = mongoose.model('Post', PostSchema);
