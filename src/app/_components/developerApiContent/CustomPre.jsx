import React, { useMemo, useState } from 'react';

const CustomPre = ({ children }) => {
  const [copied, setCopied] = useState(false);

  const { codeText, languageLabel } = useMemo(() => {
    const codeElement = React.Children.toArray(children).find((child) =>
      React.isValidElement(child)
    );
    const className = codeElement?.props?.className || '';
    const rawLanguage = className.replace('language-', '').trim();
    const language = rawLanguage ? rawLanguage.split(' ')[0] : 'text';
    const content = codeElement?.props?.children ?? '';
    const text = Array.isArray(content) ? content.join('') : content;
    return { codeText: text, languageLabel: language };
  }, [children]);

  const handleCopy = async () => {
    if (!codeText) return;
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(codeText);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = codeText;
        textarea.setAttribute('readonly', 'true');
        textarea.style.position = 'absolute';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
    } catch (error) {
      return;
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="docs-code-block">
      <div className="docs-code-header">
        <span className="docs-code-lang">{languageLabel}</span>
        <button
          type="button"
          className={`docs-code-copy${copied ? ' is-copied' : ''}`}
          onClick={handleCopy}
          aria-label={copied ? 'Copied to clipboard' : 'Copy code'}
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre>{children}</pre>
    </div>
  );
};

export default CustomPre;
