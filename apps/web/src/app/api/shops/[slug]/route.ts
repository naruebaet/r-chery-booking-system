import { NextRequest, NextResponse } from 'next/server';
import { getShopBySlug, updateShop } from '@archery/db';
import { corsHeaders, handleOptions } from '../../cors';

export async function OPTIONS() {
  return handleOptions();
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const shop = await getShopBySlug(slug);
    if (!shop) {
      return NextResponse.json({ error: 'Shop not found' }, { status: 404, headers: corsHeaders() });
    }
    return NextResponse.json(shop, { headers: corsHeaders() });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500, headers: corsHeaders() });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const body = await req.json();
    await updateShop(body);
    return NextResponse.json({ success: true }, { headers: corsHeaders() });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500, headers: corsHeaders() });
  }
}
