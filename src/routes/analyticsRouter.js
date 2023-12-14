import { Router } from "express"
import { createAnalytics } from "../controllers/analyticsController.js"

const analyticsRouter = Router()

analyticsRouter.post("/analytics", createAnalytics)

export default analyticsRouter
