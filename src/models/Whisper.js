import { Schema, model } from "mongoose";

const whisperSchema = new Schema({
  callID: { type: Schema.Types.ObjectId, ref: "Call" },
  audioFilePath: String,      
  transcription: String,      
  confidence: Number,         
  language: String,           
  createdAt: { type: Date, default: Date.now },
});

const WhisperModel = model("Whisper", whisperSchema);

export default WhisperModel;
