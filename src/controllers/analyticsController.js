const AnalyticsModel = require("../models/Analytics")

async function createAnalytics(req, res) {
  try {
    const analytics = new AnalyticsModel(req.body)
    const savedAnalytics = await analytics.save()
    res.json(savedAnalytics)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = { createAnalytics }
