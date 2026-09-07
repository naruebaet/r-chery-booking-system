import { NextRequest, NextResponse } from 'next/server';
import { checkInBooking } from '@archery/db';
import { corsHeaders, handleOptions } from '../../../cors';

export async function OPTIONS() {
  return handleOptions();
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const updated = await checkInBooking(id);
    if (!updated) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404, headers: corsHeaders() });
    }
    return NextResponse.json(updated, { headers: corsHeaders() });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500, headers: corsHeaders() });
  }
}
