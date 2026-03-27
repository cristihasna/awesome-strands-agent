// Define a custom tool as a TypeScript function
import { Agent, BedrockModel, tool } from '@strands-agents/sdk';
import 'dotenv/config';
import z from 'zod';

const model = new BedrockModel({
  modelId: 'eu.amazon.nova-lite-v1:0',
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
export const agent = new Agent({
  model,
  tools: [awesomeTool],
});
