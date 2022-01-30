// const userModel = require("../../models/user.model")
const Posts = require("../../models/posts.model");



class Post {
    static addPost = async(req, res) => {
        try {
            const post = new Posts({
                userId: req.user._id,
                ...req.body
            })
            console.log(post);
            // post.auth = req.user._id
            await post.save()
            res.status(200).send({
                apiStatus: true,
                data: post,
                message: "post inserted successfuly"
            })
        } catch (e) {
            res.status(500).send({
                apiStatus: false,
                data: e.message,
                message: "error adding user data"
            })
        }
    }

    static showPostsUser = async(req, res) => {
        try {
            let auth = req.user._id
            const allData = await Posts.find({ auth })
            res.status(200).send({
                apiStatus: true,
                data: allData,
                message: "data inserted successfuly"
            })
        } catch (e) {
            res.status(500).send({
                apiStatus: false,
                data: e.message,
                message: "error adding user data"
            })
        }
    }
    static like = async(req, res) => {
        // let alpost = await Posts.findByIdAndUpdate(req.params.postId, { $push: { likes: u } }, { runValidators: true })
        try {
            let u = req.user._id;
            var alpost = await Posts.findById(req.params.postId)
            var auth = u
            if (alpost.likes.includes(auth) == true) throw new Error("invalid code")
            alpost.likes.push(auth)
            await alpost.save()
            res.status(200).send({
                apiStatus: true,
                data: alpost,
            })
        } catch (e) {
            res.status(500).send({
                apiStatus: false,
                data: e,
            })
        }
    }
    static unlike = async(req, res) => {
        const u = req.user._id;
        let postId = req.params.postId
        const alpost = await Posts.findById(req.params.postId)
        alpost.likes = alpost.likes.filter(cos => {
            // console.log(cos != req.user._id)
            console.log(req.user._id)
            console.log(cos)
            console.log(req.user._id !== cos)
            return cos != req.user._id
        })
        await alpost.save()
        res.status(200).send({
            apiStatus: true,
            data: alpost.likes,
        })
    }
    static countLike = async(req, res) => {
        var alpost = await Posts.findById(req.params.postId)
        let count = alpost.likes.length
        res.status(200).send({
            apiStatus: true,
            data: count,
        })
    }
}


module.exports = Post