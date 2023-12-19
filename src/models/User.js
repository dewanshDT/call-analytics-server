const { Schema, model } = require("mongoose")

const userSchema = new Schema({
  UserName: String,
  Email: String,
  PasswordHash: String,
})

const UserModel = model("User", userSchema)

module.exports = userSchema
