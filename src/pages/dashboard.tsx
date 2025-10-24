/* src/pages/Dashboard.tsx */
import React from "react";
import { Link } from "react-router-dom";
import { loadTickets } from "../utils/storage";

export default function Dashboard(){
  const tickets = loadTickets();
  const total = tickets.length;
  const open = tickets.filter(t=>t.status==="open").length;
  const resolved = tickets.filter(t=>t.status==="closed").length;
  const inProgress = tickets.filter(t=>t.status==="in_progress").length;

  return (
    <>
      <div className="grid cols-3" style={{marginBottom:18}}>
        <div className="card">
          <h4>Total tickets</h4>
          <p style={{fontSize:26,fontWeight:700}}>{total}</p>
        </div>
        <div className="card">
          <h4>Open tickets</h4>
          <p style={{fontSize:26,fontWeight:700}}>{open}</p>
        </div>
        <div className="card">
          <h4>Resolved</h4>
          <p style={{fontSize:26,fontWeight:700}}>{resolved}</p>
          <p style={{marginTop:8,color:"#475569"}}>In progress: {inProgress}</p>
        </div>
      </div>

      <div className="card">
        <h3>Quick actions</h3>
        <div style={{display:"flex",gap:12,marginTop:12}}>
          <Link to="/tickets" className="btn btn-primary">Manage Tickets</Link>
        </div>
      </div>
    </>
  );
}
