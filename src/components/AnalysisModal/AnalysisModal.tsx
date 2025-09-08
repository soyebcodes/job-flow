"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface AnalysisModalProps {
  open: boolean;
  onClose: () => void;
  content: string;
}

export default function AnalysisModal({
  open,
  onClose,
  content,
}: AnalysisModalProps) {
  // Split content into numbered suggestions
  const suggestions = content
    .split(/\d+\.\s+/)
    .filter(Boolean)
    .map((s) => s.trim());

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev < suggestions.length - 1 ? prev + 1 : prev
    );
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>AI Resume Suggestions</DialogTitle>
        </DialogHeader>

        <div className="min-h-[120px] whitespace-pre-wrap text-sm text-zinc-700 dark:text-zinc-300">
          {suggestions[currentIndex]}
        </div>

        <div className="mt-4 flex justify-between items-center">
          <Button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            variant="outline"
          >
            ◀ Previous
          </Button>

          <span className="text-xs text-zinc-500">
            {currentIndex + 1} of {suggestions.length}
          </span>

          <Button
            onClick={handleNext}
            disabled={currentIndex === suggestions.length - 1}
            variant="outline"
          >
            Next ▶
          </Button>
        </div>

        <div className="mt-4 text-right">
          <Button
            onClick={onClose}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
