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

export function createAgentEventProcessor(options: CreateAgentEventProcessorOptions) {
  const { logEvent, totalUsage } = options;

  return (event: AgentStreamEvent): void => {
    switch (event.type) {
      case 'beforeInvocationEvent':
        logEvent('🔄 Agent loop initialized');
        break;
      case 'beforeModelCallEvent':
        logEvent('▶️ Agent loop started');
        logEvent('🤖 About to invoke model with messages', event.agent.messages, 'event.agent.messages');
        break;
      case 'afterModelCallEvent':
        logEvent('📬 Model invocation completed', event.stopData?.message, 'event.stopData.message');
        break;
      case 'beforeToolsEvent':
        logEvent('🧭 Model result indicates tool execution', event.message, 'event.message');
        break;
      case 'beforeToolCallEvent':
        logEvent(`🛠️ Calling tool "${event.tool?.name}"`, event.toolUse.input, 'event.toolUse.input');
        break;
      case 'afterToolCallEvent':
        logEvent(`✅ Finished calling tool "${event.tool?.name}"`, event.result.content, 'event.result.content');
        break;
      case 'modelStreamUpdateEvent':
        switch (event.event.type) {
          case 'modelContentBlockDeltaEvent':
            logEvent('✏️ New delta', event.event.delta, 'event.event.delta');
            break;
          case 'modelMetadataEvent':
            totalUsage.inputTokens += event.event.usage?.inputTokens ?? 0;
            totalUsage.outputTokens += event.event.usage?.outputTokens ?? 0;
            totalUsage.totalTokens += event.event.usage?.totalTokens ?? 0;
            totalUsage.cacheReadInputTokens += event.event.usage?.cacheReadInputTokens ?? 0;
            totalUsage.cacheWriteInputTokens += event.event.usage?.cacheWriteInputTokens ?? 0;

            logEvent(
              '📊 Token usage updated',
              { current: event.event.usage, total: totalUsage },
              '{ current: event.event.usage, total: totalUsage }',
            );
            break;
          case 'modelMessageStartEvent':
          case 'modelContentBlockStartEvent':
          case 'modelContentBlockStopEvent':
          case 'modelMessageStopEvent':
          case 'modelRedactionEvent':
            break;
        }
        break;
      case 'modelMessageEvent':
        logEvent('💬 Message returned', event.message, 'event.message');
        break;
      case 'afterToolsEvent':
      case 'contentBlockEvent':
      case 'toolStreamUpdateEvent':
      case 'toolResultEvent':
      case 'messageAddedEvent':
      case 'agentResultEvent':
        break;
      case 'afterInvocationEvent':
        logEvent('✅ Agent loop completed');
        break;
    }
  };
}

export const processAgentEvent = createAgentEventProcessor({ logEvent, totalUsage });
