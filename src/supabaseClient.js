// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://xfyovnzmcrqpixblbfqc.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhmeW92bnptY3JxcGl4YmxiZnFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3ODY2MDQsImV4cCI6MjA1OTM2MjYwNH0.r0But5RrqtYXB5mxvkNUxWiXE8edG9yVOybQRV-FORA';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
