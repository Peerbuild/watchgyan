"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import FeatherIcon from "feather-icons-react";
import React, { useState } from "react";
import { AddSubscriberDto } from "../dto/addSubscriber.dto";
import { addSubscriber } from "../interface/newletter.controller";
import { toast } from "sonner";

export const EmailInput = () => {
  const [email, setEmail] = useState("");

  const mutation = useMutation({
    mutationFn: async (data: AddSubscriberDto) => {
      return await addSubscriber(data);
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("You have successfully subscribed to our newsletter");
      setEmail("");
    },
  });

  return (
    <div className="flex border-b border-input">
      <Input
        className="flex-1 border-none py-0 text-foreground focus-visible:ring-transparent"
        placeholder="Your personal email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button
        size={"icon"}
        variant={"ghost"}
        onClick={() => {
          mutation.mutate({ email });
        }}
      >
        <FeatherIcon
          icon="arrow-right"
          className="text-foreground duration-500"
        />
      </Button>
    </div>
  );
};
