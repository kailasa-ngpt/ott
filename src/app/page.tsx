"use client";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function RedirectToHome() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.location.replace("/home");
    }
  }, []);

  return null;
}