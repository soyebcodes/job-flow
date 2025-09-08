export interface JobForm {
  company: string;
  position: string;
  status: "applied" | "interviewing" | "rejected";
  description: string;
}
