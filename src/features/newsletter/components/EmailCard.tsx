import React from "react";
import FeatherIcon from "feather-icons-react";
import CopyToClipboard from "./CopyToClipboard";

interface EmailCardProps {
  email: string;
}

export default function EmailCard({ email }: EmailCardProps) {
  return (
    <div className="flex items-center gap-6 p-4 shadow-md">
      <div>
        <FeatherIcon icon="user" />
      </div>
      <div className="w-0 min-w-0 flex-1 overflow-hidden overflow-ellipsis">
        {email}
      </div>
      <CopyToClipboard data={email} />
    </div>
  );
}
