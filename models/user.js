const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  typingmatches: [
    {
      _id: {
        type: mongoose.Types.ObjectId,
        unique: true,
      },
      wpm: {
        type: Number,
        required: true,
      },
      accuracy: {
        type: Number,
        required: true,
      },
    },
  ],
});

UserSchema.plugin(require("passport-local-mongoose"));
const User = mongoose.model("User", UserSchema);
module.exports = User;
