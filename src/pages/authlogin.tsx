/* src/pages/AuthLogin.tsx */
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signIn } from "../utils/auth";

export default function AuthLogin({ onSuccess }: { onSuccess?: ()=>void }){
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState("");
  const nav = useNavigate();

  function handleSubmit(e: React.FormEvent){
    e.preventDefault();
    setError("");
    if(!username || !password) { setError("Please fill all fields"); return; }
    const res = signIn(username,password);
    if(!res.success){ setError(res.message || "Login failed"); return; }
    onSuccess?.();
    nav("/dashboard");
  }

  return (
    <div className="card" style={{maxWidth:520, margin:"12px auto"}}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} aria-label="Login form">
        <div className="form-row">
          <label htmlFor="username">Username</label>
          <input id="username" value={username} onChange={e=>setUsername(e.target.value)} />
        </div>
        <div className="form-row">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        </div>
        {error && <div className="form-error" role="alert">{error}</div>}
        <div style={{display:"flex",gap:12,marginTop:12}}>
          <button className="btn btn-primary" type="submit">Login</button>
          <Link to="/auth/signup" className="btn btn-ghost">Sign up</Link>
        </div>
      </form>
    </div>
  );
}
