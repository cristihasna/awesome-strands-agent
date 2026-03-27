import { BedrockAgentCoreApp, RequestContext } from 'bedrock-agentcore/runtime';
import { z } from 'zod';
import { agent } from './agent.js';

export const reviewRequestSchema = z.object({
  prompt: z.string().min(1, 'prompt is required'),
});

export type ReviewRequest = z.infer<typeof reviewRequestSchema>;

const app = new BedrockAgentCoreApp({
  invocationHandler: {
    requestSchema: reviewRequestSchema,
    process: async (input: ReviewRequest, _context: RequestContext) => {
      try {
        const response = await agent.invoke(input.prompt);
        return JSON.stringify(response);
      } catch (err) {
        _context.log.error({ err }, 'Invocation failed');
        return JSON.stringify({
          ok: false,
          error: err instanceof Error ? err.message : String(err),
        });
      }
    },
  },
});

app.run();
