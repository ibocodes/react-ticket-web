/* src/utils/storage.ts */
import type { Ticket } from "../types";
const TICKETS_KEY = "ticketapp_tickets_v1";
export function loadTickets(): Ticket[] {
  try {
    const raw = localStorage.getItem(TICKETS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
export function saveTickets(tickets: Ticket[]) {
  localStorage.setItem(TICKETS_KEY, JSON.stringify(tickets));
}
