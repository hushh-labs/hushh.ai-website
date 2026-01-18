import authConfig from "../../../lib/config/authConfig";

export default async function signOut() {
  await authConfig.supabaseClient.auth.signOut();
}
