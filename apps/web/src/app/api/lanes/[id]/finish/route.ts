import { NextRequest, NextResponse } from 'next/server';
import { finishLaneSession } from '@archery/db';
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
    const { shopId } = body;
    await finishLaneSession(shopId, laneId);
    return NextResponse.json({ success: true }, { headers: corsHeaders() });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500, headers: corsHeaders() });
  }
}
