"use client";

import { useEffect, useState } from "react";

interface Resume {
  id: string;
  createdAt: string;
  url: string;
}

export default function ResumeList() {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchResumes() {
      const res = await fetch("/api/resume");
      const data = await res.json();
      if (data.resumes) setResumes(data.resumes);
      setLoading(false);
    }

    fetchResumes();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!resumes.length) return <p>No resumes uploaded yet.</p>;

  return (
    <div>
      {resumes.map((resume) => (
        <div key={resume.id}>
          <p>Uploaded at: {new Date(resume.createdAt).toLocaleString()}</p>
          <a href={resume.url} target="_blank" rel="noopener noreferrer">
            View / Download
          </a>
        </div>
      ))}
    </div>
  );
}
