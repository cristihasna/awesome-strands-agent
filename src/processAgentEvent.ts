import { AgentStreamEvent } from '@strands-agents/sdk';
import { BufferedLogger, logEvent } from './utils/logging.js';

interface UsageTotals {
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
  cacheReadInputTokens: number;
  cacheWriteInputTokens: number;
}

interface CreateAgentEventProcessorOptions {
  logEvent: BufferedLogger;
  totalUsage: UsageTotals;
}

export const totalUsage: UsageTotals = {
  inputTokens: 0,
  outputTokens: 0,
  totalTokens: 0,
  cacheReadInputTokens: 0,
  cacheWriteInputTokens: 0,
};

function formatEventTitle(eventName: string, meaning: string): string {
  return `${eventName}: ${meaning}`;
}

export function createAgentEventProcessor(options: CreateAgentEventProcessorOptions) {
  const { logEvent, totalUsage } = options;

  return (event: AgentStreamEvent): void => {
    switch (event.type) {
      case 'beforeInvocationEvent':
        logEvent(formatEventTitle('beforeInvocationEvent', '🔄 Agent loop initialized'));
        break;
      case 'beforeModelCallEvent':
        logEvent(
          formatEventTitle('beforeModelCallEvent', '🤖 About to invoke model with messages'),
          event.agent.messages,
          'event.agent.messages',
        );
        break;
      case 'afterModelCallEvent':
        logEvent(
          formatEventTitle('afterModelCallEvent', '📬 Model invocation completed'),
          event.stopData?.message,
          'event.stopData.message',
        );
        break;
      case 'beforeToolsEvent':
        logEvent(
          formatEventTitle('beforeToolsEvent', '🧭 Model result indicates tool execution'),
          event.message,
          'event.message',
        );
        break;
      case 'beforeToolCallEvent':
        logEvent(
          formatEventTitle('beforeToolCallEvent', `🛠️ Calling tool "${event.tool?.name}"`),
          event.toolUse.input,
          'event.toolUse.input',
        );
        break;
      case 'afterToolCallEvent':
        logEvent(
          formatEventTitle('afterToolCallEvent', `✅ Finished calling tool "${event.tool?.name}"`),
          event.result.content,
          'event.result.content',
        );
        break;
      case 'modelStreamUpdateEvent':
        switch (event.event.type) {
          case 'modelContentBlockDeltaEvent':
            logEvent(
              formatEventTitle('modelContentBlockDeltaEvent', '✏️ New delta'),
              event.event.delta,
              'event.event.delta',
            );
            break;
          case 'modelMetadataEvent':
            totalUsage.inputTokens += event.event.usage?.inputTokens ?? 0;
            totalUsage.outputTokens += event.event.usage?.outputTokens ?? 0;
            totalUsage.totalTokens += event.event.usage?.totalTokens ?? 0;
            totalUsage.cacheReadInputTokens += event.event.usage?.cacheReadInputTokens ?? 0;
            totalUsage.cacheWriteInputTokens += event.event.usage?.cacheWriteInputTokens ?? 0;

            logEvent(
              formatEventTitle('modelMetadataEvent', '📊 Token usage updated'),
              { current: event.event.usage, total: totalUsage },
              '{ current: event.event.usage, total: totalUsage }',
            );
            break;
          default:
            logEvent(event.event.type);
            break;
        }
        break;
      case 'modelMessageEvent':
        logEvent(formatEventTitle('modelMessageEvent', '💬 Message returned'), event.message, 'event.message');
        break;
      case 'afterInvocationEvent':
        logEvent(formatEventTitle('afterInvocationEvent', '✅ Agent loop completed'));
        break;
      case 'agentResultEvent':
        logEvent(
          formatEventTitle('agentResultEvent', '🏁 Final agent result'),
          event.result.lastMessage,
          'event.result.lastMessage',
        );
      default:
        logEvent(event.type);
        break;
    }
  };
}

export const processAgentEvent = createAgentEventProcessor({ logEvent, totalUsage });
