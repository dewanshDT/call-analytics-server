import fs, { ReadStream } from "fs"
import OpenAI from "openai"

const openai = new OpenAI()

/**
 *
 * @param {ReadStream} file
 * @param {"en"|"hi"} language
 *
 */
export async function whisperTranscribe(file, language) {
  let transcription

  const options = {
    file,
    model: "whisper-1",
    language,
    response_format: "json",
  }

  if (language === "en")
    transcription = await openai.audio.transcriptions.create(options)
  if (language === "hi")
    transcription = await openai.audio.translations.create(options)

  console.log(transcription.text)
}
