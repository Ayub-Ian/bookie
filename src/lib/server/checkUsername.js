import slugify from "../slugify";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export async function checkUsername() {
  const supabase = createClientComponentClient()
  const { data } = await supabase.auth.getSession();

  const user = data?.session ? data.session.user.user_metadata.name : null;

  
  return slugify(user);
}
