import { GoogleGenerativeAI } from "@google/generative-ai";
import { env, ensureServerEnv } from "./env";

let client: GoogleGenerativeAI | null = null;

export function getGeminiClient() {
  if (client) return client;

  ensureServerEnv();

  client = new GoogleGenerativeAI(env.GEMINI_API_KEY);
  return client;
}

export async function embedText(input: string) {
  const genAI = getGeminiClient();
  const model = genAI.getGenerativeModel({
    model: "text-embedding-004",
  });
  const result = await model.embedContent(input);
  return result.embedding.values;
}

export async function generateAnswer(params: {
  question: string;
  context: string;
  chatHistory: { role: "user" | "assistant"; content: string }[];
}) {
  const genAI = getGeminiClient();
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro-latest",
  });

  const history = params.chatHistory.map((m) => ({
    role: m.role === "user" ? "user" : "model",
    parts: [{ text: m.content }],
  }));

  const prompt = [
    "You are a helpful assistant that answers questions about a PDF document.",
    "Use ONLY the provided context from the document and the conversation history.",
    "If the answer is not contained in the context, say you are not sure.",
    "",
    "Context:",
    params.context,
    "",
    "Question:",
    params.question,
  ].join("\n");

  const chat = model.startChat({
    history,
  });

  const result = await chat.sendMessage(prompt);
  const response = await result.response;
  return response.text();
}

