/* src/utils/auth.ts */
export const SESSION_KEY = "ticketapp_session";

export function signIn(username: string, password: string): { success:boolean; message?:string; token?:string } {
  // Simple simulated auth: accept any non-empty username/password
  if (!username || !password) return { success:false, message:"Invalid credentials" };
  const token = btoa(`${username}:${Date.now()}`);
  localStorage.setItem(SESSION_KEY, token);
  return { success:true, token };
}

export function signUp(username: string, password: string) {
  // No real backend — do same as signIn
  return signIn(username, password);
}

export function signOut(){
  localStorage.removeItem(SESSION_KEY);
}

export function getSession(){
  return localStorage.getItem(SESSION_KEY);
}

export function isAuthenticated(){
  return Boolean(getSession());
}
