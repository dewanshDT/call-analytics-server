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

/**
 *
 * @param {ReadStream} file
 */
export async function huggingWhisperLargeV3(file) {
  try {
    const url =
      "https://api-inference.huggingface.co/models/openai/whisper-large-v3"
    const apiKey = process.env.HUGGING_API_KEY

    const headers = {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/octet-stream",
    }

    const options = {
      method: "POST",
      headers: new Headers(headers),
      body: file,
    }

    const response = await fetch(url, options)

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    // Process the response as needed
    const responseData = await response.json() // or response.text(), depending on the API response format
    return responseData
  } catch (e) {
    console.error("huggingWhisperLargeV3()", e)
    throw e // Re-throw the error to propagate it
  }
}

/**
 *
 * @param {{inputs: string | string[]}} data
 * @returns
 */
export async function emotionAPICall(data) {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/j-hartmann/emotion-english-distilroberta-base",
    {
      headers: new Headers({
        Authorization: `Bearer ${process.env.HUGGING_API_KEY}`,
      }),
      method: "POST",
      body: JSON.stringify(data),
    }
  )
  const result = await response.json()

  return result
}

/**
 *
 * @param {{inputs: string | string[]}} data
 * @returns
 */
export async function bertModelAPI(data) {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/Nayanv/BERT-MLTC-FT",
    {
      headers: headerHuggingAPI,
      method: "POST",
      body: JSON.stringify(data),
    }
  )
  const result = await response.json()
  return result
}

// bertModelAPI({ inputs: "I like you. I love you" }).then((response) => {
//   console.log(JSON.stringify(response))
// })

// async function main(filename) {
//   try {
//     const response = await huggingWhisperLargeV3(await fs.readFile(filename))

//     const text = response.data
//     console.log("text", text)

//     if (text.text) {
//       const emotionRes = await emotionAPICall({ inputs: text.text })
//       // const bertRes = await bertModelAPI({ inputs: text.text });

//       console.log("emotionRes", emotionRes)
//       // console.log("bertRes", bertRes);
//     }
//   } catch (error) {
//     console.error("Error:", error.message)
//   }
// }

// main("sample2.flac")
