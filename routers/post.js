const express = require("express");
const User = require("../models/User");
const postRouter = express();
const { postValidation } = require("../validation");
const { caching, setCache } = require("../cache");
let cacheData = [];
// postRouter.get("/test", (req, res) => {
//   let counter = increment(1);
//   res.send({ message: counter });
// });
// GET
postRouter.get("/", async (req, res) => {
  try {
    const posts = await User.find();
    res.json(posts);
  } catch (err) {
    res.json({ message: err });
  }
});
// GET BY ID
postRouter.get("/:userID", async (req, res) => {
  try {
    const posts = await User.findOne({ userID: req.params.userID });
    res.json(posts);
  } catch (err) {
    res.json({ message: err });
  }
});

// POST
postRouter.post("/", async (req, res) => {
  const post = await req.body;
  const { error } = await postValidation(post);
  if (error) return res.status(400).send(error.details[0].message);

  const user = new User({
    gender: req.body.gender,
    userID: req.body.userID,
    name: req.body.name,
    location: { type: "Point", coordinates: req.body.location },
  });

  try {
    const savedPost = await user.save();
    res.json({
      message: savedPost,
    });
    console.log("Post saved");
  } catch (err) {
    assert.isNotOk(error, "Promise error");
    res.json({ message: err });
    done();
  }
});

// DISTANCE
postRouter.get("/distance/:userID", async (req, res) => {
  let data = caching();
  let isCache = true;
  if (data.length == 0) {
    const distance = await User.find({
      gender: req.query.gender,
      location: {
        $nearSphere: {
          $geometry: {
            type: "Point",
            coordinates: [req.query.long, req.query.lat],
          },
          $maxDistance: 10000000,
        },
      },
    });
    data = distance;
    setCache(data);
    isCache = false;
  }
  //
  // Delete duplicate
  const returnData = data.filter((item) => {
    if (item.userID === parseInt(req.params.userID)) {
      return false;
    } else {
      return true;
    }
  });

  //Pagination
  // const page = parseInt(req.query.page);
  // const limit = parseInt(req.query.limit);

  // const startIndex = (page - 1) * limit;
  // const endIndex = page * limit;

  // const result = {};

  // if (endIndex < returnData.length) {
  //   result.next = {
  //     page: page + 1,
  //     limit: limit
  //   };
  // }
  // if (startIndex > 0) {
  //   result.previous = {
  //     page: page - 1,
  //     limit: limit
  //   };
  // }

  result.resultData = returnData.slice(startIndex, endIndex);

  res.json({ isCache, data: result.resultData });
});
// DELETE USER
postRouter.delete("/delete/:idUser", async (req, res) => {
  try {
    const idUser = await User.deleteOne({ _id: req.params.idUser });
    res.json({ message: idUser });
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = postRouter;
