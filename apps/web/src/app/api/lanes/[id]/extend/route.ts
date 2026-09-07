import { NextRequest, NextResponse } from 'next/server';
import { extendLaneSession } from '@archery/db';
import { corsHeaders, handleOptions } from '../../../cors';

export async function OPTIONS() {
  return handleOptions();
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: laneId } = await params;
    const body = await req.json();
    const { shopId, additionalMinutes } = body;
    const updated = await extendLaneSession(shopId, laneId, additionalMinutes || 15);
    if (!updated) {
      return NextResponse.json({ error: 'Lane not found or not active' }, { status: 404, headers: corsHeaders() });
    }
    return NextResponse.json(updated, { headers: corsHeaders() });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500, headers: corsHeaders() });
  }
}
