import { NextRequest, NextResponse } from 'next/server';
import { getShops, createShop } from '@archery/db';
import { corsHeaders, handleOptions } from '../cors';

export async function OPTIONS() {
  return handleOptions();
}

export async function GET() {
  try {
    const shops = await getShops();
    return NextResponse.json(shops, { headers: corsHeaders() });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500, headers: corsHeaders() });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const created = await createShop(body);
    return NextResponse.json(created, { status: 201, headers: corsHeaders() });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500, headers: corsHeaders() });
  }
}
