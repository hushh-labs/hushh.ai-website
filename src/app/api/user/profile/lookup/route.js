import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request) {
  try {
    const body = await request.json();
    const email = body?.email?.trim();
    const phone = body?.phone?.trim();

    if (!email && !phone) {
      return NextResponse.json(
        { success: false, error: 'Email or phone is required to lookup user_id.' },
        { status: 400 }
      );
    }

    const filters = [];
    if (email) filters.push(`email.eq.${email}`);
    if (phone) filters.push(`phone.eq.${phone}`);

    let query = supabase
      .from('user_profiles')
      .select('user_id, hushh_id, email, phone, profile_created_utc')
      .order('profile_created_utc', { ascending: false })
      .limit(1);

    if (filters.length) {
      query = query.or(filters.join(','));
    }

    const { data, error } = await query.maybeSingle();

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    if (!data?.user_id) {
      return NextResponse.json({ success: false, error: 'No matching profile found.' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      userId: data.user_id,
      hushhId: data.hushh_id || null,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
