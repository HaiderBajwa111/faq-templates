"use client";
import React from 'react';
import type { Template } from '../types';

function copyToClipboard(text: string) {
  return navigator.clipboard.writeText(text);
}

export default function TemplateModal({ template, onClose }: { template: Template; onClose: () => void }) {
  const [tab, setTab] = React.useState<'html' | 'css' | 'js'>('html');

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60" onClick={onClose}>
      <div className="w-[90%] max-w-4xl bg-[#0b0b11] p-4 rounded" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold">{template.name} — Code</h3>
          <button onClick={onClose} className="text-gray-400">Close</button>
        </div>

        <div className="flex gap-2 mb-3">
          <button className={`px-2 py-1 rounded ${tab === 'html' ? 'bg-[#7c5cff] text-white' : 'bg-[#111118]'}`} onClick={() => setTab('html')}>HTML</button>
          <button className={`px-2 py-1 rounded ${tab === 'css' ? 'bg-[#7c5cff] text-white' : 'bg-[#111118]'}`} onClick={() => setTab('css')}>CSS</button>
          <button className={`px-2 py-1 rounded ${tab === 'js' ? 'bg-[#7c5cff] text-white' : 'bg-[#111118]'}`} onClick={() => setTab('js')}>JS</button>
        </div>

        <div className="bg-[#0c0c12] rounded p-3 mono" style={{ maxHeight: '60vh', overflow: 'auto' }}>
          <div className="flex justify-end mb-2">
            <button className="px-2 py-1 bg-[#111118] rounded text-sm" onClick={() => copyToClipboard(tab === 'html' ? template.htmlCode : tab === 'css' ? template.cssCode : template.jsCode)}>Copy</button>
          </div>
          <pre className="whitespace-pre-wrap">{tab === 'html' ? template.htmlCode : tab === 'css' ? template.cssCode : template.jsCode}</pre>
        </div>
      </div>
    </div>
  );
}
