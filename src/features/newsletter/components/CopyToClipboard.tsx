"use client";
import { Button } from "@/components/ui/button";
import FeatherIcon from "feather-icons-react";
import React from "react";
import { toast } from "sonner";

export default function CopyToClipboard({ data }: { data: string }) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(data);
    toast.success("Copied to clipboard");
  };

  return (
    <Button variant={"ghost"} size={"icon"} onClick={copyToClipboard}>
      <FeatherIcon icon="clipboard" />
    </Button>
  );
}
