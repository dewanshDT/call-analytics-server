import { Schema, model } from "mongoose"

const recordingSchema = new Schema({
  CallID: { type: Schema.Types.ObjectId, ref: "Call" },
  FilePath: String,
})

const RecordingModel = model("Recording", recordingSchema)

export default RecordingModel
