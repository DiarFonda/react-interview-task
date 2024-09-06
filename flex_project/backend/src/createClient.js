const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  "https://svdajeyymwjoljvircxk.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2ZGFqZXl5bXdqb2xqdmlyY3hrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU0NDc1NzUsImV4cCI6MjA0MTAyMzU3NX0.G-5uPfb8Rr4aqTbwKTKUthnOFNJSXn5XtX7wLMyfG3A"
);

module.exports = supabase;
