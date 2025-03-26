import React from "react";
import { getEmails } from "../interface/newletter.controller";
import EmailCard from "./EmailCard";

export default async function RecentEmails() {
  const { emails } = await getEmails({
    limit: 5,
  });

  return (
    <section className="space-y-5">
      <h2 className="text-caps2 uppercase">Recent Emails</h2>
      <div>
        {emails.map(({ email, id }) => {
          return <EmailCard email={email} key={id} />;
        })}
      </div>
    </section>
  );
}
