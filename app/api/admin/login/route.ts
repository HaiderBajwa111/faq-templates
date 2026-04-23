import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  const password = body.password || '';
  if (password && password === process.env.ADMIN_PASSWORD) {
    const res = NextResponse.json({ ok: true });
    // set httpOnly cookie
    res.cookies.set({ name: 'admin_auth', value: password, httpOnly: true, path: '/' });
    return res;
  }
  return new NextResponse('Unauthorized', { status: 401 });
}
