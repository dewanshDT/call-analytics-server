import { Router } from "express"
import { createUser } from "../controllers/whisperController.js"

const whisperRouter = Router()

whisperRouter.post("/whispers", createUser)

export default whisperRouter
