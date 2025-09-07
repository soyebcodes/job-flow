"use client";
import { useState } from "react";

export default function ResumeUpload() {
  const [uploading, setUploading] = useState(false);
  const [url, setUrl] = useState<string | null>(null);

  async function handleUpload(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setUploading(true);

    const formData = new FormData(e.currentTarget);
    const res = await fetch("/api/resume", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setUploading(false);

    if (data.url) {
      setUrl(data.url);
      alert("Resume uploaded successfully!");
    } else {
      alert("Upload failed: " + data.error);
    }
  }

  return (
    <form onSubmit={handleUpload} className="space-y-4">
      <input type="file" name="file" accept="application/pdf" required />
      <button
        type="submit"
        disabled={uploading}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        {uploading ? "Uploading..." : "Upload Resume"}
      </button>
      {url && (
        <p className="text-sm text-green-600">
          Uploaded:{" "}
          <a href={url} target="_blank">
            View Resume
          </a>
        </p>
      )}
    </form>
  );
}
