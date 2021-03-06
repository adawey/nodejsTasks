const mongoose = require("mongoose")
const validator = require('validator')
const bcryptjs = require("bcryptjs")
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    age: {
        type: Number,
        min: 21,
        required: true
    },
    password: {
        type: String,
        minlength: 6,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) throw new Error("invalid email format")
        }
    },
    gender: {
        type: String,
        trim: true,
        required: true,
        enum: ["male", "female"]
    },
    status: {
        type: Boolean,
        default: false
    },
    img: {
        type: String
    },
    tokens: [{
        token: { type: String, required: true }
    }],
    otp: {
        type: String,
        default: Date.now()
    }
}, { timestamps: true })

userSchema.methods.toJSON = function() {
    const user = this.toObject()
    delete user.__v
    delete user.password
        // delete user.tokens
    return user
}

//update save
userSchema.pre("save", async function() {
    const user = this
    if (user.isModified("password"))
        user.password = await bcryptjs.hash(user.password, 12)
})

//login user
userSchema.statics.loginUser = async(email, password) => {
        const user = await User.findOne({ email })
        if (!user) throw new Error("invalid user email")
        const isValid = await bcryptjs.compare(password, user.password)
        if (!isValid) throw new Error("invalid password")
        return user
    }
    //generate token
const jwt = require("jsonwebtoken")
userSchema.methods.generateToken = async function() {
    const user = this
    const token = jwt.sign({ _id: user._id }, "123") //user{_id:1}
        // console.log(user.tokens);
    user.tokens.push({ token })
        // console.log(user.tokens);
    await user.save()
    return token
}
const User = mongoose.model("User", userSchema)
module.exports = User