/* src/App.tsx */
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/landing";
import AuthLogin from "./pages/authlogin";
import AuthSignup from "./pages/authsignup";
import Dashboard from "./pages/dashboard";
import Tickets from "./pages/tickets";
import { Layout, Navbar } from "./components/layout";
import { ProtectedRoute } from "./components/protectdroute";
import { Toast } from "./components/Toast";
import { v4 as uuid } from "uuid";


function App(){
  const [toasts, setToasts] = useState<{id:string;message:string}[]>([]);

  function pushToast(message:string){
    const id = uuid();
    setToasts((s)=>[...s,{id,message}]);
    setTimeout(()=> setToasts((s)=> s.filter(t=>t.id!==id)), 4000);
  }

  return (
    <>
      <Navbar onLogout={()=>pushToast("Logged out")}/>
      <Layout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth/login" element={<AuthLogin onSuccess={()=>pushToast("Welcome back!")}/>} />
          <Route path="/auth/signup" element={<AuthSignup onSuccess={()=>pushToast("Account created!")}/>} />
          <Route path="/dashboard" element={
            <ProtectedRoute><Dashboard /></ProtectedRoute>
          } />
          <Route path="/tickets" element={
            <ProtectedRoute><Tickets onToast={pushToast} /></ProtectedRoute>
          } />
          <Route path="*" element={<Landing />} />
        </Routes>
      </Layout>
      <Toast items={toasts} />
    </>
  );
}

export default App;
