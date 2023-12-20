const RecordingModel = require("../models/Recording.js")
const fs = require("fs")
const path = require("path")
const {
  bertModelAPI,
  emotionAPICall,
  huggingWhisperLargeV3,
  chunkyHuggingWhisperLargeV3,
} = require("../utils/whisper.js")

async function chunkyRecording(req, res) {
  const audioData = req.file

  if (audioData) {
    const whisperResult = await chunkyHuggingWhisperLargeV3(
      fs.readFileSync(audioData.path)
    )

    console.log(whisperResult)
  }
}

async function createRecording(req, res) {
  console.log("createRecording() called /api/recordings")

  const audioData = req.file
  console.log(audioData, "request body")
  if (audioData) {
    try {
      // Assuming the audio data is in req.body.audioData

      // Step 1: Convert audio to text using Whisper
      const whisperResult = await huggingWhisperLargeV3(
        fs.readFileSync(audioData.path)
      )

      console.log(whisperResult)

      // Step 2: Perform emotion analysis
      const emotionResult = await emotionAPICall({ inputs: whisperResult.text })

      console.log(emotionResult)

      // Step 3: Perform BERT analysis
      const bertResult = await bertModelAPI({ inputs: whisperResult.text })

      // Save the recording in your database with analysis results
      const recording = new RecordingModel({
        FilePath: audioData.path.split("public/")[1],
        Transcription: whisperResult.text,
        EmotionAnalytics: emotionResult[0],
        BertAnalytics: bertResult,
      })

      await recording.save()

      // // Save the recording file in the public folder with the ID as the name
      // const recordingFileName = `${recording._id}.wav`; // Assuming the file type is wav
      // const publicFolderPath = path.join(__dirname, "../public/recordings");
      // const filePath = path.join(publicFolderPath, recordingFileName);

      // // Create the public folder if it doesn't exist
      // if (!fs.existsSync(publicFolderPath)) {
      //   fs.mkdirSync(publicFolderPath, { recursive: true });
      // }

      // // Save the audio data to the file
      // fs.writeFileSync(filePath, audioData);

      // Respond with the saved recording
      return res.json(recording)
    } catch (error) {
      console.error(error)
      return res.status(500).json({ error: "Internal server error" })
    }
  } else {
    return res.status(400).json({ error: "no file provided" })
  }
}

async function getRecordings(req, res) {
  try {
    const recordings = await RecordingModel.find().populate("CallID")
    res.json(recordings)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

async function getRecordingById(req, res) {
  try {
    const recordingId = req.params.id // Assuming the ID is passed as a route parameter

    // Find the recording by ID in the database
    const recording = await RecordingModel.findById(recordingId)

    if (!recording) {
      return res.status(404).json({ error: "Recording not found" })
    }

    // Return the recording details
    return res.json(recording)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: "Internal server error" })
  }
}

const deleteRecordingById = async (req, res) => {
  const recordingId = req.params.id

  try {
    // Find the recording by ID in the database
    const recording = await RecordingModel.findById(recordingId)

    if (!recording) {
      return res.status(404).json({ error: "Recording not found" })
    }

    // Delete the associated file from the folder
    const filePath = path.join(__dirname, "../../public", recording.FilePath)
    if (filePath) fs.unlinkSync(filePath)

    // Delete the recording from the database
    await recording.deleteOne()

    res.json({ message: "Recording deleted successfully" })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Internal server error" })
  }
}

module.exports = {
  createRecording,
  getRecordings,
  getRecordingById,
  deleteRecordingById,
  chunkyRecording,
}
