const { Schema, model } = require("mongoose")

const recordingSchema = new Schema({
  CallID: { type: Schema.Types.ObjectId, ref: "Call" },
  FilePath: String,
  Transcription: String,
  EmotionAnalytics: [
    {
      label: String,
      score: Number,
    },
  ],
  BertAnalytics: [
    [
      {
        label: String,
        score: Number,
      },
    ],
  ],
})

const RecordingModel = model("Recording", recordingSchema)

module.exports = RecordingModel
