const connection = require("../config/connection");
const {User, Post} = require("../models")
const sampleData = require("./data");

console.log(sampleData);
connection.on("error", (err) => err);
connection.once("open", async () => {
  console.log("connected");
  await Post.deleteMany({});
  await User.deleteMany({});
  const userArray = [];
  const postArray = [];
  const reactionArray = [];
  for (let i = 0; i < sampleData.userNames.length; i++) {
    const username = sampleData.userNames[i];
    const email = sampleData.email[i];
    const post = sampleData.sampleText[i];
    const friend =
      sampleData.userNames[
        Math.floor(Math.random() * sampleData.userNames.length)
      ];
    postArray.push({ postText: post, username: username });
    userArray.push({
      username,
      email,
      posts:[post],
      friends:[friend],
    });
    reactionArray.push({ postText: post, username: username})
  }
  await User.collection.insertMany(userArray);
  await Post.collection.insertMany(postArray);
  console.log(userArray);
  console.log(postArray);
  console.log(reactionArray)
  process.exit(0);
});
