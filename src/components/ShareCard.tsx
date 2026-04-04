import { useRef, useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import html2canvas from 'html2canvas';
import type { ErrorEntry, Persona } from '../data/errors';
import { PERSONA_META } from '../data/errors';

/* ------------------------------------------------------------------ */
/* "My Error Translation" shareable image generator + Slack copy       */
/* ------------------------------------------------------------------ */

interface ShareCardProps {
  result: ErrorEntry;
  persona: Persona;
  onShare?: () => void;
}

export function ShareCard({ result, persona, onShare }: ShareCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const translation = result.translations[persona];
  const meta = PERSONA_META[persona];

  /* Copy as Slack-formatted message */
  const copyAsSlack = useCallback(() => {
    const slack = [
      `*Error:* \`${result.code}\``,
      `*Translation (${meta.icon} ${meta.label}):*`,
      `> ${translation}`,
      '',
      `*Therapy:* _${result.therapy}_`,
      '',
      `Reactions: 😭 💀 🔥`,
      '',
      `_— Error Translator v6.6.6_`,
    ].join('\n');
    navigator.clipboard.writeText(slack).then(() => {
      setCopied('slack');
      onShare?.();
      setTimeout(() => setCopied(null), 2000);
    });
  }, [result, persona, translation, meta, onShare]);

  /* Copy as plain text */
  const copyAsText = useCallback(() => {
    const text = [
      `Error: ${result.code}`,
      `Translation (${meta.label}): ${translation}`,
      `Therapy: ${result.therapy}`,
      '',
      '— Error Translator v6.6.6',
    ].join('\n');
    navigator.clipboard.writeText(text).then(() => {
      setCopied('text');
      onShare?.();
      setTimeout(() => setCopied(null), 2000);
    });
  }, [result, persona, translation, meta, onShare]);

  /* Download as image */
  const downloadImage = useCallback(async () => {
    if (!cardRef.current) return;
    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#000000',
        scale: 2,
      });
      const link = document.createElement('a');
      link.download = `error-translation-${Date.now()}.png`;
      link.href = canvas.toDataURL();
      link.click();
      onShare?.();
    } catch {
      /* Fallback: copy text if image fails */
      copyAsText();
    }
  }, [copyAsText, onShare]);

  return (
    <div className="mb-4">
      {/* Shareable card preview */}
      <div
        ref={cardRef}
        className="border border-[--neon-border] p-5 mb-3"
        style={{ background: 'linear-gradient(180deg, #0a0005 0%, #1a0010 100%)' }}
      >
        <div className="text-[0.5rem] tracking-[4px] text-[--neon-faint] mb-3 uppercase">
          My Error Translation
        </div>
        <div className="text-[0.65rem] text-[--neon-dim] mb-2 font-[inherit] px-2 py-1 border border-[--neon-ghost] inline-block">
          {result.code}
        </div>
        <div
          className="text-[0.85rem] text-[--neon] leading-relaxed my-3"
          style={{ textShadow: '0 0 10px #ff006633' }}
        >
          {translation}
        </div>
        <div className="flex justify-between items-center border-t border-[--neon-ghost] pt-2 mt-3">
          <span className="text-[0.5rem] text-[--neon-faint] tracking-[1px]">
            {meta.icon} {meta.label.toUpperCase()} MODE
          </span>
          <span className="text-[0.45rem] text-[--neon-ghost] tracking-[2px]">
            ERROR TRANSLATOR v6.6.6
          </span>
        </div>
      </div>

      {/* Share buttons */}
      <div className="grid grid-cols-3 gap-2">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={copyAsSlack}
          className="text-[0.58rem] border border-[--neon-border] py-2 bg-transparent text-[--neon-dim] font-[inherit] cursor-pointer tracking-[1px] hover:bg-[#ff006622] hover:text-[--neon] transition-colors"
        >
          {copied === 'slack' ? '✓ COPIED' : '📋 SLACK'}
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={copyAsText}
          className="text-[0.58rem] border border-[--neon-border] py-2 bg-transparent text-[--neon-dim] font-[inherit] cursor-pointer tracking-[1px] hover:bg-[#ff006622] hover:text-[--neon] transition-colors"
        >
          {copied === 'text' ? '✓ COPIED' : '📄 TEXT'}
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={downloadImage}
          className="text-[0.58rem] border border-[--neon-border] py-2 bg-transparent text-[--neon-dim] font-[inherit] cursor-pointer tracking-[1px] hover:bg-[#ff006622] hover:text-[--neon] transition-colors"
        >
          📸 IMAGE
        </motion.button>
      </div>
    </div>
  );
}
