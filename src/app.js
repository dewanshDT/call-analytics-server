const express = require("express")
const { json, urlencoded } = require("express")
const path = require("path")
const cors = require("cors")
const mongoose = require("mongoose")
const { config } = require("dotenv")
const userRouter = require("./routes/userRouter.js")
const callRouter = require("./routes/callRouter.js")
const recordingRouter = require("./routes/recordingRouter.js")
const analyticsRouter = require("./routes/analyticsRouter.js")
const whisperRouter = require("./routes/whisperRouter.js")

const app = express()
const PORT = 3000

config()

mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log("connected to mongoDB"))
  .catch((error) => console.log(error))

app.use(cors())

app.use(json())
app.use(urlencoded({ extended: false }))

app.use(express.static("public"))

app.get("/", (req, res) => {
  console.log("called")
  return res.json({ message: "welcome to analytics server" })
})

app.use("/api", userRouter)
app.use("/api", callRouter)
app.use("/api", recordingRouter)
app.use("/api", analyticsRouter)
app.use("/api", whisperRouter)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} \nhttp://localhost:${PORT}/`)
})
