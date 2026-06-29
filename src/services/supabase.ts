import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://vazussfkkfetxxrsnsqs.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_9x_aSQskegwc5El-oEkkqw_g7Wh4IRt';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
