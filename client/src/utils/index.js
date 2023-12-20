export function getEmotionColor(emotionLabel, intensity) {
  switch (emotionLabel) {
    case "disgust":
      return `bg-violet-${intensity}`
    case "anger":
      return `bg-red-${intensity}`
    case "neutral":
      return `bg-gray-${intensity}`
    case "surprise":
      return `bg-yellow-${intensity}`
    case "fear":
      return `bg-green-${intensity}`
    case "joy":
      return `bg-yellow-${intensity}`
    case "sadness":
      return `bg-indigo-${intensity}`
    default:
      return `bg-red-${intensity}` // Default color for unknown labels
  }
}

export function getEmotionEmoji(emotionLabel) {
  switch (emotionLabel) {
    case "disgust":
      return "😖"
    case "anger":
      return "😡"
    case "neutral":
      return "😐"
    case "surprise":
      return "😯"
    case "fear":
      return "😨"
    case "joy":
      return "😄"
    case "sadness":
      return "😢"
    default:
      return "😐" // Default emoji for unknown labels
  }
}
