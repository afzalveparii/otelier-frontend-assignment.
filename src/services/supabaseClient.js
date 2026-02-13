// const projectURL= "https://bnesguftzxltfubzdmti.supabase.co";
// const PublishableKey = "sb_publishable_Yntcn8EsIDlkOv6dFwK6RQ_IvPSfUA-";
// const AnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJuZXNndWZ0enhsdGZ1YnpkbXRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4OTc3MTEsImV4cCI6MjA4NjQ3MzcxMX0.stO99M0-HkWQBlZuW7rb7eHSqCvZBjSqFhbb0VcdLnk";

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey  = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase