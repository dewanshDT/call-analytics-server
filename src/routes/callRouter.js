const { Router } = require("express")
const { createCall } = require("../controllers/callController.js")

const callRouter = Router()

callRouter.post("/calls", createCall)

module.exports = callRouter
