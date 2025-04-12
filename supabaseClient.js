// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xfyovnzmcrqpixblbfqc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzIiwicm...'; // Chiave pubblica

export const supabase = createClient(supabaseUrl, supabaseKey);
