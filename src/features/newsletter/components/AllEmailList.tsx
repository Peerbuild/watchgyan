import React from "react";
import { addSubscriber, getEmails } from "../interface/newletter.controller";
import FeatherIcon from "feather-icons-react";
import CopyToClipboard from "./CopyToClipboard";
import Pagination from "@/components/Pagination";

const createBulkEmails = async () => {
  const emails = [];
  for (let i = 61; i < 100; i++) {
    emails.push({
      email: `testemail${i + 1}@gmail.com`,
    });
  }

  await Promise.all(
    emails.map((email) => {
      return addSubscriber(email);
    }),
  );
};

const EMAILS_PER_PAGE = 11;

export default async function AllEmailList({
  searchParams,
}: {
  searchParams: Promise<{ page: string | undefined }>;
}) {
  const { page } = await searchParams;
  const currentPage = page ? Number(page) : 1;
  const offset = (Number(currentPage) - 1) * EMAILS_PER_PAGE;
  const { emails, totalEmails } = await getEmails({
    limit: EMAILS_PER_PAGE,
    offset,
  });

  return (
    <div>
      <section className="space-y-5">
        <h2 className="text-caps2 uppercase">All Mails</h2>
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
      <Pagination
        totalItems={totalEmails}
        currentPage={currentPage}
        itemsPerPage={EMAILS_PER_PAGE}
      />
    </div>
  );
}
