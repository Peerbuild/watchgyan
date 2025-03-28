import {
  TiptapImage,
  TiptapLink,
  TaskList,
  TaskItem,
  HorizontalRule,
  StarterKit,
  Placeholder,
  Youtube,
  CharacterCount,
} from "novel/extensions";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import { UploadImagesPlugin } from "novel/plugins";

import { cx } from "class-variance-authority";

// TODO I am using cx here to get tailwind autocomplete working, idk if someone else can write a regex to just capture the class key in objects

// You can overwrite the placeholder with your own configuration
const placeholder = Placeholder.configure({
  placeholder: "Press / to see available commands",
});
// const tiptapLink = TiptapLink.configure({
//   HTMLAttributes: {
//     class: cx(
//       'text-muted-foreground underline underline-offset-[3px] hover:text-primary transition-colors cursor-pointer',
//     ),
//   },
// });

const taskList = TaskList.configure({
  HTMLAttributes: {
    class: cx("not-prose pl-2"),
  },
});
const taskItem = TaskItem.configure({
  HTMLAttributes: {
    class: cx("flex items-start my-4"),
  },
  nested: true,
});

const horizontalRule = HorizontalRule.configure({
  HTMLAttributes: {
    class: cx("mt-4 mb-6 border-t border-muted-foreground"),
  },
});

const starterKit = StarterKit.configure({
  bulletList: {
    HTMLAttributes: {
      class: cx("list-disc list-outside leading-3 -mt-2"),
    },
  },
  orderedList: {
    HTMLAttributes: {
      class: cx("list-decimal list-outside leading-3 -mt-2"),
    },
  },
  listItem: {
    HTMLAttributes: {
      class: cx("leading-normal -mb-2"),
    },
  },
  blockquote: {
    HTMLAttributes: {
      class: cx("border-l-4 border-primary"),
    },
  },
  codeBlock: {
    HTMLAttributes: {
      class: cx("rounded-sm bg-muted border p-5 font-mono font-medium"),
    },
  },
  code: {
    HTMLAttributes: {
      class: cx("rounded-md bg-muted  px-1.5 py-1 font-mono font-medium"),
      spellcheck: "false",
    },
  },
  horizontalRule: false,
  dropcursor: {
    color: "#DBEAFE",
    width: 4,
  },
  gapcursor: false,
});

const tiptapImage = TiptapImage.extend({
  addProseMirrorPlugins() {
    return [
      UploadImagesPlugin({
        imageClass: cx("opacity-40 rounded-lg border border-stone-200"),
      }),
    ];
  },
}).configure({
  allowBase64: true,
  HTMLAttributes: {
    class: cx("rounded-lg border border-muted"),
  },
});

const table = Table.configure({
  resizable: true,
}).extend({
  addKeyboardShortcuts() {
    return {
      "Shift-Backspace": ({ editor }) => {
        return editor.commands.deleteRow() || editor.commands.deleteTable();
      },
      "Control-Shift-Backspace": ({ editor }) => {
        return editor.commands.deleteColumn() || editor.commands.deleteTable();
      },
      "Control-Enter": ({ editor }) => {
        return editor.commands.addColumnAfter();
      },
      Enter: ({ editor }) => {
        return (
          editor.commands.goToNextCell() ||
          editor.chain().addRowAfter().goToNextCell().run()
        );
      },
    };
  },
});

const tableHeader = TableHeader.configure({
  HTMLAttributes: {
    class: cx("bg-muted"),
  },
});

const youtube = Youtube.configure({
  nocookie: true,
});

export const defaultExtensions = [
  starterKit,
  placeholder,
  TiptapLink,
  taskList,
  taskItem,
  horizontalRule,
  tiptapImage,
  table,
  TableRow,
  tableHeader,
  TableCell,
  CharacterCount,
  youtube,
];
