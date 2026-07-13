const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const lines = envContent.split('\n');
  lines.forEach(line => {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      process.env[match[1]] = match[2].replace(/^"(.*)"$/, '$1');
    }
  });
}

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function check() {
  // Let's run a query to check triggers. Since we don't have direct SQL, we can see if we can query pg_trigger or if it's blocked.
  // Wait! Supabase postgrest doesn't expose pg_catalog by default.
  // But wait! Can we try to insert a package and see if an audit log is created?
  // Let's check if the packages table has rows first.
  const { data: pkgs } = await supabase.from('packages').select('id').limit(1);
  console.log("Packages count/sample:", pkgs);
}

check();
