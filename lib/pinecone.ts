import { Pinecone } from "@pinecone-database/pinecone";
import { env, ensureServerEnv } from "./env";

let client: Pinecone | null = null;

export function getPineconeClient() {
  if (client) return client;

  ensureServerEnv();

  client = new Pinecone({
    apiKey: env.PINECONE_API_KEY,
  });

  return client;
}

export function getPineconeIndex() {
  const pc = getPineconeClient();
  return pc.index(env.PINECONE_INDEX);
}

