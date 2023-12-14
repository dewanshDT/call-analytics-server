import express from "express"
import mongoose from "mongoose"
import { config } from "dotenv"
import bodyParser from "body-parser"
import userRouter from "./routes/userRouter.js"
import callRouter from "./routes/callRouter.js"
import recordingRouter from "./routes/recordingRouter.js"
import analyticsRouter from "./routes/analyticsRouter.js"

const app = express()
const port = 3000

config()

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("connected to mongoDB"))
  .catch((error) => console.log(error))

app.use(bodyParser.json())

app.use("/api", userRouter)
app.use("/api", callRouter)
app.use("/api", recordingRouter)
app.use("/api", analyticsRouter)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
