import { GoogleGenAI } from '@google/genai';

async function runChat(prompt) {
  const ai = new GoogleGenAI({
    apiKey: 'AIzaSyC6eZ6WyWDnVUiwCUO0j3mCtoKHxV0AYcw', // ⚠️ be careful exposing this on frontend!
  });

  const config = {
    responseMimeType: 'text/plain',
  };

  const model = 'gemini-1.5-flash';  // or 'gemini-1.5-flash-latest'
  const contents = [
    {
      role: 'user',
      parts: [{ text: prompt }],
    },
  ];

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });

  let fullResponse = '';
  for await (const chunk of response) {
    console.log(chunk.text);
    fullResponse += chunk.text;
  }

  return fullResponse;
}

export default runChat;
