import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,  // URL do seu projeto Supabase
  process.env.SUPABASE_KEY   // A chave pública do seu projeto Supabase
);

export default supabase;
