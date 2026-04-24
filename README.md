# Agent Test

`agent-test` is a small TypeScript playground for experimenting with the `@strands-agents/sdk` using a Google Gemini model.
It wires together:

- a simple custom tool called `be_awesome`
- a streaming agent execution loop
- markdown logging for model, tool, and usage events

The project is useful as a minimal reference for understanding how an agent call flows from prompt to tool invocation to final result.

## What It Does

When you run the app, it:

1. loads `GOOGLE_API_KEY` from the environment
2. creates a `GoogleModel` configured with `gemini-3-flash-lite-preview`
3. registers a sample tool that accepts an `awesomenessLevel`
4. streams the agent response event by event
5. writes a readable execution trace to `output.md`

## Prerequisites

- Node.js 20+ recommended
- npm
- a valid Google AI API key exposed as `GOOGLE_API_KEY`

## Setup

Install dependencies:

```bash
npm install
```

Create a `.env` file in the project root:

```env
GOOGLE_API_KEY=your_api_key_here
```

## Run

Start the sample agent:

```bash
npm start
```

The script runs [`src/agent.ts`](./src/agent.ts), prints event information to the terminal, and saves a markdown trace to `output.md`.

## Project Structure

- [`src/agent.ts`](./src/agent.ts): agent setup, model configuration, tool definition, and streaming loop
- [`src/processAgentEvent.ts`](./src/processAgentEvent.ts): event processing and token usage aggregation
- [`src/utils/logging.ts`](./src/utils/logging.ts): buffered markdown logger used to generate `output.md`

## Notes

- The included tool is intentionally simple and meant as a template for adding real tools.
- The current prompt is hard-coded in `src/agent.ts`.
- The selected Gemini model can be swapped by changing the `modelId` in `src/agent.ts`.
