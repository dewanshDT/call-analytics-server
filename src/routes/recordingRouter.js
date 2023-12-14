import { Router } from "express"
import { createRecording } from "../controllers/recordingController.js"

const recordingRouter = Router()

recordingRouter.post("/recordings", createRecording)

export default recordingRouter
