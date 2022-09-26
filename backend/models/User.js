const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      default: '',
    },
  },
  { timestamps: true },
);

UserSchema.virtual('url').get(function() {
  return `/user/${this.username}`;
});

module.exports = mongoose.model('User', UserSchema);
