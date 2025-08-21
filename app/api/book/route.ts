
import { NextRequest, NextResponse } from 'next/server';
import { getAccessToken } from '@/app/lib/actions';

export async function POST(req: NextRequest) {
  const token = await getAccessToken(); 

  if (!token) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const body = await req.text();

  const res = await fetch(`${process.env.DJANGO_API_URL}/api/properties/book/`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
