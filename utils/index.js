import { request, post } from "axios"
import { promises as fs } from "fs"

const emotionModelEndpoint =
  "https://api-inference.huggingface.co/models/j-hartmann/emotion-english-distilroberta-base"
const whisperModelEndpoint =
  "https://api-inference.huggingface.co/models/openai/whisper-large-v3"
const mltcModelEndpoint =
  "https://api-inference.huggingface.co/models/Nayanv/BERT-MLTC-FT"
const googleTranslateEndpoint =
  "https://google-translate1.p.rapidapi.com/language/translate/v2/detect"

const apiKey = "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"
const rapidApiKey = "5655312cf6msh5e2467c7c187ec8p114111jsn2db5cce6c266"
const rapidApiKey2 = "efac3db4d9msh53d4e52fc8970acp16d61bjsnb345ac72c70d"

const headerHuggingAPI = { Authorization: `Bearer ${apiKey}` }

// // API request function
const makeApiRequest = async (url, data, headers = {}) => {
  const options = {
    method: "POST",
    url: "https://google-translate1.p.rapidapi.com/language/translate/v2/detect",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "Accept-Encoding": "application/gzip",
      "X-RapidAPI-Key": rapidApiKey,
      "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
    },
    data,
  }
  try {
    const response = await request(options)
    return response.data
  } catch (error) {
    throw new Error(`API request to ${url} failed: ${error.message}`)
  }
}

async function emotionAPICall(data) {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/j-hartmann/emotion-english-distilroberta-base",
    {
      headers: headerHuggingAPI,
      method: "POST",
      body: JSON.stringify(data),
    }
  )
  const result = await response.json()

  return result
}

async function bultModelAPI(data) {
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

bultModelAPI({ inputs: "I like you. I love you" }).then((response) => {
  console.log(JSON.stringify(response))
})

const detectLanguage = async (text) => {
  const headers = {
    "content-type": "application/x-www-form-urlencoded",
    "Accept-Encoding": "application/gzip",
    "X-RapidAPI-Key": rapidApiKey,
    "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
  }

  //const data = {
  // q: text,
  // };

  const data = new URLSearchParams()
  data.set("q", "English is hard, but detectably so")

  try {
    const detectionResponse = await makeApiRequest(
      googleTranslateEndpoint,
      data,
      headers
    )

    const lang = detectionResponse.data?.detections?.[0]?.[0]?.language
    if (lang) {
      console.log("emotionResponse", emotionResponse)
    }
    return lang
  } catch (error) {
    console.error("Error detecting language:", error.message)
    throw error
  }
}

async function main(filename) {
  try {
    const data = await fs.readFile(filename)

    const response = await post(
      "https://api-inference.huggingface.co/models/openai/whisper-large-v3",
      data,
      {
        headers: {
          Authorization: "Bearer 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",
          "Content-Type": "application/octet-stream", // Set the content type for binary data
        },
      }
    )

    const text = await response.data
    console.log("text", text)
    if (text.text) {
      const emotionRes = await emotionAPICall({ inputs: text.text })
      // const bultRes = await bultModelAPI({ inputs: text.text });
      // const langRes = await detectLanguage(text.text);
      console.log("emotionRes", emotionRes)
      // console.log("langRes", langRes);
      // console.log("bultRes", bultRes);
    }
  } catch (error) {
    console.error("Error:", error.message)
  }
}

main("sample2.flac")
