import React from "react";
import { getEmails, searchEmails } from "../interface/newletter.controller";
import FeatherIcon from "feather-icons-react";
import CopyToClipboard from "./CopyToClipboard";
import Pagination from "@/components/Pagination";
import { Search } from "@/components/Search";

const EMAILS_PER_PAGE = 11;

export default async function AllEmailList({
  searchParams,
}: {
  searchParams: Promise<{ page: string | undefined; q: string | undefined }>;
}) {
  const { page, q } = await searchParams;
  const currentPage = page ? Number(page) : 1;
  const offset = (Number(currentPage) - 1) * EMAILS_PER_PAGE;
  const { emails, totalEmails } = q
    ? await searchEmails({
        query: q,
        limit: EMAILS_PER_PAGE,
        offset,
      })
    : await getEmails({
        limit: EMAILS_PER_PAGE,
        offset,
      });

  return (
    <div>
      <section className="space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-caps2 uppercase">All Mails</h2>
          <Search />
        </div>
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
