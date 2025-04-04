import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { id, email, full_name } = await request.json();

  try {
    const { error } = await supabase
      .from('users')
      .insert({
        id,
        email,
        full_name,
        is_admin: false,
        created_at: new Date().toISOString()
      });

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create user profile' },
      { status: 500 }
    );
  }
}
