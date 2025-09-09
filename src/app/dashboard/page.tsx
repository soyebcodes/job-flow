"use client";

import { useEffect, useState } from "react";
import { useUser, SignInButton } from "@clerk/nextjs";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface Job {
  id: string;
  position: string;
  company: string;
  status: string;
  createdAt: string;
}

interface Resume {
  id: string;
  createdAt: string;
}

export default function DashboardPage() {
  const { isSignedIn } = useUser();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isSignedIn) fetchDashboardData();
  }, [isSignedIn]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const jobsRes = await fetch("/api/jobs");
      const jobsData = await jobsRes.json();

      const resumesRes = await fetch("/api/resume");
      const resumesData = await resumesRes.json();

      setJobs(jobsData.jobs || []);
      setResumes(resumesData.resumes || []);
    } catch (err: any) {
      setMessage(err.message || "Failed to load dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  if (!isSignedIn) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center px-4">
        <h2 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-100 mb-2">
          Access Denied
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400">
          You must be logged in to view the dashboard.
        </p>
        <SignInButton>
          <Button className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
            Login
          </Button>
        </SignInButton>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-zinc-800 dark:text-zinc-100 mb-6">
        Dashboard
      </h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading data...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Jobs Summary */}
          <Card className="shadow-lg">
            <CardHeader className="flex justify-between items-center">
              <CardTitle>Jobs ({jobs.length})</CardTitle>
              <Button
                size="sm"
                className="bg-green-600 hover:bg-green-700 text-white"
                onClick={() => (window.location.href = "/jobs/new")}
              >
                Add Job
              </Button>
            </CardHeader>
            <CardContent>
              {jobs.length === 0 ? (
                <p>No jobs created yet.</p>
              ) : (
                <ul className="space-y-2 max-h-64 overflow-y-auto">
                  {jobs.map((job) => (
                    <motion.li
                      key={job.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="border-b py-1"
                    >
                      <strong>{job.position}</strong> at {job.company} -{" "}
                      <span className="capitalize">{job.status}</span>
                    </motion.li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>

          {/* Resumes Summary */}
          <Card className="shadow-lg">
            <CardHeader className="flex justify-between items-center">
              <CardTitle>Resumes ({resumes.length})</CardTitle>
              <Button
                size="sm"
                className="bg-green-600 hover:bg-green-700 text-white"
                onClick={() => (window.location.href = "/resume")}
              >
                Upload
              </Button>
            </CardHeader>
            <CardContent>
              {resumes.length === 0 ? (
                <p>No resumes uploaded yet.</p>
              ) : (
                <ul className="space-y-2 max-h-64 overflow-y-auto">
                  {resumes.map((resume) => (
                    <motion.li
                      key={resume.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="border-b py-1"
                    >
                      Uploaded: {new Date(resume.createdAt).toLocaleString()}
                    </motion.li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>

          {/* Stats Summary */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Total Jobs: {jobs.length}</p>
              <p>Total Resumes: {resumes.length}</p>
            </CardContent>
          </Card>
        </div>
      )}

      {message && <p className="text-center text-red-500">{message}</p>}
    </div>
  );
}
