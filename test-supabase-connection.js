/* eslint-disable @typescript-eslint/no-require-imports */
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load environment variables from .env.local manually for standalone execution
const envPath = path.join(__dirname, '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const lines = envContent.split('\n');
  lines.forEach(line => {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      const key = match[1];
      let value = match[2] || '';
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.substring(1, value.length - 1);
      }
      process.env[key] = value;
    }
  });
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('Detected Supabase URL:', supabaseUrl ? 'FOUND' : 'MISSING');
console.log('Detected Supabase Anon Key:', supabaseAnonKey ? 'FOUND' : 'MISSING');

if (!supabaseUrl || !supabaseAnonKey) {
  console.log('Error: Missing Supabase credentials in .env.local.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function test() {
  try {
    const { error } = await supabase.auth.getSession();
    if (error) {
      console.log('Connection failed:', error.message);
      process.exit(1);
    }
    console.log('Connection successful!');
    process.exit(0);
  } catch (err) {
    console.log('Connection failed with exception:', err.message);
    process.exit(1);
  }
}

test();
