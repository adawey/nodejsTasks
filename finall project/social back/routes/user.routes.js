const router = require('express').Router()
const userController = require("../app/controller/user.controller")
const auth = require("../middleware/auth")
router.post("/register", userController.addUser)
router.post("/login", userController.login)
router.get("/all", userController.showAll)
router.get("/all/:id", userController.showSingle)

router.get("/me", auth, userController.me)
router.post("/logout", auth, userController.logOut)
router.post("/logoutAll", auth, userController.logOutAll)



module.exports = router