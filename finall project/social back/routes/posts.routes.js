const router = require('express').Router()
const PostController = require("../app/controller/posts.controller")
const auth = require("../middleware/auth")
const postModel = require("../models/posts.model")



router.post("/post", auth, PostController.addPost)
router.get("/me", auth, PostController.showPostsUser)
router.get("/myPosts", async(req, res) => {
    try {
        let pros = await postModel.find({ userId: '61ec06ea958b24ed4e5f35f1' }).populate("userId")
        res.send(pros)
    } catch (e) {
        res.send(e)
    }
})
router.post("/like/:postId", auth, PostController.like)
router.post("/unlike/:postId", auth, PostController.unlike)
router.get("/count/:postId", auth, PostController.countLike)
module.exports = router