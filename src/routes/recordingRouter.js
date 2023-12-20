const express = require("express")
const { Router } = require("express")
const { v4: uuidv4 } = require("uuid")
const multer = require("multer")

const {
  createRecording,
  getRecordings,
  getRecordingById,
  deleteRecordingById,
} = require("../controllers/recordingController.js")

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

recordingRouter.get("/recordings", getRecordings)

recordingRouter.get("/recordings/:id", getRecordingById)

recordingRouter.delete("/recordings/:id", deleteRecordingById)

module.exports = recordingRouter
