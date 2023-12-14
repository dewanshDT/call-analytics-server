import { Schema, model } from "mongoose"

const userSchema = new Schema({
  UserName: String,
  Email: String,
  PasswordHash: String,
})

const UserModel = model("User", userSchema)

export default UserModel
