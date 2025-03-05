import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FeatherIcon from "feather-icons-react";
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
        <div className="flex border-b border-input">
          <Input
            className="flex-1 border-none py-0 focus-visible:ring-transparent"
            placeholder="Your personal email"
          />
          <Button size={"icon"} variant={"ghost"}>
            <FeatherIcon
              icon="arrow-right"
              className="text-foreground duration-500"
            />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
