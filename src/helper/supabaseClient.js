import {createClient} from "@supabase/supabase-js"

const supabaseUrl = "https://todosubzzgopzaqpnbic.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRvZG9zdWJ6emdvcHphcXBuYmljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg2Mjc1MzMsImV4cCI6MjA1NDIwMzUzM30.rN_U_Pk3FWcLVTD9n31I85LoDi-8r7UiPLXJo9M2eIw"
const supabase = createClient(supabaseUrl, supabaseAnonKey);
export default supabase; 
