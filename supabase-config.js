// ============================================================
// GYMLOG — Supabase client
// ============================================================
const SUPABASE_URL  = 'https://tmobhmvefcjebqyyvbun.supabase.co';
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRtb2JobXZlZmNqZWJxeXl2YnVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg1OTEyNTIsImV4cCI6MjA5NDE2NzI1Mn0.UvYe07SLN64uylJIX4rWKFYBHINkZMiRygWy2TtuRmo';

const { createClient } = supabase;
const db = createClient(SUPABASE_URL, SUPABASE_ANON);
