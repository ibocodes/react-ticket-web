/* src/types.d.ts */
export type Status = "open" | "in_progress" | "closed";

export interface Ticket {
  id: string;
  title: string;
  description?: string;
  status: Status;
  createdAt: string;
  updatedAt?: string;
}
