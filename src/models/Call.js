const { Schema, model } = require("mongoose")

const callSchema = new Schema({
  CallerID: { type: Schema.Types.ObjectId, ref: "User" },
  ReceiverID: { type: Schema.Types.ObjectId, ref: "User" },
  StartTime: Date,
  EndTime: Date,
  DurationSeconds: Number,
})

const CallModel = model("Call", callSchema)

module.exports = callSchema
