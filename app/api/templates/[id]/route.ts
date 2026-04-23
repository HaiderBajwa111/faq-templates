import prisma from '../../../../lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const id = params.id;
  const t = await prisma.template.findUnique({ where: { id } });
  if (!t) return new NextResponse('Not found', { status: 404 });
  return NextResponse.json(t);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const cookie = req.headers.get('cookie') || '';
  const match = cookie.split(';').map(s => s.trim()).find(s => s.startsWith('admin_auth='));
  const val = match ? decodeURIComponent(match.split('=')[1]) : '';
  if (!val || val !== process.env.ADMIN_PASSWORD) return new NextResponse('Unauthorized', { status: 401 });

  const id = params.id;
  const body = await req.json();
  const t = await prisma.template.update({ where: { id }, data: {
    name: body.name,
    description: body.description,
    category: body.category,
    htmlCode: body.htmlCode,
    cssCode: body.cssCode,
    jsCode: body.jsCode,
    previewStyle: body.previewStyle,
    isPublished: body.isPublished,
  }});
  return NextResponse.json(t);
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const cookie = req.headers.get('cookie') || '';
  const match = cookie.split(';').map(s => s.trim()).find(s => s.startsWith('admin_auth='));
  const val = match ? decodeURIComponent(match.split('=')[1]) : '';
  if (!val || val !== process.env.ADMIN_PASSWORD) return new NextResponse('Unauthorized', { status: 401 });

  const id = params.id;
  await prisma.template.delete({ where: { id } });
  return new NextResponse('Deleted', { status: 204 });
}
