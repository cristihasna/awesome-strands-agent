import { writeFileSync } from 'node:fs';

export interface BufferedLogger {
  (title: string, value?: unknown, valueLabel?: string): void;
  flush(): void;
}

interface CreateBufferedLoggerOptions {
  outputPath: string;
  heading?: string;
}

function appendMarkdown(lines: string[], title: string, value?: unknown, valueLabel?: string): void {
  lines.push(`## ${title}`);
  lines.push('');

  if (value === undefined) {
    return;
  }

  if (valueLabel) {
    lines.push(`\`${valueLabel}\`:`);
    lines.push('');
  }

  if (typeof value === 'string') {
    lines.push('```text');
    lines.push(value);
    lines.push('```');
  } else {
    lines.push('```json');
    lines.push(JSON.stringify(value, null, 2));
    lines.push('```');
  }

  lines.push('');
}

export function createBufferedLogger(options: CreateBufferedLoggerOptions): BufferedLogger {
  const { outputPath, heading = '# Agent Trace' } = options;
  const markdownLines: string[] = [heading, ''];

  const logEvent = (title: string, value?: unknown, valueLabel?: string): void => {
    if (value === undefined) {
      console.log(title);
    } else if (typeof value === 'string') {
      console.log(`${title}${valueLabel ? ` (${valueLabel})` : ''}: ${value}`);
    } else {
      console.log(`${title}${valueLabel ? ` (${valueLabel})` : ''}:\n${JSON.stringify(value)}`);
    }

    appendMarkdown(markdownLines, title, value, valueLabel);
  };

  logEvent.flush = (): void => {
    writeFileSync(outputPath, `${markdownLines.join('\n').trimEnd()}\n`, 'utf8');
  };

  return logEvent;
}

export const logEvent = createBufferedLogger({ outputPath: 'output.md' });
