import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error("Missing Supabase credentials in .env.local");
  process.exit(1);
}

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function createAdminUser() {
  const email = 'admin@dayarehabib.com';
  const password = 'AdminPassword123!';

  console.log(`Checking if user ${email} exists...`);
  
  // Create the user using admin API
  const { error } = await supabaseAdmin.auth.admin.createUser({
    email: email,
    password: password,
    email_confirm: true,
    user_metadata: {
      full_name: 'Admin User',
      role: 'admin'
    }
  });

  if (error) {
    if (error.message.includes('already been registered')) {
      console.log(`\nUser already exists!`);
      console.log(`Email: ${email}`);
      console.log(`Password: ${password}`);
    } else {
      console.error("Error creating user:", error);
    }
  } else {
    console.log(`\nSuccessfully created admin user!`);
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
  }
}

createAdminUser();
