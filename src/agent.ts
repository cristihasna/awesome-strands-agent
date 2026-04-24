// Define a custom tool as a TypeScript function
import { Agent, tool } from '@strands-agents/sdk';
import { GoogleModel } from '@strands-agents/sdk/models/google';
import 'dotenv/config';
import z from 'zod';
import { processAgentEvent } from './processAgentEvent.js';
import { logEvent } from './utils/logging.js';

const model = new GoogleModel({
  apiKey: process.env.GOOGLE_API_KEY!,
  modelId: 'gemini-3.1-flash-lite-preview',
});

const awesomeTool = tool({
  name: 'be_awesome',
  description: 'Use this tool only if you want to be awesome.',
  // Zod schema for letter counter input validation
  inputSchema: z.object({
    awesomenessLevel: z.enum(['not-at-all', 'moderately', 'very']).describe('How awesome do you want to be?'),
  }),
  callback: (input) => {
    const { awesomenessLevel } = input;

    // Return result as string (following the pattern of other tools)
    return `Congrats, you are now ${awesomenessLevel} awesome! 🎉`;
  },
});

// Create an agent with tools with our custom awesomeTool
const agent = new Agent({
  model,
  tools: [awesomeTool],
  printer: false,
});

// Ask the agent a question that uses the available tools
const message = `I am fairly awesome, but I want to be a lot more awesome. Can you help me with that?`;

const responseGenerator = agent.stream(message);
for await (const event of responseGenerator) {
  processAgentEvent(event);
}

logEvent.flush();
