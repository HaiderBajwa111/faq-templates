"use client";
import React from 'react';
import { buildPreviewHTML } from '../lib/helpers';
import type { Template } from '../types';
import TemplateModal from './TemplateModal';
import PreviewModal from './PreviewModal';

export default function TemplateCard({ template }: { template: Template }) {
  const [blobUrl, setBlobUrl] = React.useState<string | null>(null);
  const [openCode, setOpenCode] = React.useState(false);
  const [openPreview, setOpenPreview] = React.useState(false);

  React.useEffect(() => {
    const html = buildPreviewHTML(template as any);
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    setBlobUrl(url);
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [template]);

  return (
    <div className="card p-4" data-category={template.category}>
      <div className="mb-3 h-96 overflow-hidden rounded">
        {blobUrl ? (
          <iframe src={blobUrl} sandbox="allow-scripts allow-same-origin" style={{ width: '100%', height: '100%', border: '0', colorScheme: 'light' }} />
        ) : (
          <div className="w-full h-full bg-gray-900" />
        )}
      </div>

      <div className="flex items-center justify-between">
        <div>
          <div className="font-semibold">{template.name}</div>
          <div className="text-sm text-gray-400">{template.description}</div>
        </div>
        <div className="ml-2 text-xs px-2 py-1 rounded bg-[#111118]">{template.category}</div>
      </div>

      <div className="mt-3 flex gap-2">
        <button className="px-3 py-1 rounded bg-[#7c5cff] text-white" onClick={() => setOpenCode(true)}>Get Code</button>
        <button className="px-3 py-1 rounded bg-[#111118]" onClick={() => setOpenPreview(true)}>Preview</button>
      </div>

      {openCode && <TemplateModal template={template} onClose={() => setOpenCode(false)} />}
      {openPreview && <PreviewModal html={buildPreviewHTML(template as any)} onClose={() => setOpenPreview(false)} />}
    </div>
  );
}
