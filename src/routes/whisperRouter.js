import { Router } from "express"

const whisperRouter = Router()

whisperRouter.post("/whispers", whisperRouter)

export default whisperRouter
