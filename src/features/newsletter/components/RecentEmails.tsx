import React from "react";
import { getEmails } from "../interface/newletter.controller";
import FeatherIcon from "feather-icons-react";
import CopyToClipboard from "./CopyToClipboard";

export default async function RecentEmails() {
  const { emails } = await getEmails({
    limit: 5,
  });

  return (
    <section className="space-y-5">
      <h2 className="text-caps2 uppercase">Recent Emails</h2>
      <div>
        {emails.map(({ email, id }) => {
          return (
            <div className="flex items-center gap-6 p-4 shadow-md" key={id}>
              <div>
                <FeatherIcon icon="user" />
              </div>
              <div className="flex-1">{email}</div>
              <CopyToClipboard data={email} />
            </div>
          );
        })}
      </div>
    </section>
  );
}
