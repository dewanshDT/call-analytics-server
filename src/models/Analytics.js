import { Schema, model } from "mongoose"

const analyticsSchema = new Schema({
  CallID: { type: Schema.Types.ObjectId, ref: "Call" },
  Transcription: String,
  SentimentScore: Number,
  Keyword1: String,
  Keyword2: String,
})

const AnalyticsModel = model("Analytics", analyticsSchema)

export default AnalyticsModel
