import { Router } from "express"
import {
  createRecording,
  getRecordings,
} from "../controllers/recordingController.js"

import { v4 as uuidv4 } from "uuid"

import multer from "multer"

const recordingStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/")
  },
  filename: (req, file, cb) => {
    const fileExtension = file.originalname.split(".").pop()
    const uniqueFilename = `${uuidv4()}.${fileExtension}`
    cb(null, uniqueFilename)
  },
})

const upload = multer({ storage: recordingStorage })

const recordingRouter = Router()

recordingRouter.post("/recordings", upload.single("audioData"), createRecording)

recordingRouter.get("/recordings", getRecordings)

export default recordingRouter
