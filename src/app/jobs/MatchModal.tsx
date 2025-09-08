"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface MatchModalProps {
  open: boolean;
  onClose: () => void;
  jobId: string;
}

export default function MatchModal({ open, onClose, jobId }: MatchModalProps) {
  const [resumes, setResumes] = useState<any[]>([]);
  const [selectedResumeId, setSelectedResumeId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) fetchResumes();
  }, [open]);

  const fetchResumes = async () => {
    const res = await fetch("/api/resume");
    const data = await res.json();
    setResumes(data.resumes || []); // Safely fallback to empty array
  };

  const handleMatch = async () => {
    if (!selectedResumeId) return;
    setLoading(true);
    const res = await fetch("/api/jobs/match", {
      method: "POST",
      body: JSON.stringify({ resumeId: selectedResumeId, jobId }),
    });
    const data = await res.json();
    const chunks = data.matchFeedback
      .split(/\d+\.\s+/)
      .filter(Boolean)
      .map((s: string) => s.trim());
    setFeedback(chunks);
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Match Resume to Job</DialogTitle>
        </DialogHeader>

        <Select onValueChange={(val) => setSelectedResumeId(val)}>
          <SelectTrigger>
            <SelectValue placeholder="Select Resume" />
          </SelectTrigger>
          <SelectContent>
            {resumes.map((resume) => (
              <SelectItem key={resume.id} value={resume.id}>
                {resume.name || "Untitled Resume"}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          onClick={handleMatch}
          disabled={!selectedResumeId || loading}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white"
        >
          {loading ? "Matching..." : "Run Match"}
        </Button>

        {feedback.length > 0 && (
          <div className="mt-6">
            <div className="min-h-[120px] whitespace-pre-wrap text-sm text-zinc-700 dark:text-zinc-300">
              {feedback[currentIndex]}
            </div>

            <div className="mt-4 flex justify-between items-center">
              <Button
                onClick={() => setCurrentIndex((i) => Math.max(i - 1, 0))}
                disabled={currentIndex === 0}
                variant="outline"
              >
                ◀ Previous
              </Button>
              <span className="text-xs text-zinc-500">
                {currentIndex + 1} of {feedback.length}
              </span>
              <Button
                onClick={() =>
                  setCurrentIndex((i) => Math.min(i + 1, feedback.length - 1))
                }
                disabled={currentIndex === feedback.length - 1}
                variant="outline"
              >
                Next ▶
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
