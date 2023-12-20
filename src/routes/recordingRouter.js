const express = require("express")
const { Router } = require("express")
const { v4: uuidv4 } = require("uuid")
const fs = require("fs")
const multer = require("multer")

const {
  createRecording,
  getRecordings,
  getRecordingById,
  deleteRecordingById,
  chunkyRecording,
} = require("../controllers/recordingController.js")
// const { openWhisperTranscribe } = require("../utils/whisper.js")

const recordingStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/recordings/")
  },
  filename: (req, file, cb) => {
    const fileExtension = file.originalname.split(".").pop()
    const uniqueFilename = `${uuidv4()}.${fileExtension}`
    req.uniqueFilename = uniqueFilename
    cb(null, uniqueFilename)
  },
})

const upload = multer({ storage: recordingStorage })

const recordingRouter = Router()

recordingRouter.post("/recordings", upload.single("audioData"), createRecording)
recordingRouter.post(
  "/recordings/chunk",
  upload.single("audioData"),
  chunkyRecording
)

recordingRouter.get("/recordings", getRecordings)

recordingRouter.get("/recordings/:id", getRecordingById)

recordingRouter.delete("/recordings/:id", deleteRecordingById)

// recordingRouter.post(
//   "/recordings/open",
//   upload.single("audioData"),
//   (req, res) => {
//     console.log(req.file.path)
//     openWhisperTranscribe(req.file.path)
//   }
// )

module.exports = recordingRouter
