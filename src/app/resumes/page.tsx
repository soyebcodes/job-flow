import ResumeList from "@/components/ResumeList/ResumeList";
import ResumeUpload from "@/components/ResumeUpload/ResumeUpload";

export default function ResumesPage() {
  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Your Resumes</h1>
      <ResumeUpload />
      <ResumeList />
    </div>
  );
}
