import { writeFileSync } from 'node:fs';

export interface BufferedLogger {
  (title: string, value?: unknown, valueLabel?: string): void;
  flush(): void;
}

interface CreateBufferedLoggerOptions {
  outputPath: string;
  heading?: string;
}

function formatMarkdownTitle(title: string): { heading: string; content: string } {
  const eventMatch = /^([^:]+): (.+)$/.exec(title);
  if (eventMatch) {
    return {
      heading: '###',
      content: `\`${eventMatch[1]}\`: ${eventMatch[2]}`,
    };
  }

  const escapedTitle = title.trim().startsWith('`') ? title : `\`${title}\``;
  return {
    heading: '###',
    content: escapedTitle,
  };
}

function appendMarkdown(lines: string[], title: string, value?: unknown, valueLabel?: string): void {
  const formattedTitle = formatMarkdownTitle(title);
  if (lines.length > 2) {
    lines.push('---');
    lines.push('');
  }

  lines.push(`${formattedTitle.heading} ${formattedTitle.content}`);
  lines.push('');

  if (value === undefined) {
    return;
  }

  lines.push('<details>');
  lines.push(`<summary><code>${valueLabel ?? 'payload'}</code></summary>`);
  lines.push('');

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
  lines.push('</details>');
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
