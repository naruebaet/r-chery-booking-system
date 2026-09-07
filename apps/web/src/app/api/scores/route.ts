import { NextRequest, NextResponse } from 'next/server';
import { getScores, saveScore } from '@archery/db';
import { corsHeaders, handleOptions } from '../cors';

export async function OPTIONS() {
  return handleOptions();
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const lineId = searchParams.get('lineId') || undefined;
    const scores = await getScores(lineId);
    return NextResponse.json(scores, { headers: corsHeaders() });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500, headers: corsHeaders() });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const created = await saveScore(body);
    return NextResponse.json(created, { status: 201, headers: corsHeaders() });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500, headers: corsHeaders() });
  }
}
