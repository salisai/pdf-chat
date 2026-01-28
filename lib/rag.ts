// pdf-parse does not ship TypeScript types by default, so we import it as any.
// eslint-disable-next-line @typescript-eslint/no-var-requires
const pdfParse: (buffer: Buffer) => Promise<{ text: string }> = require("pdf-parse");
import { embedText } from "./gemini";
import { getPineconeIndex } from "./pinecone";

export type DocumentChunk = {
  id: string;
  content: string;
  page: number;
  section: string | null;
  chunkIndex: number;
};

export async function extractTextFromPdf(buffer: Buffer) {
  const data = await pdfParse(buffer);
  return data.text;
}

export function chunkText(text: string, opts?: { chunkSize?: number; overlap?: number }): DocumentChunk[] {
  const chunkSize = opts?.chunkSize ?? 1000;
  const overlap = opts?.overlap ?? 200;

  const cleaned = text.replace(/\s+/g, " ").trim();
  const chunks: DocumentChunk[] = [];

  let index = 0;
  let chunkIndex = 0;

  while (index < cleaned.length) {
    const end = Math.min(index + chunkSize, cleaned.length);
    const chunkText = cleaned.slice(index, end);
    chunks.push({
      id: "",
      content: chunkText,
      page: 0, // pdf-parse basic usage does not expose page-level text by default
      section: null,
      chunkIndex,
    });
    chunkIndex += 1;
    index += chunkSize - overlap;
  }

  return chunks;
}

export async function ingestDocumentIntoPinecone(params: {
  documentId: string;
  userId: string | null;
  text: string;
}) {
  const baseChunks = chunkText(params.text);

  const index = getPineconeIndex();

  // Sequential embedding is simpler; can be optimized later.
  let i = 0;
  for (const chunk of baseChunks) {
    const vector = await embedText(chunk.content);
    const id = `${params.documentId}_${chunk.chunkIndex}`;
    await index.upsert([
      {
        id,
        values: vector,
        metadata: {
          documentId: params.documentId,
          userId: params.userId ?? undefined,
          page: chunk.page,
          section: chunk.section ?? undefined,
          chunkIndex: chunk.chunkIndex,
          content: chunk.content,
        },
      },
    ]);
    i += 1;
  }
}

export async function searchRelevantChunks(params: {
  documentId: string;
  userId: string | null;
  question: string;
  topK?: number;
}) {
  const topK = params.topK ?? 6;
  const index = getPineconeIndex();
  const queryVector = await embedText(params.question);

  const res = await index.query({
    topK,
    vector: queryVector,
    includeMetadata: true,
    filter: {
      documentId: params.documentId,
    },
  });

  const contexts =
    res.matches
      ?.map((m: { metadata?: unknown }) => (m.metadata as any)?.content as string | undefined)
      .filter(Boolean) ?? [];

  return contexts.join("\n\n---\n\n");
}

