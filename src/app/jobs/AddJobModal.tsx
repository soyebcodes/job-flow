"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import { JobForm } from "@/types/job";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export interface JobInput {
  company: string;
  position: string;
  status: "applied" | "interviewing" | "rejected";
  description: string;
}

export default function AddJobModal({
  open,
  onClose,
  onJobAdded,
}: {
  open: boolean;
  onClose: () => void;
  onJobAdded: () => void;
}) {
  const [formData, setFormData] = useState<JobInput>({
    position: "",
    company: "",
    status: "applied",
    description: "",
  });

  const handleChange = (key: keyof JobForm, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Job added successfully!",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
      onJobAdded();
      onClose();
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong while submitting!",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-white dark:bg-zinc-900">
        <DialogHeader>
          <DialogTitle className="text-green-700">Add New Job</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="position">Position</Label>
            <Input
              id="position"
              value={formData.position}
              onChange={(e) => handleChange("position", e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="company">Company Name</Label>
            <Input
              id="company"
              value={formData.company}
              onChange={(e) => handleChange("company", e.target.value)}
              required
            />
          </div>
          <div>
            <Label>Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => handleChange("status", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="applied" className="text-green-600">
                  Applied
                </SelectItem>
                <SelectItem value="interviewing" className="text-amber-600">
                  Interviewing
                </SelectItem>
                <SelectItem value="rejected" className="text-red-600">
                  Rejected
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="description">Job Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              required
              className="h-32 resize-none overflow-auto"
            />
          </div>
          <Button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Submit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
