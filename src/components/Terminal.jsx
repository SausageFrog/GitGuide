// src/components/TerminalR.jsx
import { useState, useEffect } from 'react';
import './Terminal.module.css';

function Terminal({
  lines = [],
  typeDelay = 90,
  lineDelay = 1500,
  startDelay = 600,
  cursor = '▋',
}) {
  const [renderedLines, setRenderedLines] = useState([]);
  const [activeLine, setActiveLine] = useState(null);
  const [runId, setRunId] = useState(0);

  const linesKey = JSON.stringify(lines);

  useEffect(() => {
    let isCancelled = false;
    const wait = (ms) => new Promise((res) => setTimeout(res, ms));

    async function runTerminal() {
      setRenderedLines([]);
      setActiveLine(null);
      await wait(startDelay);

      for (let i = 0; i < lines.length; i++) {
        if (isCancelled) return;
        const line = lines[i];
        const delay = line.delay ?? lineDelay;

        if (line.type === 'input') {
          const chars = [...(line.value || '')];
          let currentText = '';
          setActiveLine({ ...line, text: '' });

          for (const char of chars) {
            if (isCancelled) return;
            await wait(line.typeDelay ?? typeDelay);
            currentText += char;
            setActiveLine({ ...line, text: currentText });
          }

          await wait(delay);
          if (isCancelled) return;
          setRenderedLines((prev) => [...prev, { ...line, text: currentText }]);
          setActiveLine(null);
        } else if (line.type === 'progress') {
          const length = line.progressLength || 40;
          const char = line.progressChar || '█';
          const maxPercent = line.progressPercent || 100;

          setActiveLine({ ...line, text: '' });

          for (let step = 1; step <= length; step++) {
            if (isCancelled) return;
            await wait(typeDelay);
            const percent = Math.round((step / length) * 100);
            const bar = char.repeat(step);
            setActiveLine({ ...line, text: `${bar} ${percent}%` });
            if (percent > maxPercent) break;
          }

          await wait(delay);
          if (isCancelled) return;
          setRenderedLines((prev) => [
            ...prev,
            { ...line, text: `${char.repeat(length)} ${maxPercent}%` },
          ]);
          setActiveLine(null);
        } else {
          setRenderedLines((prev) => [...prev, { ...line, text: line.value || '' }]);
          await wait(delay);
        }
      }
    }

    runTerminal();

    return () => {
      isCancelled = true;
    };
  }, [linesKey, typeDelay, lineDelay, startDelay, runId]);

  const getLineProps = (line, isTyping = false) => {
    const props = {
      'data-ty': line.type || '',
    };
    if (line.prompt) {
      props['data-ty-prompt'] = line.prompt;
    }
    if (isTyping && line.type === 'input') {
      props['data-ty-cursor'] = cursor;
    }
    return props;
  };

  return (
    <div data-termynal key={`${linesKey}-${runId}`}>
      <button type='button' class="termynal-restart" onClick={() => setRunId((prev) => prev + 1)}>↻</button>

      {renderedLines.map((line, idx) => (
        <span key={idx} {...getLineProps(line, false)}>
          {line.text}
        </span>
      ))}

      {activeLine && (
        <span {...getLineProps(activeLine, true)}>
          {activeLine.text}
        </span>
      )}
    </div>
  );
}

export default Terminal