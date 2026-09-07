import { NextRequest, NextResponse } from 'next/server';
import { getBookings, createBooking } from '@archery/db';
import { corsHeaders, handleOptions } from '../cors';

export async function OPTIONS() {
  return handleOptions();
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const shopId = searchParams.get('shopId') || undefined;
    const bookings = await getBookings(shopId);
    return NextResponse.json(bookings, { headers: corsHeaders() });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500, headers: corsHeaders() });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const created = await createBooking(body);
    return NextResponse.json(created, { status: 201, headers: corsHeaders() });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500, headers: corsHeaders() });
  }
}
