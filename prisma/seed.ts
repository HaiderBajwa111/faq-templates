import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.template.deleteMany();

  await prisma.template.createMany({ data: [
    {
      name: 'Clean White Accordion',
      description: 'A simple white accordion FAQ with smooth transitions.',
      category: 'minimal',
      htmlCode: `
<div class="faq">
  <div class="item"><button class="q">What is this?</button><div class="a">This is a clean white accordion FAQ.</div></div>
  <div class="item"><button class="q">How to use?</button><div class="a">Copy the code and drop into your page.</div></div>
  <div class="item"><button class="q">License?</button><div class="a">Free to use.</div></div>
</div>
      `,
      cssCode: `
.faq{max-width:700px;margin:0 auto}
.item{border-bottom:1px solid #eee}
.q{width:100%;text-align:left;padding:16px;background:transparent;border:0;font-weight:600}
.a{padding:0 16px 16px;color:#444;display:none}
.item.open .a{display:block}
      `,
      jsCode: `
document.querySelectorAll('.faq .q').forEach(b=>b.addEventListener('click',()=>{b.parentElement.classList.toggle('open')}));
      `,
      previewStyle: 'background:#fff;padding:40px 20px;font-family:sans-serif;color:#111;max-width:760px;margin:0 auto;',
      isPublished: true,
    },
    {
      name: 'Dark Neon Accordion',
      description: 'A dark neon-styled accordion with glowing accents.',
      category: 'dark',
      htmlCode: `
<div class="faq">
  <div class="item"><button class="q">Why neon?</button><div class="a">Because it looks cool on dark backgrounds.</div></div>
  <div class="item"><button class="q">Customization?</button><div class="a">Change accent color in CSS.</div></div>
</div>
      `,
      cssCode: `
body{background:#06060a;color:#dfe}
.faq{max-width:700px;margin:0 auto}
.item{border-bottom:1px solid rgba(255,255,255,0.04)}
.q{width:100%;text-align:left;padding:16px;background:transparent;border:0;color:#9ff;font-weight:700}
.a{padding:0 16px 16px;color:#cfd;display:none}
.item.open .a{display:block}
      `,
      jsCode: `
document.querySelectorAll('.faq .q').forEach(b=>b.addEventListener('click',()=>{b.parentElement.classList.toggle('open')}));
      `,
      previewStyle: 'background:#080814;padding:40px 20px;font-family:sans-serif;color:#cdf;max-width:760px;margin:0 auto;',
      isPublished: true,
    },
    {
      name: 'Colorful Tabbed FAQ',
      description: 'Tabbed FAQ with colorful panels.',
      category: 'colorful',
      htmlCode: `
<div class="tabs">
  <div class="tab-list">
    <button data-i="0" class="tab active">General</button>
    <button data-i="1" class="tab">Pricing</button>
    <button data-i="2" class="tab">Support</button>
  </div>
  <div class="panels">
    <div class="panel">General FAQ content...</div>
    <div class="panel" style="display:none">Pricing FAQ content...</div>
    <div class="panel" style="display:none">Support FAQ content...</div>
  </div>
</div>
      `,
      cssCode: `
.tab-list{display:flex;gap:8px}
.tab{padding:8px 12px;border-radius:8px;border:0}
.tab.active{background:linear-gradient(90deg,#7c5cff,#ff7cac);color:white}
.panel{padding:16px;margin-top:12px;background:linear-gradient(180deg,#fff,#f7f7ff);border-radius:8px}
      `,
      jsCode: `
document.querySelectorAll('.tab-list .tab').forEach(btn=>btn.addEventListener('click',()=>{
  const i = Number(btn.dataset.i);
  document.querySelectorAll('.tab-list .tab').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.panels .panel').forEach((p,idx)=> p.style.display = idx===i? 'block':'none');
}));
      `,
      previewStyle: 'background:linear-gradient(180deg,#fff,#fbf7ff);padding:40px 20px;font-family:sans-serif;color:#111;max-width:760px;margin:0 auto;',
      isPublished: true,
    },
    {
      name: 'Searchable FAQ',
      description: 'Interactive FAQ with live search filtering.',
      category: 'interactive',
      htmlCode: `
<div class="search-wrap">
  <input placeholder="Search FAQs..." class="qsearch" />
  <div class="list">
    <div class="item"><div class="q">How does it work?</div><div class="a">Type to filter items.</div></div>
    <div class="item"><div class="q">Can I customize?</div><div class="a">Yes, change styles and content.</div></div>
    <div class="item"><div class="q">Performance?</div><div class="a">Tiny and fast.</div></div>
  </div>
</div>
      `,
      cssCode: `
.qsearch{width:100%;padding:10px;border-radius:8px;border:1px solid #ddd;margin-bottom:12px}
.item{padding:10px;border-radius:6px;margin-bottom:8px;background:#fff}
.q{font-weight:700}
.a{color:#444}
      `,
      jsCode: `
document.querySelector('.qsearch').addEventListener('input',function(){
  const q=this.value.toLowerCase();
  document.querySelectorAll('.list .item').forEach(it=>{
    const text = it.innerText.toLowerCase();
    it.style.display = text.includes(q)?'block':'none';
  });
});
      `,
      previewStyle: 'background:#fff;padding:40px 20px;font-family:sans-serif;color:#111;max-width:760px;margin:0 auto;',
      isPublished: true,
    }
  ]});

  console.log('Seed complete');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => {
    await prisma.$disconnect();
  });
