const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY
);

async function check() {
  const { data } = await supabase.from('content_blocks').select('content').eq('slug', 'homepage_enlightenment').single();
  console.log(JSON.stringify(data.content, null, 2));
}

check();
