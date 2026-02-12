export const analyzeVoiceInput = (text: string): { triggered: boolean; confidence: number } => {
  const lowerText = text.toLowerCase();
  const keywords = ['help', 'danger', 'save me', 'emergency', 'hurt', 'follow'];
  
  const found = keywords.some(k => lowerText.includes(k));
  
  if (found) {
    // Simulate varying confidence score based on match length/clarity
    return { triggered: true, confidence: 0.85 + Math.random() * 0.14 };
  }
  return { triggered: false, confidence: 0.1 };
};

export const predictEmotion = (emotionInput: string): { isPanic: boolean; score: number } => {
  if (emotionInput === 'Panic' || emotionInput === 'Fear') {
    return { isPanic: true, score: 0.9 + Math.random() * 0.09 };
  }
  return { isPanic: false, score: 0.1 + Math.random() * 0.2 };
};
