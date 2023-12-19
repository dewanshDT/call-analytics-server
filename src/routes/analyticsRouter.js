const { Router } = require("express")
const { createAnalytics } = require("../controllers/analyticsController.js")

const analyticsRouter = Router()

analyticsRouter.post("/analytics", createAnalytics)

module.exports = analyticsRouter
