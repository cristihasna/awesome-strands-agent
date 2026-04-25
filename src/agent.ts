// Define a custom tool as a TypeScript function
import { Agent, tool } from '@strands-agents/sdk';
import { GoogleModel } from '@strands-agents/sdk/models/google';
import { withApiKey } from 'bedrock-agentcore/identity';
import z from 'zod';

const GEMINI_MODEL_ID = 'gemini-3-flash-lite-preview';
const GEMINI_PROVIDER_NAME = 'gemini';

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

function createAgent(apiKey: string) {
  const model = new GoogleModel({
    apiKey,
    modelId: GEMINI_MODEL_ID,
  });

  return new Agent({
    model,
    tools: [awesomeTool],
  });
}

export const invokeAgent = withApiKey({ providerName: GEMINI_PROVIDER_NAME })(async (
  prompt: string,
  apiKey: string,
) => {
  const agent = createAgent(apiKey);
  return agent.invoke(prompt);
});
