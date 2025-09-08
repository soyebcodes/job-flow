export interface JobForm {
  id: string;
  company: string;
  position: string;
  status: "applied" | "interviewing" | "rejected";
  description: string;
}
