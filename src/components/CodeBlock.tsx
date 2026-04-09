"use client";

import { useState } from "react";
import type { CodeSample } from "@/lib/types";

export default function CodeBlock({ sample }: { sample: CodeSample }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(sample.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-block">
      <div className="code-block-header">
        <span className="code-block-label">{sample.label}</span>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span className="code-block-lang">{sample.language}</span>
          <button className="code-block-copy" onClick={handleCopy}>
            {copied ? "✓ Copied" : "Copy"}
          </button>
        </div>
      </div>
      <div className="code-block-body">
        <pre>{sample.code}</pre>
      </div>
    </div>
  );
}
