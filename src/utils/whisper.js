const fs = require("fs")
const fetch = require("node-fetch")

// const OpenAI = require("openai")

// const openai = new OpenAI({
//   apiKey: "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",
// })

// async function openWhisperTranscribe(file) {
//   const chunkSize = 1024 * 10 // 5 MB chunk size (adjust as needed)
//   const fileBuffer = fs.readFileSync(file)

//   let offset = 0
//   let chunkNumber = 0

//   while (offset < fileBuffer.length) {
//     const chunk = fileBuffer.subarray(offset, offset + chunkSize)

//     try {
//       const transcription = await openai.audio.transcriptions.create({
//         audio_chunk: chunk.toString("base64"),
//         model: "whisper-1",
//         // content_type: "audio/wav",
//       })

//       console.log(`Chunk ${chunkNumber + 1} Transcription:`, transcription.text)
//     } catch (error) {
//       console.error(
//         `Error transcribing chunk ${chunkNumber + 1}:`,
//         error.message
//       )
//       // Handle the error as needed
//     }

//     offset += chunkSize
//     chunkNumber++
//   }
// }

async function chunkyHuggingWhisperLargeV3(file) {
  try {
    const url =
      "https://api-inference.huggingface.co/models/openai/whisper-large-v2"
    const apiKey = process.env.HUGGING_API_KEY

    console.log("🗝️", apiKey)

    const chunkSize = 20 * 1024 // 500 KB chunk size, adjust as needed
    const fileSize = file.length
    let offset = 0

    const results = []

    while (offset < fileSize) {
      const chunk = file.slice(offset, offset + chunkSize)

      const headers = {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/octet-stream",
      }

      const options = {
        method: "POST",
        headers: new Headers(headers),
        body: chunk,
      }

      const response = await fetch(url, options)

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const responseData = await response.json()
      results.push(responseData)

      offset += chunkSize
    }

    // Combine results or process them as needed
    const combinedResult = combineResults(results)

    return combinedResult
  } catch (e) {
    console.error("huggingWhisperLargeV3()", e)
    throw e
  }
}

// Combine results as needed
function combineResults(results) {
  // Implement your logic to combine results if required
  // For example, concatenate text from each chunk
  const combinedText = results.map((result) => result.text).join(" ")
  return { text: combinedText }
}

/**
 *
 * @param {ReadableStream} file
 * @returns {Promise<{ text: string }>}
 */
async function huggingWhisperLargeV3(file) {
  try {
    const url =
      "https://api-inference.huggingface.co/models/openai/whisper-large-v3"
    const apiKey = process.env.HUGGING_API_KEY

    console.log("🗝️", apiKey)

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

    const responseData = await response.json()
    return responseData
  } catch (e) {
    console.error("huggingWhisperLargeV3()", e)
    throw e
  }
}

/**
 *
 * @param {{inputs: string | string[]}} data
 * @returns {Promise<Array>}
 */
async function emotionAPICall(data) {
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

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`)
  }

  const result = await response.json()
  return result
}

/**
 *
 * @param {{inputs: string | string[]}} data
 * @returns {Promise<Array>}
 */
async function bertModelAPI(data) {
  try {
    const response = await fetch(
      // "https://api-inference.huggingface.co/models/Nayanv/BERT-MLTC-FT",
      "https://api-inference.huggingface.co/models/cardiffnlp/twitter-xlm-roberta-base-sentiment",
      {
        headers: new Headers({
          Authorization: `Bearer ${process.env.HUGGING_API_KEY}`,
        }),
        method: "POST",
        body: JSON.stringify(data),
      }
    )

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const result = await response.json()
    console.log(result)
    return result
  } catch (error) {
    console.error("bertModelAPI()", error)
  }
}

// Other parts of the code remain the same

// bertModelAPI({ inputs: "I like you. I love you" }).then((response) => {
//   console.log(JSON.stringify(response))
// });

// async function main(filename) {
//   try {
//     const response = await huggingWhisperLargeV3(await fs.readFile(filename));

//     const text = response.data;
//     console.log("text", text);

//     if (text.text) {
//       const emotionRes = await emotionAPICall({ inputs: text.text });
//       // const bertRes = await bertModelAPI({ inputs: text.text });

//       console.log("emotionRes", emotionRes);
//       // console.log("bertRes", bertRes);
//     }
//   } catch (error) {
//     console.error("Error:", error.message);
//   }
// }

// main("sample2.flac");

module.exports = {
  bertModelAPI,
  emotionAPICall,
  huggingWhisperLargeV3,
  // openWhisperTranscribe,
  chunkyHuggingWhisperLargeV3,
}
