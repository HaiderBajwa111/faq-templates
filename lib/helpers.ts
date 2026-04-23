import type { Template } from '../types';

export function buildPreviewHTML(template: any) {
  const css = template.cssCode || '';
  const js = template.jsCode || '';
  const html = template.htmlCode || '';
  const previewStyle = template.previewStyle || 'background:#fff;padding:40px 20px;font-family:sans-serif;';

  return `<!doctype html>
<html style="color-scheme:light">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <style> :root{color-scheme:light;box-sizing:border-box}*,*::before,*::after{box-sizing:inherit} body{margin:0} .preview-wrapper{${previewStyle}} ${css}
    </style>
  </head>
  <body>
    <div class="preview-wrapper">
      ${html}
    </div>
    <script>
    try {
      ${js}
    } catch(e) { console.error(e) }
    </script>
  </body>
</html>`;
}
