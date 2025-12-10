
# PDF-CHAT
- Document-centric chat UI for PDFs: upload, view, and ask questions per document.
- Dashboard with file list and upload zone.
- Per-document viewer and chat sessions.
- User authentication and storage with supabase. 
- Pinecone embedding
- Using Gemini


## The application flow
### 2.1 User Uploads PDF
1. Frontend sends file to a **backend API route** (`/api/upload`)
2. File is stored in **Supabase storage** (or S3)
3. Text is **extracted from PDF** using libraries like `pdf-parse`
4. Document is **split into chunks**
5. Chunks are converted into embeddings and stored in **Pinecone**

### 2.2 User Opens PDF or Chat
1. Backend fetches document metadata from **Supabase**
2. For chat, when a question is asked:
   1. Question is converted into an embedding (Gemini/LangChain)
   2. Query **Pinecone** to retrieve relevant PDF chunks
   3. Feed chunks + question to Gemini → generate answer
   4. Answer returned to frontend and displayed in chat UI

### 2.3 State & Sessions
- Chat sessions are saved in Supabase (messages, timestamps)
- Allows users to **resume conversations** later
---

## Techstack
- Framework: `Next.js`, `Langchain` (App Router)
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


