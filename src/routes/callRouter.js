import { Router } from "express"
import { createCall } from "../controllers/callController.js"

const callRouter = Router()

callRouter.post("/calls", createCall)

export default callRouter
