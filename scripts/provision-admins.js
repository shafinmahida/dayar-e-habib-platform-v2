import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

const admins = [
  {
    email: "javeed@dayarehabib.com",
    password: "DayarOwner2026!",
    user_metadata: {
      full_name: "Javeed",
      role: "Owner",
    },
  },
  {
    email: "khalil@dayarehabib.com",
    password: "SuperDayar2026!",
    user_metadata: {
      full_name: "Khalil",
      role: "Super Admin",
    },
  },
  {
    email: "abbas@dayarehabib.com",
    password: "SalesDayar2026!",
    user_metadata: {
      full_name: "Abbas",
      role: "Sales Agent",
    },
  }
];

async function provisionAdmins() {
  for (const admin of admins) {
    console.log(`Provisioning ${admin.email}...`);
    
    // Check if user already exists
    const { data: existingUsers, error: checkError } = await supabase.auth.admin.listUsers();
    
    if (checkError) {
      console.error(`Failed to list users: ${checkError.message}`);
      continue;
    }

    const existingUser = existingUsers.users.find(u => u.email === admin.email);

    if (existingUser) {
      console.log(`User ${admin.email} already exists. Updating metadata...`);
      // Update existing user with metadata
      const { error: updateError } = await supabase.auth.admin.updateUserById(
        existingUser.id,
        {
          password: admin.password,
          user_metadata: admin.user_metadata
        }
      );
      
      if (updateError) {
        console.error(`Failed to update ${admin.email}: ${updateError.message}`);
      } else {
        console.log(`Successfully updated ${admin.email}`);
      }
    } else {
      console.log(`Creating new user ${admin.email}...`);
      const { error } = await supabase.auth.admin.createUser({
        email: admin.email,
        password: admin.password,
        email_confirm: true,
        user_metadata: admin.user_metadata,
      });

      if (error) {
        console.error(`Failed to create ${admin.email}:`, error.message);
      } else {
        console.log(`Successfully created ${admin.email}`);
      }
    }
  }
}

provisionAdmins().then(() => {
  console.log("Done provisioning admins.");
  process.exit(0);
});
