"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { JobForm } from "@/types/job";
import AddJobModal from "./AddJobModal";

export default function JobsPage() {
  const [jobs, setJobs] = useState<JobForm[]>([]);
  const [showModal, setShowModal] = useState(false);

  const fetchJobs = async () => {
    const res = await fetch("/api/jobs");
    const data = await res.json();
    setJobs(data);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

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

  return (
    <div className="p-6">
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
        {jobs.map((job, idx) => (
          <div
            key={idx}
            className="border border-zinc-300 dark:border-zinc-700 p-4 rounded-lg shadow-sm"
          >
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              {job.position} @ {job.company}
            </h2>
            <Badge className={`${getStatusColor(job.status)} text-white`}>
              {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
            </Badge>
            <p className="mt-2 text-zinc-700 dark:text-zinc-300">
              {job.description}
            </p>
          </div>
        ))}
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
