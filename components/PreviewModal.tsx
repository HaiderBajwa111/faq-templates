"use client";
import React from 'react';

export default function PreviewModal({ html, onClose }: { html: string; onClose: () => void }) {
  const [url, setUrl] = React.useState<string | null>(null);

  React.useEffect(() => {
    const blob = new Blob([html], { type: 'text/html' });
    const u = URL.createObjectURL(blob);
    setUrl(u);
    return () => URL.revokeObjectURL(u);
  }, [html]);

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center" onClick={onClose}>
      <div className="relative w-full h-full max-w-6xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-black/60 text-white hover:bg-black/90"
          aria-label="Close preview"
        >
          ✕
        </button>
        {url && <iframe src={url} sandbox="allow-scripts allow-same-origin" style={{ width: '100%', height: '100%', border: 0 }} />}
      </div>
    </div>
  );
}
