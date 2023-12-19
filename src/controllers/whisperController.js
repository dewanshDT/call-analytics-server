import WhisperModel from "../models/Whisper.js"

export async function createWhisper(req, res) {
  try {
    const whisper = new WhisperModel(req.body)
    const savedWhisper = await whisper.save()
    res.json(savedWhisper)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
