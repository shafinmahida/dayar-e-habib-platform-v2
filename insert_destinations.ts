import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!; // use service role key for bypass RLS

const supabase = createClient(supabaseUrl, supabaseKey);

const DESTINATIONS_DATA = [
  {
    slug: "makkah",
    name: "Makkah Al-Mukarramah",
    country: "Saudi Arabia",
    description: "The holiest city in Islam, birthplace of the Prophet Muhammad (PBUH), and home to the Masjid al-Haram and the Kaaba.",
    image_url: "/makkah-hero.png",
  },
  {
    slug: "madinah",
    name: "Madinah Al-Munawwarah",
    country: "Saudi Arabia",
    description: "The city of the Prophet (PBUH), home to the Al-Masjid an-Nabawi (the Prophet's Mosque) and the Rawdah Sharifah.",
    image_url: "/madinah-dawn.png",
  },
  {
    slug: "baghdad",
    name: "Baghdad, Najaf & Karbala",
    country: "Iraq",
    description: "Historical tours to the shrines of Sheikh Abdul Qadir Jilani (Ghaus-e-Azam) and Imam Abu Hanifa.",
    image_url: "/ziyarat-dome.png",
  },
];

async function main() {
  for (const dest of DESTINATIONS_DATA) {
    const { data, error } = await supabase.from('destinations').insert([dest]);
    if (error) {
      console.error(`Error inserting ${dest.name}:`, error.message);
    } else {
      console.log(`Inserted ${dest.name}`);
    }
  }
}

main();
