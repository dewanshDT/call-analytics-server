import express, { json, response, urlencoded } from "express"
import mongoose from "mongoose"
import { config } from "dotenv"
import userRouter from "./routes/userRouter.js"
import callRouter from "./routes/callRouter.js"
import recordingRouter from "./routes/recordingRouter.js"
import analyticsRouter from "./routes/analyticsRouter.js"
import whisperRouter from "./routes/whisperRouter.js"

const app = express()
const PORT = 3000

config()

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("connected to mongoDB"))
  .catch((error) => console.log(error))

// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }))

app.use(json())
app.use(urlencoded({ extended: false }))

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
