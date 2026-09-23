# Vortex - AI Dev Workspace

🚀 Full-stack Next.js AI application with MCP integration, GitHub integration, WebContainers, and Cloudflare Workers deployment.

## Features

- 💬 Multi-turn chat interface with Anthropic API
- 🔌 MCP (Model Context Protocol) integration with tool gatekeeper
- 🐙 GitHub integration (browse repos, view diffs)
- 💻 WebContainers + Monaco Editor + XTerm Terminal
- 🔐 Supabase authentication
- 🎨 Terminal/IDE aesthetic (green accent, mono fonts)
- 🌍 Cloudflare Workers deployment ready

## Quick Start

```bash
npm install
npm run dev
# Visit http://localhost:3000
```

## Deploy to Cloudflare Workers

```bash
export CLOUDFLARE_API_TOKEN=your_token
npm run deploy
# App live at https://vortex.workers.dev
```

## Tech Stack

- **Frontend**: Next.js 16.3.5, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API routes, Node.js compat
- **Auth**: Supabase
- **Deployment**: Cloudflare Workers
- **State**: Zustand
- **Terminal**: XTerm.js
- **Editor**: Monaco Editor

## Project Structure

```
vortex/
├── app/
│   ├── api/chat → API routes
│   └── page.tsx → Main app
├── components/ → React components
├── lib/ → Utilities (MCP, GitHub, Supabase)
├── src/ → Workers handler
├── .github/workflows/ → GitHub Actions
└── wrangler.toml → Cloudflare Workers config
```

## Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ANTHROPIC_API_KEY=
GITHUB_API_TOKEN=
```

## License

MIT - Build something awesome! 🎉
