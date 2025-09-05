"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { JobForm } from "@/types/job";
import AddJobModal from "./AddJobModal";
import { signIn, useSession } from "next-auth/react";

export default function JobsPage() {
  const [jobs, setJobs] = useState<JobForm[]>([]);
  const [showModal, setShowModal] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session) fetchJobs();
  }, [session]);

  const fetchJobs = async () => {
    try {
      const res = await fetch("/api/jobs");
      const data = await res.json();
      setJobs(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "applied":
        return "bg-green-600";
      case "interviewing":
        return "bg-amber-500";
      case "rejected":
        return "bg-red-600";
      default:
        return "bg-gray-400";
    }
  };

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-green-600"></div>
        <span className="ml-4 text-lg text-zinc-700 dark:text-zinc-300">
          Loading...
        </span>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center px-4">
        <h2 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-100 mb-2">
          Access Denied
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400">
          You must be logged in to view this page.
        </p>
        <Button
          onClick={() => signIn()}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Login
        </Button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-zinc-800 dark:text-zinc-100">
          Submitted Job Applications
        </h1>
        <Button
          onClick={() => setShowModal(true)}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          Add Job
        </Button>
      </div>

      <div className="space-y-4">
        {jobs.length === 0 ? (
          <div className="text-center py-12 text-zinc-600 dark:text-zinc-300 border rounded-lg">
            <p className="text-lg font-medium">No job applications found.</p>
            <p className="mt-2">
              Click &quot;Add Job&quot; to submit your first application!
            </p>
          </div>
        ) : (
          jobs.map((job, idx) => (
            <div
              key={idx}
              className="border border-zinc-300 dark:border-zinc-700 p-4 rounded-lg shadow-sm transition hover:shadow-md"
            >
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                {job.position} @ {job.company}
              </h2>
              <Badge
                className={`${getStatusColor(job.status)} text-white mt-2`}
              >
                {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
              </Badge>
              <p className="mt-2 text-zinc-700 dark:text-zinc-300">
                {job.description}
              </p>
            </div>
          ))
        )}
      </div>

      {showModal && (
        <AddJobModal
          onClose={() => setShowModal(false)}
          onJobAdded={fetchJobs}
          open={showModal}
        />
      )}
    </div>
  );
}
