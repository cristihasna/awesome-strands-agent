// Define a custom tool as a TypeScript function
import { Agent, tool } from '@strands-agents/sdk';
import { GoogleModel } from '@strands-agents/sdk/models/google';
import z from 'zod';

const GEMINI_MODEL_ID = 'gemini-3.1-flash-lite-preview';
const GEMINI_API_KEY = process.env.GEMIN_API_KEY;

if (!GEMINI_API_KEY) {
  throw new Error('GEMIN_API_KEY is required.');
}

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

const model = new GoogleModel({
  apiKey: GEMINI_API_KEY,
  modelId: GEMINI_MODEL_ID,
});

export const agent = new Agent({
  model,
  tools: [awesomeTool],
});
