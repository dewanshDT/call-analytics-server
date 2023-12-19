import ffmpeg from "fluent-ffmpeg"

export async function convertMp3ToWav(mp3Data) {
  return new Promise((resolve, reject) => {
    const converter = ffmpeg()

    converter.input(mp3Data)
    converter.inputFormat("mp3")
    converter.audioCodec("pcm_s16le") // Set audio codec to PCM

    converter.on("end", () => {
      resolve(converter.toBuffer())
    })

    converter.on("error", (err) => {
      reject(err)
    })

    converter.run()
  })
}
