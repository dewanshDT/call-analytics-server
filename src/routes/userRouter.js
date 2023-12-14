import { Router } from "express"
import { createUser } from "../controllers/userController.js"

const userRouter = Router()

userRouter.post("/users", createUser)

export default userRouter
