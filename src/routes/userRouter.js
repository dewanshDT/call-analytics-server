const { Router } = require("express")
const { createUser } = require("../controllers/userController.js")

const userRouter = Router()

userRouter.post("/users", createUser)

module.exports = userRouter
