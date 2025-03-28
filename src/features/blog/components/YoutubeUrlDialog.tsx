import React, { KeyboardEvent, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { DialogProps } from "@radix-ui/react-dialog";
import { useEditor } from "novel";
import { isLastNode } from "@/lib/utils";

export default function YoutubeUrlDialog({
  setOpen,
  ...props
}: { setOpen: (open: boolean) => void } & DialogProps) {
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const { editor } = useEditor();

  const handleCreateEmbed = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!editor || e.key !== "Enter") return;

    console.log("Create embed", youtubeUrl, editor);
    setOpen(false);
    editor?.commands.setYoutubeVideo({
      src: youtubeUrl,
    });

    const { isLast, lastNodePosition } = isLastNode(editor);

    if (isLast) {
      editor
        .chain()
        .insertContentAt(lastNodePosition, {
          type: "paragraph",
        })
        .focus()
        .run();
    }

    setYoutubeUrl("");
  };

  return (
    <Dialog {...props} onOpenChange={(open) => setOpen(open)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Insert Youtube Video Url</DialogTitle>
        </DialogHeader>
        <Input
          value={youtubeUrl}
          onChange={(e) => setYoutubeUrl(e.target.value)}
          onKeyDown={handleCreateEmbed}
          placeholder="https://www.youtube.com/watch?v=auuyeoiuyaff"
        />
      </DialogContent>
    </Dialog>
  );
}
