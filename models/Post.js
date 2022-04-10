const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");

// creating user schema
const PostSchema = new Schema(
  {
    postText: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    username: {
      type: String,
      required: true,
    },
    // tying reactions to thought
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// get total count of friends
PostSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

// create the Post model using the PostSchema
const Post = model("Post", PostSchema);

// export the Post model
module.exports = Post ;
