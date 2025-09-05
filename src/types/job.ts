export interface JobForm {
  company: string;
  position: string;
  companyName: string;
  status: "applied" | "interviewing" | "rejected";
  description: string;
}
