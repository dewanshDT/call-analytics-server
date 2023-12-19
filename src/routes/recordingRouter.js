import { Router } from "express"
import { createRecording, getRecordings } from "../controllers/recordingController.js"

const recordingRouter = Router()

recordingRouter.post("/recordings", createRecording)

recordingRouter.get("/recordings", getRecordings)

export default recordingRouter
