"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import FeatherIcon from "feather-icons-react";
import React, { useEffect, useState } from "react";
import { AddSubscriberDto } from "../dto/addSubscriber.dto";
import { addSubscriber } from "../interface/newletter.controller";
import { toast } from "sonner";

export const EmailInput = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const mutation = useMutation({
    mutationFn: async (data: AddSubscriberDto) => {
      setIsSubmitted(true);
      return;
      return await addSubscriber(data);
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      setIsSubmitted(true);
      setEmail("");
    },
  });

  useEffect(() => {
    if (isSubmitted) {
      const timeout = setTimeout(() => {
        setIsSubmitted(false);
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [isSubmitted]);

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
        className="text-muted-foreground hover:text-foreground"
      >
        {isSubmitted ? (
          <FeatherIcon
            icon="check"
            className="text-green-400 duration-500 animate-in fade-in-0"
          />
        ) : (
          <FeatherIcon icon="arrow-right" className="duration-500" />
        )}
      </Button>
    </div>
  );
};
