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

const oldAdmins = [
  "javeed@dayarehabib.com",
  "khalil@dayarehabib.com",
  "abbas@dayarehabib.com"
];

const newAdmins = [
  {
    email: "javeed@dht.com",
    password: "J@786786",
    user_metadata: {
      full_name: "Javeed",
      role: "Owner",
    },
  },
  {
    email: "khalil@dht.com",
    password: "K@786786",
    user_metadata: {
      full_name: "Khalil",
      role: "Owner",
    },
  },
  {
    email: "abbas@dht.com",
    password: "A@786786",
    user_metadata: {
      full_name: "Abbas",
      role: "Owner",
    },
  }
];

async function updateOwners() {
  // 1. Get all users
  const { data: { users }, error: listError } = await supabase.auth.admin.listUsers();
  
  if (listError) {
    console.error("Failed to list users:", listError);
    return;
  }

  // 2. Delete old admins
  for (const email of oldAdmins) {
    const user = users.find(u => u.email === email);
    if (user) {
      console.log(`Deleting old user ${email}...`);
      await supabase.auth.admin.deleteUser(user.id);
    }
  }

  // 3. Create or update new admins
  for (const admin of newAdmins) {
    const existingUser = users.find(u => u.email === admin.email);
    
    if (existingUser) {
      console.log(`Updating user ${admin.email}...`);
      await supabase.auth.admin.updateUserById(existingUser.id, {
        password: admin.password,
        user_metadata: admin.user_metadata
      });
      console.log(`Successfully updated ${admin.email}`);
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

updateOwners().then(() => {
  console.log("Done updating owners.");
  process.exit(0);
});
