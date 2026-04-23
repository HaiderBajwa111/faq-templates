"use client";
import React from 'react';
import { buildPreviewHTML } from '../lib/helpers';
import type { Template } from '../types';

export default function AdminTemplateForm({ initial, onSaved }: { initial?: Partial<Template>; onSaved?: () => void }) {
  const [name, setName] = React.useState(initial?.name || '');
  const [description, setDescription] = React.useState(initial?.description || '');
  const [category, setCategory] = React.useState(initial?.category || 'minimal');
  const [previewStyle, setPreviewStyle] = React.useState(initial?.previewStyle || 'background:#fff;padding:40px 20px;font-family:sans-serif;');
  const [htmlCode, setHtmlCode] = React.useState(initial?.htmlCode || '');
  const [cssCode, setCssCode] = React.useState(initial?.cssCode || '');
  const [jsCode, setJsCode] = React.useState(initial?.jsCode || '');
  const [isPublished, setIsPublished] = React.useState(initial?.isPublished ?? true);

  const previewRef = React.useRef<HTMLIFrameElement | null>(null);

  React.useEffect(() => {
    const html = buildPreviewHTML({ htmlCode, cssCode, jsCode, previewStyle });
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    if (previewRef.current) previewRef.current.src = url;
    return () => URL.revokeObjectURL(url);
  }, [htmlCode, cssCode, jsCode, previewStyle]);

  function handleTab(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Tab') {
      e.preventDefault();
      const target = e.currentTarget;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      const value = target.value;
      const newVal = value.substring(0, start) + '  ' + value.substring(end);
      target.value = newVal;
      target.selectionStart = target.selectionEnd = start + 2;
      // update React state
      if (target.name === 'html') setHtmlCode(newVal);
      if (target.name === 'css') setCssCode(newVal);
      if (target.name === 'js') setJsCode(newVal);
    }
  }

  async function save() {
    const payload = { name, description, category, previewStyle, htmlCode, cssCode, jsCode, isPublished };
    const method = initial?.id ? 'PUT' : 'POST';
    const url = initial?.id ? `/api/templates/${initial.id}` : '/api/templates';
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    if (res.ok) {
      onSaved?.();
    } else {
      alert('Save failed');
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div>
        <label className="block">Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 bg-[#111118] rounded mb-2" />

        <label className="block">Description</label>
        <textarea value={description || ''} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 bg-[#111118] rounded mb-2" rows={3} />

        <label>Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-2 bg-[#111118] rounded mb-2">
          <option value="minimal">minimal</option>
          <option value="dark">dark</option>
          <option value="colorful">colorful</option>
          <option value="interactive">interactive</option>
        </select>

        <label>Preview Style</label>
        <input value={previewStyle} onChange={(e) => setPreviewStyle(e.target.value)} className="w-full p-2 bg-[#111118] rounded mb-2" />

        <label>HTML Code</label>
        <textarea name="html" value={htmlCode} onKeyDown={handleTab} onChange={(e) => setHtmlCode(e.target.value)} className="w-full p-2 bg-[#0c0c12] rounded mono mb-2" rows={12} />

        <label>CSS Code</label>
        <textarea name="css" value={cssCode} onKeyDown={handleTab} onChange={(e) => setCssCode(e.target.value)} className="w-full p-2 bg-[#0c0c12] rounded mono mb-2" rows={10} />

        <label>JavaScript Code</label>
        <textarea name="js" value={jsCode} onKeyDown={handleTab} onChange={(e) => setJsCode(e.target.value)} className="w-full p-2 bg-[#0c0c12] rounded mono mb-2" rows={8} />

        <label className="flex items-center gap-2">
          <input type="checkbox" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} /> <span>Published</span>
        </label>

        <div className="mt-4">
          <button onClick={save} className="px-4 py-2 bg-[#7c5cff] rounded">Save</button>
        </div>
      </div>

      <div>
        <div className="mb-2">Live Preview</div>
        <div className="card p-3 h-[80vh] overflow-hidden">
          <iframe ref={previewRef} sandbox="allow-scripts allow-same-origin" className="w-full h-full border-0" />
        </div>
      </div>
    </div>
  );
}
