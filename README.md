
# PDF-CHAT
A document-centric chat application for PDFs that allows users to upload documents, view them, and ask contextual questions with persistent chat sessions. Built with a modern RAG (Retrieval-Augmented Generation) architecture focused on quality, scalability, and security.

## Features: 
- Upload and manage multiple PDF documents 
- Chat per document with persistent states 
- High quality semantic search using vector embeddings 
- Context-aware answers powered by Gemini 
- Authentication, storage, and database via Supabase 
- Structured chunking with metadata for better retreival
- Async document processing pipeline

## Architecture Overview: 
It follows a production-grade RAG pipeline. 
```
PDF → Text Extraction → Structured Chunking → Embeddings → Vector DB(ingestion pipeline)
                                 ↓
User Question → Embedding → Similarity Search → Gemini → Answer(querying pipeline)
```

- We do ingestion pipeline only once per document. 
- Querying pipeline runs for every query user asks separately. 

## The application flow
### 2.1 User Uploads PDF
1. User upload file and frontend sends that file to a **backend API route** (`/api/upload`)
2. File is stored in **Supabase storage** (or S3)
3. A document record is created with status = processing.
4. A background job: 
   - Extracts text from the PDF 
   - Splits text into structured chunks.
   - Generates embeddings using Gemini 
   - Store embeddings in Pinecone with metadata. 
5. Document status is updated is ready. 
Upload will be asynchronous to avoid request timeouts. 


### 2.2 User Opens PDF or Chat
1. Backend fetches document metadata from **Supabase**
2. When a question is asked:
   1. Question is converted into an embedding (Gemini)
   2. **Pinecone** is queried using a document-scoped namespace. 
   3. Relevant chunks are retrieved (with page + section metadata)
   4. Chunks + recent chat context are sent to Gemini 
   5. Gemini generates a grounded answer. 
3. Answer is returned in the chat UI. All this pipeline will take a few seconds, less than minute. 

### 2.3 State & Sessions
- Chats are scoped per document.
- Messages are stored in Supabase with timestamps.
- On each request: 
    - Only the last N messages(or a rolling summary) are sent to the LLM. 
    - Full history remains stored for persistence. 
---


## Data models: 
1. Supabase give its own system/table for auth, no need to separately do it. 
2. `documents` table(Supabase)
   ```bash
   id (uuid, pk)
   user_id (uuid, fk)
   title
   file_path
   status ('processing' | 'ready' | 'failed')
   created_at

   ```
3. `chunks` (Not in supabase, but in Pinecone)
   ```bash
   {
   id: "docId_chunkIndex",
   values: vector,
   metadata: {
      documentId,
      userId,
      page,
      section,
      chunkIndex
   }
   }

   ```

4. `chats` table 
   ```bash
   id (uuid, pk)
   document_id (uuid, fk)
   user_id (uuid, fk)
   created_at

   ```

5. `messages` table 
   ```bash
   id (uuid, pk)
   chat_id (uuid, fk)
   role ('user' | 'assistant')
   content
   created_at
   ```


## Techstack
- Framework: `Next.js` (App Router)
- VectorDB : `Pinecone`
- Database, storage and auth: `Supabase`
- LLM : `Gemini`
- Language: `TypeScript`
- Styling: `Tailwind CSS` with `shadcn`
- UI primitives: `Radix UI`
- Motion: `framer-motion`
- Icons & utilities: `lucide-react`, `clsx`
- Tooling: `ESLint`, `PostCSS`

## Quick start
Install dependencies and run the development server:

```bash
npm install
npm run dev
```


