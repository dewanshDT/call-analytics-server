const CallModel = require("../models/Call.js")

async function createCall(req, res) {
  try {
    const call = new CallModel(req.body)
    const savedCall = await call.save()
    res.json(savedCall)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = { createCall }
