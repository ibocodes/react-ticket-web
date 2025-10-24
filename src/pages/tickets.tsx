/* src/pages/Tickets.tsx */
import React, { useEffect, useState } from "react";
import { loadTickets, saveTickets } from "../utils/storage";
import type { Ticket, Status } from "../types";
import { v4 as uuid } from "uuid";

const VALID_STATUSES: Status[] = ["open","in_progress","closed"];

export default function Tickets({ onToast }: { onToast?: (msg:string)=>void }){
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [title,setTitle] = useState("");
  const [description,setDescription] = useState("");
  const [status,setStatus] = useState<Status>("open");
  const [errors,setErrors] = useState<Record<string,string>>({});
  const [editingId,setEditingId] = useState<string | null>(null);

  useEffect(()=> {
    setTickets(loadTickets());
  },[]);

  function validateFields(titleVal:string, statusVal: string){
    const e:Record<string,string> = {};
    if (!titleVal?.trim()) e.title = "Title is required";
    if (!VALID_STATUSES.includes(statusVal as Status)) e.status = "Status must be open, in_progress or closed";
    if(description && description.length > 1000) e.description = "Description is too long";
    return e;
  }

  function resetForm(){
    setTitle(""); setDescription(""); setStatus("open"); setEditingId(null); setErrors({});
  }

  function handleCreate(e: React.FormEvent){
    e.preventDefault();
    const errs = validateFields(title,status);
    setErrors(errs);
    if(Object.keys(errs).length) return;
    const newTicket:Ticket = { id: uuid(), title: title.trim(), description: description.trim(), status, createdAt: new Date().toISOString() };
    const next = [newTicket, ...tickets];
    setTickets(next); saveTickets(next);
    onToast?.("Ticket created");
    resetForm();
  }

  function startEdit(ticket: Ticket){
    setEditingId(ticket.id);
    setTitle(ticket.title);
    setDescription(ticket.description ?? "");
    setStatus(ticket.status);
  }

  function handleUpdate(e: React.FormEvent){
    e.preventDefault();
    if(!editingId) return;
    const errs = validateFields(title,status);
    setErrors(errs);
    if(Object.keys(errs).length) return;
    const next = tickets.map(t => t.id === editingId ? {...t, title: title.trim(), description: description.trim(), status, updatedAt:new Date().toISOString()} : t);
    setTickets(next); saveTickets(next);
    onToast?.("Ticket updated");
    resetForm();
  }

  function handleDelete(id:string){
    if(!confirm("Delete this ticket? This action cannot be undone.")) return;
    const next = tickets.filter(t=>t.id !== id);
    setTickets(next); saveTickets(next);
    onToast?.("Ticket deleted");
  }

  return (
    <>
      <div className="card" style={{marginBottom:12}}>
        <h3>{editingId ? "Edit Ticket" : "Create Ticket"}</h3>
        <form onSubmit={editingId ? handleUpdate : handleCreate}>
          <div className="form-row">
            <label htmlFor="title">Title *</label>
            <input id="title" value={title} onChange={e=>setTitle(e.target.value)} aria-invalid={!!errors.title} />
            {errors.title && <div className="form-error">{errors.title}</div>}
          </div>

          <div className="form-row">
            <label htmlFor="desc">Description</label>
            <textarea id="desc" rows={3} value={description} onChange={e=>setDescription(e.target.value)} />
            {errors.description && <div className="form-error">{errors.description}</div>}
          </div>

          <div className="form-row">
            <label htmlFor="status">Status *</label>
            <select id="status" value={status} onChange={e=>setStatus(e.target.value as Status)}>
              <option value="open">open</option>
              <option value="in_progress">in_progress</option>
              <option value="closed">closed</option>
            </select>
            {errors.status && <div className="form-error">{errors.status}</div>}
          </div>

          <div style={{display:"flex",gap:12}}>
            <button className="btn btn-primary" type="submit">{editingId ? "Update" : "Create"}</button>
            <button type="button" className="btn btn-ghost" onClick={resetForm}>Reset</button>
          </div>
        </form>
      </div>

      <div className="card">
        <h3>Tickets</h3>
        {tickets.length === 0 ? <p style={{color:"#475569"}}>No tickets yet — create one above.</p> : (
          <div className="ticket-list" style={{marginTop:12}}>
            {tickets.map(t => (
              <div className="card ticket-card" key={t.id}>
                <div className="ticket-meta">
                  <p className="ticket-title">{t.title}</p>
                  <p className="ticket-desc">{t.description}</p>
                  <small style={{color:"#94a3b8"}}>Created: {new Date(t.createdAt).toLocaleString()}</small>
                </div>
                <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:8}}>
                  <span className={`status ${t.status}`}>{t.status.replace("_"," ")}</span>
                  <div style={{display:"flex",gap:8}}>
                    <button className="btn btn-ghost" onClick={()=>startEdit(t)}>Edit</button>
                    <button className="btn btn-ghost" onClick={()=>handleDelete(t.id)}>Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
