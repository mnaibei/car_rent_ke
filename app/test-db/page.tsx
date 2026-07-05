import { createClient } from "@/lib/supabase/server";

export default async function TestPage() {
  const supabase = await createClient();

  // A simple query to check the connection
  const { data, error } = await supabase.from("User").select("*").limit(1);

  return (
    <pre>
      {error ? JSON.stringify(error, null, 2) : JSON.stringify(data, null, 2)}
    </pre>
  );
}
