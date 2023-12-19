const { Router } = require("express")
const { createWhisper } = require("../controllers/whisperController.js")

const whisperRouter = Router()

whisperRouter.post("/whispers", createWhisper)

module.exports = whisperRouter
