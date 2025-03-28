import { EmailInput } from "@/features/newsletter/components/EmailInput";
import React from "react";

const Newsletter = () => {
  return (
    <section className="">
      <div className="max-w-sm space-y-8">
        <div className="space-y-4">
          <div className="font-serif text-h3">Join Newsletter</div>
          <p className="text-sm">
            Join our newsletter for exclusive updates, fresh watch drops and
            special deals
          </p>
        </div>
        <EmailInput />
      </div>
    </section>
  );
};

export default Newsletter;
