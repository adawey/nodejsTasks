const userModel = require("../../models/user.model")
const emailHelper = require("../helper/sendMail.helper")
const otpGenerator = require('otp-generator')
class User {
    static addUser = async(req, res) => {
        try {
            let user = new userModel(req.body)
            user.otp = otpGenerator.generate(12);
            await user.save()
            emailHelper(user.email, `http://localhost:3000/user/activate/${user.otp}/${user._id}`)
            res.status(200).send({
                apiStatus: true,
                data: user,
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

    static showAll = async(req, res) => {
        try {
            const allData = await userModel.find()
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
    static showSingle = async(req, res) => {
        try {
            const user = await userModel.findById(req.params.id)
            let message = "data inserted successfuly"
            let mStatus = 200
            if (!user) {
                message = "user not found";
                mStatus = 404
            }
            res.status(mStatus).send({
                apiStatus: true,
                data: user,
                message
            })
        } catch (e) {
            res.status(500).send({
                apiStatus: false,
                data: e.message,
                message: "error adding user data"
            })
        }

    }
    static login = async(req, res) => {
        try {
            let user = await userModel.loginUser(req.body.email, req.body.password)
            let token = await user.generateToken()
            res.status(200).send({ apiStatus: true, data: user, message: "logged in" })
        } catch (e) {
            res.status(500).send({ apiStatus: false, data: e.message, message: "invalid data" })
        }
    }
    static me = async(req, res) => {
        res.status(200).send({ apiStatus: true, data: req.user, message: "data featched" })
    }
    static logOut = async(req, res) => {
        try {
            req.user.tokens = req.user.tokens.filter(t => {
                return t.token != req.token
            })
            await req.user.save()
            res.send("logged out")
        } catch (e) {
            res.status(500).send({ apiStatus: false, data: e.message })
        }

    }
    static logOutAll = async(req, res) => {
        try {
            req.user.tokens = []
            await req.user.save()
            res.send("logged out")
        } catch (e) {
            res.status(500).send({ apiStatus: false, data: e.message })
        }
    }

}
module.exports = User