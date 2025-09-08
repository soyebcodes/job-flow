"use client";

import { useEffect } from "react";

export default function DashboardPage() {
  useEffect(() => {
    if (window.location.hash) {
      history.replaceState(null, "", window.location.pathname);
    }
  }, []);

  return <div>Your dashboard content here</div>;
}
