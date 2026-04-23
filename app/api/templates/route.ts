import prisma from '../../../lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const category = url.searchParams.get('category');
  const where: any = { isPublished: true };
  if (category && category !== 'all') where.category = category;
  const templates = await prisma.template.findMany({ where, orderBy: { createdAt: 'desc' } });
  return NextResponse.json(templates);
}

export async function POST(req: Request) {
  // admin-only
  const cookie = req.headers.get('cookie') || '';
  const match = cookie.split(';').map(s => s.trim()).find(s => s.startsWith('admin_auth='));
  const val = match ? decodeURIComponent(match.split('=')[1]) : '';
  if (!val || val !== process.env.ADMIN_PASSWORD) return new NextResponse('Unauthorized', { status: 401 });

  const body = await req.json();
  const t = await prisma.template.create({ data: {
    name: body.name || 'Untitled',
    description: body.description || '',
    category: body.category || 'minimal',
    htmlCode: body.htmlCode || '',
    cssCode: body.cssCode || '',
    jsCode: body.jsCode || '',
    previewStyle: body.previewStyle || 'background:#fff;padding:40px 20px;font-family:sans-serif;',
    isPublished: !!body.isPublished,
  }});
  return NextResponse.json(t);
}
